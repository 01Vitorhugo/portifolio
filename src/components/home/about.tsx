import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
    IconBrandReact, 
    IconBrandTailwind, 
    IconTerminal, 
    IconPalette,
    IconDatabase,
    IconCode,
    IconDownload,
    IconDeviceDesktop
} from "@tabler/icons-react"

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    useEffect(() => {
        const headerAnim = gsap.fromTo(".about-header",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 95%",
                    toggleActions: "play reset play reset"
                }
            }
        );

        const contentAnim = gsap.fromTo(".about-content",
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 95%",
                    toggleActions: "play reset play reset"
                }
            }
        );

        const skillsAnim = gsap.fromTo(".skill-card",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 95%",
                    toggleActions: "play reset play reset"
                }
            }
        );

        ScrollTrigger.refresh();

        return () => {
            headerAnim.scrollTrigger?.kill();
            headerAnim.kill();
            contentAnim.scrollTrigger?.kill();
            contentAnim.kill();
            skillsAnim.scrollTrigger?.kill();
            skillsAnim.kill();
        };
    }, []);

    const skills = [
        {
            title: "React & Next.js",
            description: "Desenvolvimento de aplicações SPA e SSR eficientes, modulares e focadas na melhor experiência de usuário.",
            icon: IconBrandReact
        },
        {
            title: "Styling & Responsividade",
            description: "Criação de layouts modernos, rápidos e totalmente adaptáveis a qualquer tela usando TailwindCSS e CSS moderno.",
            icon: IconBrandTailwind
        },
        {
            title: "Ferramentas & Workflow",
            description: "Uso avançado de Git, GitHub, Vite e gerenciadores de pacotes para manter um fluxo de trabalho limpo e ágil.",
            icon: IconTerminal
        },
        {
            title: "Interface & Animações",
            description: "Implementação de micro-animações premium e transições fluidas usando GSAP e bibliotecas de movimento.",
            icon: IconPalette
        },
        {
            title: "Back-end & Integrações",
            description: "Consumo de APIs RESTful, integração com serviços externos e desenvolvimento básico de rotas em Node.js.",
            icon: IconCode
        },
        {
            title: "Bancos de Dados",
            description: "Criação de consultas eficientes e integração de bancos de dados relacionais e não-relacionais nas aplicações.",
            icon: IconDatabase
        },
        {
            title: "Aplicações Desktop & Tauri",
            description: "Experiência prática no desenvolvimento de apps desktop leves e performáticos para múltiplos sistemas usando Tauri e React.",
            icon: IconDeviceDesktop
        }
    ];

    return (
        <div className="relative flex flex-col items-center justify-center w-full px-6 md:px-10 pb-24 mt-16 overflow-hidden scroll-mt-20 md:scroll-mt-28" id="about">
            <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#36ADA3]/5 rounded-full blur-[100px] md:blur-[180px] pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#1d2d44]/20 rounded-full blur-[100px] md:blur-[180px] pointer-events-none -z-10" />

            <div className="flex flex-col items-center mb-16 text-center z-10 opacity-0 about-header">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#36ADA3] tracking-tight">
                    Sobre mim
                </h1>
                <div className="h-1 w-16 bg-gradient-to-r from-[#36ADA3] to-[#2c9188] rounded-full mt-3 shadow-[0_0_10px_rgba(54,173,163,0.5)]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl z-10 mb-20 opacity-0 about-content">
                <div className="lg:col-span-7 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Criando soluções digitais <span className="text-[#36ADA3]">modernas e eficientes</span>
                    </h2>
                    <div className="text-slate-300 text-base md:text-lg space-y-4 leading-relaxed font-light">
                        <p>
                            Olá! Sou um desenvolvedor focado em criar experiências interativas de alta qualidade na web. 
                            Minha jornada começou com a paixão por tecnologia e design, o que me levou a mergulhar profundamente no desenvolvimento front-end moderno.
                        </p>
                        <p>
                            Acredito que um bom código deve caminhar junto com uma interface polida, fluida e acessível. 
                            Busco sempre me atualizar com as melhores práticas de desenvolvimento, garantindo performance de carregamento, SEO otimizado e manutenibilidade.
                        </p>
                        <p>
                            No momento, estou focado em criar aplicações escaláveis em React e Next.js, explorando micro-interações envolventes e me aprofundando em engenharia de software no geral.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-5 flex items-center justify-center">
                    <div className="relative w-full max-w-md p-6 md:p-8 bg-[#0b131e]/40 border border-[#36ADA3]/10 text-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md overflow-hidden group hover:border-[#36ADA3]/30 hover:shadow-[0_0_30px_rgba(54,173,163,0.1)] transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#36ADA3]/5 to-transparent pointer-events-none -z-10" />
                        
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#36ADA3]" />
                            Detalhes Profissionais
                        </h3>

                        <div className="space-y-4 text-sm md:text-base">
                            <div className="flex justify-between py-2 border-b border-slate-800/60">
                                <span className="text-slate-400">Nome:</span>
                                <span className="text-white font-medium">Vitor Hugo</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-800/60">
                                <span className="text-slate-400">Atuação:</span>
                                <span className="text-[#36ADA3] font-semibold">Front-end Developer</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-800/60">
                                <span className="text-slate-400">Especialidade:</span>
                                <span className="text-white font-medium">JavaScript / React JS</span>
                            </div>
                            {/* <div className="flex justify-between py-2 border-b border-slate-800/60">
                                <span className="text-slate-400">Disponibilidade:</span>
                                <span className="text-emerald-400 font-medium">Open to Work</span>
                            </div> */}

                            <div className="pt-4">
                                <a 
                                    href="/curriculo.pdf" 
                                    download="Curriculo_Vitor_Hugo.pdf"
                                    className="w-full bg-[#36ADA3] hover:bg-[#2c9188] text-[#0b131e] hover:text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 h-11 cursor-pointer shadow-[0_0_15px_rgba(54,173,163,0.15)] hover:shadow-[0_0_25px_rgba(54,173,163,0.3)] decoration-transparent text-sm"
                                >
                                    <IconDownload size={18} />
                                    Baixar Currículo
                                </a>
                            </div>
                        </div>

 
                        <div className="w-full h-1 bg-[#36ADA3]/10 group-hover:bg-[#36ADA3]/30 transition-colors duration-500 mt-6 rounded-full" />
                    </div>
                </div>
            </div>

            <div className="w-full max-w-7xl z-10 flex flex-col items-center">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-8 self-start flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#36ADA3]" />
                    Minhas Competências
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full skills-grid">
                    {skills.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                            <div 
                                key={index} 
                                className="relative bg-[#0b131e]/30 border border-[#36ADA3]/10 text-slate-100 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(54,173,163,0.15)] hover:border-[#36ADA3]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 group opacity-0 skill-card"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#36ADA3]/10 border border-[#36ADA3]/20 flex items-center justify-center text-[#36ADA3] group-hover:bg-[#36ADA3] group-hover:text-[#0b131e] transition-all duration-300 shadow-[0_0_15px_rgba(54,173,163,0.1)]">
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#36ADA3] transition-colors duration-300">
                                        {skill.title}
                                    </h4>
                                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                                        {skill.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}