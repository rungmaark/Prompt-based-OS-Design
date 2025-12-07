// src/app/page.tsx
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import WeatherApp from "@/components/WeatherApp";

const Clock = dynamic(() => import("@/components/Clock"), {
  ssr: false,
});

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [showWeather, setShowWeather] = useState(false);

  const handlePlayMusic = () => {
    if (!player) {
      // Initialize player on first click
      setIsPlaying(true);
      // Wait for iframe to load and initialize
      setTimeout(() => {
        const iframe = document.getElementById('youtube-player') as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
          setPlayer(iframe.contentWindow);
        }
      }, 1000);
    } else {
      // Toggle play/pause
      if (isPlaying) {
        player.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } else {
        player.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-zinc-950 text-white font-sans overflow-hidden">
      {/* Hidden YouTube audio player */}
      <iframe
        id="youtube-player"
        className="hidden"
        width="0"
        height="0"
        src={player !== null || isPlaying ? "https://www.youtube.com/embed/iuT8KImN-Rk?si=ydHALWiJ4vcep4NT&autoplay=1&loop=1&playlist=iuT8KImN-Rk&enablejsapi=1" : "about:blank"}
        title="Background Music"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      
      <header className="flex justify-between items-center px-6 py-4 text-sm text-zinc-400">
        <div className="font-medium">Hi, Mark</div>
      </header>

      <main className="flex-1 flex flex-col items-center pt-40">
        <Clock />
        <div className="w-full max-w-xl">
          <input
            type="text"
            placeholder="What do you want to do?"
            className="w-full py-5 px-6 text-lg rounded-2xl bg-zinc-800/60 backdrop-blur-xl shadow-[inset_0_0_0.5px_rgba(255,255,255,0.1)] text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl w-full px-4">
          {[
            {
              icon: "📝",
              title: "Start New Note",
              desc: "Quickly write down your thoughts",
            },
            {
              icon: "🎵",
              title: "Play Relaxing Music",
              desc: "Set the mood while working",
              onClick: handlePlayMusic,
            },
            {
              icon: "📂",
              title: "Open Recent Files",
              desc: "Resume your latest work",
            },
            {
              icon: "🌤️",
              title: "Show Weather",
              desc: "Check today’s forecast",
              onClick: () => setShowWeather(true),
            },
            {
              icon: "🖼️",
              title: "Start Drawing",
              desc: "Open canvas to sketch",
            },
            { icon: "📧", title: "Check Emails", desc: "Review your inbox" },
          ].map((item, index) => (
            <div
              key={index}
              onClick={item.onClick}
              className="bg-zinc-800/60 backdrop-blur-md rounded-2xl p-5 hover:bg-zinc-700/60 hover:scale-[1.015] transition-all cursor-pointer shadow-md">
              <div className="text-white text-lg font-semibold mb-1">
                {item.icon} {item.title}
              </div>
              <div className="text-zinc-400 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </main>

      {showWeather && <WeatherApp isOpen={showWeather} onClose={() => setShowWeather(false)} />}

      <footer className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-zinc-800/50 backdrop-blur-md rounded-full px-8 py-2 flex items-center space-x-6 shadow-lg border border-white/10 z-10">
        <button
          onClick={() => setShowWeather(true)}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer">
          <i className="bi bi-cloud-sun text-white text-xl"></i>
          <span className="text-sm text-zinc-300">24°C, Sunny</span>
        </button>
        <div className="w-px h-4 bg-zinc-600"></div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePlayMusic}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Play music">
            <i className="bi bi-music-note-beamed text-white text-xl"></i>
            <div className="marquee-chip w-32">
              <div className={`marquee-chip__track text-sm text-zinc-300 ${!isPlaying ? 'paused' : ''}`}>
                <span>Chill Lo-fi Beats</span>
                <span aria-hidden="true">Chill Lo-fi Beats</span>
              </div>
            </div>
          </button>
        </div>
        <div className="w-px h-4 bg-zinc-600"></div>
        <div className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer">
          <i className="bi bi-bell text-white text-xl"></i>
          <span className="text-sm text-zinc-300">1 new notification</span>
        </div>
      </footer>
    </div>
  );
}
