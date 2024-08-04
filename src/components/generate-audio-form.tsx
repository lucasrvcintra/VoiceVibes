import React, { useState } from "react";
import {
  Button,
  TextInput,
  Menu,
  Group,
  Text,
  Notification,
} from "@mantine/core";
import { VoiceListProps } from "@/interfaces/definitions";

interface GenerateAudioFormProps {
  voices: VoiceListProps["voices"];
  onGenerateAudio: (voiceId: string, textToSpeak: string) => void;
}

const GenerateAudioForm: React.FC<GenerateAudioFormProps> = ({
  voices,
  onGenerateAudio,
}) => {
  const [text, setText] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);

  const handleGenerateAudio = () => {
    if (!voiceButtonText || !text) {
      setNotification("Por favor, selecione uma voz e digite o texto.");
      return;
    }

    onGenerateAudio(voiceButtonText, text);
    setNotification(null);
  };

  const handleVoiceSelect = (voiceId: string, voiceName: string) => {
    setVoiceButtonText(voiceId);
    // Atualiza o texto do botão
    setVoiceButtonText(voiceName);
  };

  const [voiceButtonText, setVoiceButtonText] = useState("Selecione uma voz");

  return (
    <div>
      {notification && (
        <Notification color="red" title="Atenção">
          {notification}
        </Notification>
      )}
      <TextInput
        placeholder="Digite o texto a ser falado"
        label="Texto"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <Menu>
        <Menu.Target>
          <Button variant="outline">{voiceButtonText}</Button>
        </Menu.Target>
        <Menu.Dropdown>
          {voices.map((voice) => (
            <Menu.Item
              key={voice.id}
              onClick={() => handleVoiceSelect(voice.id, voice.name)}
            >
              {voice.name}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
      <Group mt="md">
        <Button onClick={handleGenerateAudio}>Gerar Áudio</Button>
      </Group>
    </div>
  );
};

export default GenerateAudioForm;
