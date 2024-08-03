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

    const url = "https://api.elevenlabs.io/v1/voices";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    console.log("🚀 ~ response status:", response.status);
    // Log headers
    const headers = response.headers;
    headers.forEach((value, key) => {
      console.log(`🚀 ~ Header ${key}: ${value}`);
    });
    if (!response.ok) {
      const erreorText = await response.text();
      throw new Error(`Falha ao listar vozes: ${erreorText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: Error | any) {
    res.status(500).json({ error: error.message });
  }
}
