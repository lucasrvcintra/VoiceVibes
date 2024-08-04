import React from "react";
import { Card, Button, AudioPlayer } from "@mantine/core";

interface VoiceListProps {
  voices: Array<{
    id: string;
    name: string;
    category: string;
    labels: string[];
    preview_url: string;
  }>;
  onGenerateAudio: (voiceId: string) => void;
  loading: boolean;
}

const VoiceList: React.FC<VoiceListProps> = ({
  voices,
  onGenerateAudio,
  loading,
}) => {
  return (
    <div className="space-y-4">
      {voices.map((voice) => (
        <Card key={voice.id} padding="lg" shadow="sm" radius="md">
          <h2 className="text-xl font-semibold mb-2">{voice.name}</h2>
          <p className="text-gray-600">Categoria: {voice.category}</p>
          <p className="text-gray-600">Labels: {voice.labels.join(", ")}</p>
          <AudioPlayer src={voice.preview_url} className="mt-2" controls />
          <Button
            className={`mt-2 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
            }`}
            onClick={() => onGenerateAudio(voice.id)}
            disabled={loading}
          >
            {loading ? "Gerando..." : "Falar Texto"}
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default VoiceList;
