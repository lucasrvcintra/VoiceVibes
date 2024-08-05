import React from "react";
import { Card, Text, Button, Space } from "@mantine/core";
import { VoiceListProps } from "@/interfaces/definitions";

const VoiceList = ({ voices }: VoiceListProps) => {
  return (
    <div>
      {voices.map((voice) => (
        <Card
          key={voice.id}
          shadow="sm"
          padding="lg"
          my="md"
          radius="md"
          withBorder
        >
          <Text>{voice.name}</Text>
          <Text size="sm" color="dimmed">
            Category: {voice.category}
          </Text>
          <Text size="sm" color="dimmed">
            Labels:{" "}
            {Array.isArray(voice.labels) ? voice.labels.join(", ") : "Nenhuma"}
          </Text>
          <audio controls src={voice.preview_url} />
        </Card>
      ))}
    </div>
  );
};

export default VoiceList;
