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
