import { Route, Routes } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import App from "../App";
import LayoutPages from "../components/layoutPages";
import { IconPlayerPlayFilled, IconPlayerPauseFilled, IconMusic, IconVolume } from "@tabler/icons-react";

function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.03); 
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 56;
            audioRef.current.volume = volume;
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch((error) => {
                        console.error("Erro ao reproduzir o áudio:", error);
                        audioRef.current?.load();
                    });
            }
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <div className="fixed bottom-4 right-4 md:top-6 md:right-6 md:bottom-auto z-50 flex items-center gap-3 bg-[#1d2d44]/80 backdrop-blur-md p-2 pr-4 md:pr-5 rounded-full border border-[#3e5c76]/50 shadow-[0_0_15px_rgba(62,92,118,0.3)] transition-all hover:bg-[#1d2d44] group scale-90 md:scale-100 origin-bottom-right md:origin-top-right">
            <button
                onClick={togglePlay}
                className="w-10 h-10 bg-[#3e5c76] text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shrink-0"
            >
                {isPlaying ? <IconPlayerPauseFilled size={18} /> : <IconPlayerPlayFilled size={18} />}
            </button>
            
            <div className="flex flex-col min-w-[60px]">
                <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                    <IconMusic size={12} className={isPlaying ? "animate-pulse text-sky-400" : ""} />
                    {isPlaying ? "Tocando" : "Música"}
                </span>
                <span className="text-sm text-white font-bold leading-tight">Starboy</span>
            </div>

            <div className="hidden md:flex items-center gap-2 pl-3 ml-1 border-l border-[#3e5c76]/50">
                <IconVolume size={18} className="text-slate-300" />
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume} 
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-[#3e5c76]"
                />
            </div>

            <audio ref={audioRef} loop src="/starboy.mp3" />
        </div>
    );
}

export default function Router() {
    return (
        <LayoutPages>
            <MusicPlayer />
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
        </LayoutPages>
    )
}