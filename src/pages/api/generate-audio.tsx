import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const { voiceId, textToSpeak } = req.body;

    if (!apiKey) {
      throw new Error("Chave de API não encontrada");
    }

    if (!voiceId || !textToSpeak) {
      throw new Error("Dados de requisição inválidos ou incompletos!");
    }

    const ttsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`;

    const headers = {
      Accept: "application/json",
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
    };

    const data = {
      text: textToSpeak,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.8,
        style: 0.0,
        use_speaker_boost: true,
      },
    };

    const response = await fetch(ttsUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Falha ao gerar áudio: ${errorText}`);
    }

    if (!response.body) {
      throw new Error("Resposta do corpo está vazia.");
    }

    const outputPath = path.join(process.cwd(), "public", "output.mp3");
    const fileStream = fs.createWriteStream(outputPath);

    response.body.pipe(fileStream);

    fileStream.on("finish", () => {
      res
        .status(200)
        .json({ message: "Áudio salvo com sucesso", url: "/output.mp3" });
    });

    fileStream.on("error", (err) => {
      throw new Error(`Falha ao salvar o áudio: ${err.message}`);
    });

    // Adicione um listener para o evento 'close' para garantir que a resposta seja enviada se o streaming for interrompido
    response.body.on("close", () => {
      if (!res.headersSent) {
        res.status(500).json({ error: "Falha ao processar o áudio." });
      }
    });
  } catch (error: any) {
    // Verifique se a resposta não foi enviada antes de enviar um erro
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
}
