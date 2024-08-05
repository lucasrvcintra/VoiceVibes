import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { put } from "@vercel/blob";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
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

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Audio = buffer.toString("base64");

    // Upload do áudio para o Vercel Blob Storage
    const result = await put("teste", base64Audio, {
      access: "public",
      contentType: "audio/mpeg",
      token: blobToken,
    });
    console.log("🚀 ~ result:", result);

    if (!result.url) {
      throw new Error(
        "Falha ao fazer upload do áudio para o Vercel Blob Storage"
      );
    }

    const audioUrl = result.url;

    res.status(200).json({ message: "Áudio salvo com sucesso", url: audioUrl });
  } catch (error: any) {
    if (!res.headersSent) {
      res
        .status(500)
        .json({ error: "Erro no generate audio", message: error.message });
    }
  }
}
