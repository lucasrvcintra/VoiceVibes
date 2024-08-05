import type { strict } from "assert";

export interface VoiceListProps {
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

export interface GenerateAudioFormProps {
  voices: Voice[];
  onGenerateAudio: (voiceId: string, textToSpeak: string) => void;
  voiceButtonText: string;
  setVoiceButtonText: (text: string) => void;
}

export interface Voice {
  voice_id: string;
  id: string;
  name: string;
  category: string;
  labels: string[];
  preview_url: string;
}
