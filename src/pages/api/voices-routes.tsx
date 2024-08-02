import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      throw new Error("Chave de API não encontrada");
    }
    console.log("🚀 ~ apiKey:", apiKey);

    const response = await fetch("https://api.elevenlabs.io/v1/voices", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const erreorText = await response.text();
      throw new Error(`Falha ao listar vozes: ${erreorText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
