"use client";

import React, { useEffect, useState } from "react";
import VoiceList from "../components/voice-list";
import GenerateAudioForm from "../components/generate-audio-form";
import { Card, Container, Loader, Notification, Text } from "@mantine/core";
import type { Voice } from "@/interfaces/definitions";

export default function HomePage() {
  const [voices, setVoices] = useState<Voice[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [voiceButtonText, setVoiceButtonText] =
    useState<string>("Selecione uma voz");

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await fetch("/api/voices-routes");
        if (!response.ok) throw new Error("Failed to fetch voices");
        const data = await response.json();
        setVoices(data.voices);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVoices();
  }, []);

  const onGenerateAudio = async (voiceId: string, textToSpeak: string) => {
    console.log("Gerar áudio com:", { voiceId, textToSpeak });
    try {
      const response = await fetch("/api/generate-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voiceId, textToSpeak }),
      });
      if (!response.ok) throw new Error("Failed to generate audio");

      const data = await response.json();
      console.log("Resposta do backend:", data);
      setAudioUrl(data.url);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container my="md">
      <div className="border-red-600 font-bold text-center">
        <p className="text-2xl font-bold mb-4">Voices List</p>
      </div>
      {loading && <Loader size="lg" />}
      {error && (
        <Notification color="red" title="Error">
          {error}
        </Notification>
      )}
      {!loading && !error && (
        <VoiceList
          voices={voices}
          onGenerateAudio={function (voiceId: string): void {
            throw new Error("Function not implemented.");
          }}
          loading={false}
        />
      )}
      <GenerateAudioForm
        voices={voices}
        onGenerateAudio={onGenerateAudio}
        voiceButtonText={voiceButtonText}
        setVoiceButtonText={setVoiceButtonText}
      />

      {audioUrl && (
        <Card shadow="sm" padding="lg" radius="md" withBorder my="md">
          <Text my="sm">Áudio gerado com a voz de {voiceButtonText}</Text>
          <audio controls src={audioUrl} />
        </Card>
      )}
    </Container>
  );
}
