import Project from "@/projects/project"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { IconExternalLink, IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {

    const { projects } = Project();
    const [visibleCount, setVisibleCount] = useState(6);
    const animatedIndices = useRef(new Set<number>());
    const cardAnimsRef = useRef<Map<number, gsap.core.Tween>>(new Map());

    
    useEffect(() => {
        const headerAnim = gsap.fromTo(".projects-header",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#projects",
                    start: "top 95%",
                    toggleActions: "play reset play reset"
                }
            }
        );

        return () => {
            headerAnim.scrollTrigger?.kill();
            headerAnim.kill();
        };
    }, []);

 
    useEffect(() => {
        
        const currentIndices = Array.from(animatedIndices.current);
        currentIndices.forEach(idx => {
            if (idx >= visibleCount) {
                const anim = cardAnimsRef.current.get(idx);
                if (anim) {
                    anim.scrollTrigger?.kill();
                    anim.kill();
                    cardAnimsRef.current.delete(idx);
                }
                animatedIndices.current.delete(idx);
            }
        });

        const cards = gsap.utils.toArray<HTMLElement>(".project-card");
        
        cards.forEach((card, index) => {
            if (animatedIndices.current.has(index)) return;

            const anim = gsap.fromTo(card,
                {
                    opacity: 0,
                    x: () => {
                        const isMobile = window.innerWidth < 768;
                        const offset = isMobile ? 30 : 80;
                        if (index % 3 === 0) return -offset;
                        if (index % 3 === 2) return offset;
                        return 0;
                    },
                    y: () => {
                        const isMobile = window.innerWidth < 768;
                        const offset = isMobile ? 40 : 80;
                        if (index % 3 === 1) return offset;
                        return 40;
                    }
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    delay: (index % 3) * 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: "#projects",
                        start: "top 95%",
                        toggleActions: "play reset play reset"
                    }
                }
            );

            cardAnimsRef.current.set(index, anim);
            animatedIndices.current.add(index);
        });

        ScrollTrigger.refresh();
    }, [visibleCount]);

    
    useEffect(() => {
        return () => {
            cardAnimsRef.current.forEach(anim => {
                anim.scrollTrigger?.kill();
                anim.kill();
            });
            cardAnimsRef.current.clear();
            animatedIndices.current.clear();
        };
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center w-full px-6 md:px-10 pb-24 mt-16 overflow-hidden scroll-mt-20 md:scroll-mt-28" id="projects">
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#36ADA3]/5 rounded-full blur-[100px] md:blur-[180px] pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#1d2d44]/20 rounded-full blur-[100px] md:blur-[180px] pointer-events-none -z-10" />

            <div className="flex flex-col items-center mb-16 text-center z-10 opacity-0 projects-header">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#36ADA3] tracking-tight">
                    Projetos
                </h1>
                <div className="h-1 w-16 bg-gradient-to-r from-[#36ADA3] to-[#2c9188] rounded-full mt-3 shadow-[0_0_10px_rgba(54,173,163,0.5)]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl z-10 projects-grid bg-red-9">
                {projects.slice(0, visibleCount).map((project) => (
                    <Card
                        key={project.name}
                        className={`relative bg-[#0b131e]/40 border border-[#36ADA3]/10 text-slate-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                        hover:shadow-[0_0_35px_rgba(54,173,163,0.3)] hover:border-[#36ADA3]/40 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-end h-[380px] md:h-[420px] rounded-2xl group opacity-0 project-card py-0 gap-0 ${project.deploy ? "cursor-pointer" : ""}`}
                        onClick={project.deploy ? () => window.open(project.deploy, "_blank") : undefined}
                    >
                        {project.image && (
                            <>
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 -z-30 ${project.imageMode === "contain"
                                            ? "object-contain p-8 pb-32"
                                            : "object-cover"
                                        }`}
                                />
                                <div className="absolute inset-0 bg-[#0c1926]/20 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-10 -z-20" />
                                <div className="absolute inset-0 bg-[#36ADA3]/15 mix-blend-color transition-colors duration-500 group-hover:bg-[#36ADA3]/20 -z-20" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#090f16]/80 via-[#090f16]/30 to-transparent -z-10" />
                            </>
                        )}
                        <div className="px-6 pt-6 pb-6 md:px-8 md:pt-8 md:pb-8 flex flex-col relative z-10 w-full flex-grow justify-between">
                            <div className="flex justify-between items-center gap-3">
                                {project.progress === true && (
                                    <Badge variant="outline" className="bg-[#36ADA3]/25 text-[#36ADA3] border-[#36ADA3]/45 whitespace-nowrap flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-semibold text-xs backdrop-blur-md">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#36ADA3]" />
                                        Finalizado
                                    </Badge>
                                )}
                                {project.progress === false && (
                                    <Badge variant="outline" className="bg-amber-500/25 text-amber-400 border-amber-500/40 whitespace-nowrap flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-semibold text-xs backdrop-blur-md animate-pulse">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                                        Em andamento
                                    </Badge>
                                )}
                            </div>
                            <div className="mt-auto flex flex-col gap-1.5">
                                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
                                    {project.name}
                                </h3>

                                <p className="text-slate-300 text-sm md:text-base leading-relaxed line-clamp-3 opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                                    {project.description}
                                </p>
                            </div>
                        </div>

                        {project.deploy && (
                            <Button
                                className="w-full bg-[#36ADA3] hover:bg-[#2c9188] text-[#0b131e] hover:text-white font-bold
                                 rounded-none cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 h-12 shadow-none border-none relative z-20"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(project.deploy, "_blank");
                                }}
                            >
                                <IconExternalLink size={18} />
                                Acessar Projeto
                            </Button>
                        )}
                    </Card>
                ))}
            </div>

            {projects.length > 6 && (
                <div className="mt-12 z-10 flex items-center justify-center">
                    <div className="flex items-center gap-3 bg-[#0b131e]/50 border border-[#36ADA3]/15 backdrop-blur-md rounded-full p-2 shadow-[0_0_25px_rgba(54,173,163,0.08)] hover:border-[#36ADA3]/30 hover:shadow-[0_0_35px_rgba(54,173,163,0.15)] transition-all duration-500">
                        <button
                            onClick={() => {
                                if (visibleCount < projects.length) {
                                    setVisibleCount(prev => prev + 3);
                                }
                            }}
                            disabled={visibleCount >= projects.length}
                            className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center ${
                                visibleCount >= projects.length
                                    ? "text-slate-600 opacity-20 cursor-not-allowed"
                                    : "text-[#36ADA3] hover:bg-[#36ADA3]/10 hover:shadow-[0_0_15px_rgba(54,173,163,0.25)] hover:scale-110 active:scale-95 cursor-pointer"
                            }`}
                            title="Ver mais projetos"
                        >
                            <IconChevronDown size={24} className={visibleCount < projects.length ? "animate-bounce" : ""} />
                        </button>
                        
                        <div className="h-6 w-[1px] bg-slate-800/80" />
                        
                        <button
                            onClick={() => {
                                if (visibleCount > 6) {
                                    setVisibleCount(6);
                                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            disabled={visibleCount <= 6}
                            className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center ${
                                visibleCount <= 6
                                    ? "text-slate-600 opacity-20 cursor-not-allowed"
                                    : "text-[#36ADA3] hover:bg-[#36ADA3]/10 hover:shadow-[0_0_15px_rgba(54,173,163,0.25)] hover:scale-110 active:scale-95 cursor-pointer"
                            }`}
                            title="Ver menos"
                        >
                            <IconChevronUp size={24} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}