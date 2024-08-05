import React, { useState } from "react";
import { Button, TextInput, Menu, Group, Notification } from "@mantine/core";
import { GenerateAudioFormProps } from "@/interfaces/definitions";

const GenerateAudioForm: React.FC<GenerateAudioFormProps> = ({
  voices,
  onGenerateAudio,
  voiceButtonText,
  setVoiceButtonText,
}) => {
  const [text, setText] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);
  const [voiceId, setVoiceId] = useState<string | null>(null);

  const handleGenerateAudio = () => {
    if (!voiceId || !text) {
      setNotification("Por favor, selecione uma voz e digite o texto.");
      return;
    }

    console.log("Enviando ao backend:", { voiceId, text });
    onGenerateAudio(voiceId, text);
    setNotification(null);
  };

  const handleVoiceSelect = (id: string, name: string) => {
    console.log("Selecionando voz:", { id, name });
    setVoiceId(id);
    setVoiceButtonText(name);
  };

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
        my="md"
      />
      <Menu>
        <Menu.Target>
          <Button variant="outline">{voiceButtonText}</Button>
        </Menu.Target>
        <Menu.Dropdown>
          {voices.map((voice) => {
            return (
              <Menu.Item
                key={voice.voice_id}
                onClick={() => handleVoiceSelect(voice.voice_id, voice.name)}
              >
                {voice.name}
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      </Menu>
      <Group mt="md">
        <Button onClick={handleGenerateAudio}>Gerar Áudio</Button>
      </Group>
    </div>
  );
};

export default GenerateAudioForm;
