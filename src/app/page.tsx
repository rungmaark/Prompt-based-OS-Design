// src/app/page.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import WeatherApp from "@/components/WeatherApp";

const Clock = dynamic(() => import("@/components/Clock"), {
  ssr: false,
});

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [showWeather, setShowWeather] = useState(false);
  const [showBuildingWebsite, setShowBuildingWebsite] = useState(false);
  const [cursorThought, setCursorThought] = useState("Thinking...");
  const [cursorThinking, setCursorThinking] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!showBuildingWebsite) {
      setCursorThinking(false);
      return;
    }

    const thoughts = [
      "Scaffolding layout",
      "Optimizing assets",
      "Linking components",
      "Tweaking gradients",
      "Deploying edge cache",
      "Linting styles",
      "Bundling scripts",
      "Hydrating UI",
    ];

    let intervalId: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const triggerThought = () => {
      const next = thoughts[Math.floor(Math.random() * thoughts.length)];
      setCursorThought(next);
      setCursorThinking(true);
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setCursorThinking(false), 3000);
    };

    triggerThought();
    intervalId = setInterval(triggerThought, 7500);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      setCursorThinking(false);
    };
  }, [showBuildingWebsite]);

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

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = inputValue.trim().toLowerCase();
      if (value === "play a song" || value === "play song" || value === "play music" || value === "music" || value === "play a music") {
        handlePlayMusic();
        setInputValue("");
        setShowDropdown(false);
      }
    }
  };

  const handleDropdownSelect = (action: string) => {
    if (action === "play-music") {
      handlePlayMusic();
    }
    setInputValue("");
    setShowDropdown(false);
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
        <div className="w-full max-w-xl relative">
          <input
            type="text"
            placeholder="What do you want to do?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            className="w-full py-5 px-6 text-lg rounded-2xl bg-zinc-800/60 backdrop-blur-xl shadow-[inset_0_0_0.5px_rgba(255,255,255,0.1)] text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-800/90 backdrop-blur-xl rounded-2xl border border-zinc-700/50 shadow-xl overflow-hidden z-50">
              <div
                onClick={() => handleDropdownSelect("play-music")}
                className="px-6 py-4 hover:bg-zinc-700/60 cursor-pointer transition-colors flex items-center gap-3"
              >
                <span className="text-xl">🎵</span>
                <div>
                  <div className="text-white font-medium">Play a music</div>
                  <div className="text-zinc-400 text-sm">Start playing background music</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl w-full px-4">
          {[
            {
              icon: "📝",
              title: "Summerize today's stock market",
              desc: "Get the latest financial insights",
            },
            {
              icon: "🎵",
              title: "Play my favorite Music",
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
              icon: "💻",
              title: "Build a website",
              desc: "Create a stunning online presence",
              onClick: () => setShowBuildingWebsite(true),
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

      {showBuildingWebsite && (
        <>
          <div className="glowing-border" />
          <div className={`virtual-cursor ${cursorThinking ? 'thinking' : ''}`}>
            <div key={cursorThought} className="cursor-thought">{cursorThought}</div>
          </div>
          <div className="virtual-window">
            <div className="virtual-window__titlebar">
              <div className="virtual-window__dots">
                <span className="red" />
                <span className="yellow" />
                <span className="green" />
              </div>
              <div className="virtual-window__title">Mark — code-editor</div>
            </div>
            <div className="virtual-window__body">
              <span className="code-line dim">~/sites/mark-portfolio</span>
              <span className="code-line">$ npm run dev</span>
              <span className="code-line success">⏳ Starting dev server on localhost:3000...</span>
              <span className="code-line accent">import React from "react";</span>
              <span className="code-line accent">import Hero from "./Hero";</span>
              <span className="code-line">const App = () =&gt; {'{'}</span>
              <span className="code-line">  return (&lt;Hero title="Hello, Mark" cta="Launch" /&gt;);</span>
              <span className="code-line">{' }'};</span>
              <span className="code-line">export default App;</span>
              <span className="code-line code-typing">deploy({'{'} region: "nyc", edge: true {'}'})</span>
              <span className="code-line code-newline">_</span>
            </div>
          </div>

          <div className="virtual-window virtual-window--preview">
            <div className="virtual-window__titlebar">
              <div className="virtual-window__dots">
                <span className="red" />
                <span className="yellow" />
                <span className="green" />
              </div>
              <div className="virtual-window__title">Live Preview — portfolio</div>
            </div>
            <div className="virtual-window__body">
              <div className="preview-hero preview-reveal" style={{ animationDelay: '0.4s' }}>Orbit Market — Curated Digital Goods</div>
              <div className="preview-sub preview-reveal" style={{ animationDelay: '1.4s' }}>Discover design assets, components, and toolkits crafted by top creators.</div>
              <div className="preview-divider preview-reveal" style={{ animationDelay: '2.4s' }} />
              <div className="preview-section-title" style={{ animationDelay: '3.4s' }}>Trending Packs</div>
              <div className="preview-grid">
                {[
                  { title: "UI Starter Kit", price: "$24", meta: "1.2k sales • Figma" },
                  { title: "Icons Nova", price: "$18", meta: "840 sales • SVG" },
                  { title: "Deck Master", price: "$12", meta: "620 sales • Keynote" },
                  { title: "Webflow Blocks", price: "$28", meta: "540 sales • Webflow" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="preview-card"
                    style={{ animationDelay: `${4.4 + idx * 0.8}s` }}
                  >
                    <div className="preview-card__title">{item.title}</div>
                    <div className="preview-card__price">{item.price}</div>
                    <div className="preview-card__meta">{item.meta}</div>
                  </div>
                ))}
              </div>
              <div className="preview-divider preview-reveal" style={{ animationDelay: '7.6s' }} />
              <div className="preview-section-title" style={{ animationDelay: '8.4s' }}>Categories</div>
              <div className="preview-row preview-reveal" style={{ animationDelay: '9.2s' }}>
                {["UI Kits", "Icons", "Decks", "Illustrations", "Templates"].map((tag) => (
                  <span key={tag} className="preview-pill">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div
            className="fixed inset-0 z-40 cursor-pointer"
            onClick={() => setShowBuildingWebsite(false)}
          />
        </>
      )}

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
