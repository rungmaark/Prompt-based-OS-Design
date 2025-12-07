// src/components/WeatherApp.tsx
"use client";

interface WeatherAppProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WeatherApp({ isOpen, onClose }: WeatherAppProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      {/* Weather Panel - expands from footer */}
      <div 
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
          isOpen 
            ? 'bottom-24 opacity-100 visible' 
            : 'bottom-5 opacity-0 invisible'
        }`}
      >
        <div 
          className="bg-zinc-900/95 backdrop-blur-xl rounded-3xl p-8 w-screen sm:w-96 shadow-2xl border border-zinc-700/50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Weather</h2>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors text-2xl cursor-pointer"
              aria-label="Close">
              ×
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="text-7xl mb-4 animate-spin-slow inline-block">☀️</div>
            <div className="text-6xl font-bold text-white mb-2">24°C</div>
            <div className="text-xl text-zinc-400">Sunny</div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-zinc-800">
              <span className="text-zinc-400">Feels Like</span>
              <span className="text-white font-semibold">22°C</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-zinc-800">
              <span className="text-zinc-400">Humidity</span>
              <span className="text-white font-semibold">65%</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-zinc-800">
              <span className="text-zinc-400">Wind Speed</span>
              <span className="text-white font-semibold">12 km/h</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-zinc-800">
              <span className="text-zinc-400">UV Index</span>
              <span className="text-white font-semibold">5 (Moderate)</span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm text-zinc-400 mb-4 uppercase tracking-wider">
              Weekly Forecast
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {[
                { day: "Mon", temp: "24°", icon: "☀️" },
                { day: "Tue", temp: "23°", icon: "🌤️" },
                { day: "Wed", temp: "22°", icon: "⛅" },
                { day: "Thu", temp: "20°", icon: "🌧️" },
                { day: "Fri", temp: "21°", icon: "🌤️" },
                { day: "Sat", temp: "25°", icon: "☀️" },
                { day: "Sun", temp: "26°", icon: "☀️" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-zinc-800/50 rounded-xl p-2 text-center">
                  <div className="text-xs text-zinc-400 mb-1">{item.day}</div>
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-sm text-white font-semibold">
                    {item.temp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
