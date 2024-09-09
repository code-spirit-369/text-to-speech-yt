"use client";

import { Voice } from "elevenlabs/api";

import VoiceList from "@/components/voice-list";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTTSStore } from "@/store/useTTSStore";
import { useState } from "react";
import { DownloadIcon, Loader2Icon, SparklesIcon } from "lucide-react";
import axios from "axios";

export default function TextToSpeech({ voices }: { voices: Voice[] }) {
  const { text, voice, setText } = useTTSStore();

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        "/api/generate",
        {
          text,
          voice,
        },
        {
          responseType: "blob",
        }
      );

      const audioBlob = res.data;
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = "tts_audio.mp3";
      a.click();
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full border-2 border-indigo-500 rounded-xl p-4 py-8 md:p-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="min-h-32"
        />

        <VoiceList voices={voices} />

        <Button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-500/90"
          onClick={handleDownload}
          disabled={isLoading || !text || !voice}
        >
          {isLoading ? (
            <div className="flex items-center space-x-3">
              <span>Generating</span>
              <Loader2Icon className="animate-spin size-5" />
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <span>Generate</span>
              <SparklesIcon className="size-5" />
            </div>
          )}
        </Button>
      </form>

      {audioUrl && (
        <div className="flex items-center space-x-3 mt-8">
          <audio controls className="w-full">
            <source src={audioUrl} type="audio/mpeg" />
          </audio>

          <Button
            onClick={handleDownload}
            size="icon"
            className="bg-indigo-500 hover:bg-indigo-500/90"
          >
            <DownloadIcon className="size-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
