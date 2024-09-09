import { elevenlabs } from "@/lib/elevenlabs";

import TextToSpeech from "@/components/text-to-speech";

export default async function Home() {
  const voicesRes = await elevenlabs.voices.getAll();

  const voices = voicesRes.voices;

  if (!voices) {
    return <div>Voices not found</div>;
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-100 text-black p-4 md:p-8">
      <h1 className="text-3xl md:text-6xl font-bold text-center mb-2 text-gray-800">
        Bring <span className="text-indigo-500">Words</span> to Life <br />
        with <span className="text-indigo-500">AI</span> Powered Speech
      </h1>
      <p className="text-lg text-muted-foreground mb-8 md:mb-16 text-center">
        Experience the Future of Voice with Seamless AI-Driven Text-to-Speech
        Solutions
      </p>
      <TextToSpeech voices={voices} />
    </main>
  );
}
