import { elevenlabs } from "@/lib/elevenlabs";
import { streamToBuffer } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text, voice } = await req.json();

  const audio = await elevenlabs.generate({
    voice,
    text,
    model_id: "eleven_multilingual_v2",
  });

  const audioBuffer = await streamToBuffer(audio);

  return new NextResponse(audioBuffer, {
    headers: {
      "Content-Type": "audio/mpeg",
    },
  });
}
