"use client";

import React, { useEffect, useState } from "react";
import VoiceList from "../components/voice-list";
import GenerateAudioForm from "../components/generate-audio-form";
import { Container, Loader, Notification, Text } from "@mantine/core";

export default function HomePage() {
  const [voices, setVoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

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
      setAudioUrl(data.url);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container className="my-8">
      <Text className="text-2xl font-bold mb-4">Voices List</Text>
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
      <GenerateAudioForm voices={voices} onGenerateAudio={onGenerateAudio} />
    </Container>
  );
}
