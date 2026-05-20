import { useState, useEffect } from "react";
import ImgVitor from "../../assets/imgVitor.png"
import { Button } from "@base-ui/react";
import { IconBrandLinkedinFilled } from "@tabler/icons-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function DescriptionImg() {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const fullText1 = "Olá, eu sou o Vitor Hugo,";
    const fullText2 = "Desenvolvedor Júnior";

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        let p1 = 0;
        let p2 = 0;

        const tick = () => {
            if (p1 < fullText1.length) {
                p1++;
                setText1(fullText1.substring(0, p1));
                timeoutId = setTimeout(tick, 80);
            } else if (p2 < fullText2.length) {
                p2++;
                setText2(fullText2.substring(0, p2));
                timeoutId = setTimeout(tick, 80);
            }
        };
        timeoutId = setTimeout(tick, 200);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const textAnim = gsap.fromTo(".desc-text-container",
            { x: -50, opacity: 0 },
            { 
                x: 0, 
                opacity: 1, 
                duration: 1, 
                ease: "power3.out", 
                delay: 0.3,
                scrollTrigger: {
                    trigger: "#home",
                    start: "top 80%",
                    toggleActions: "play reset play reset"
                }
            }
        );
        const photoAnim = gsap.fromTo(".profile-photo-container",
            { x: 50, opacity: 0, scale: 0.95 },
            { 
                x: 0, 
                opacity: 1, 
                scale: 1, 
                duration: 1.2, 
                ease: "power3.out", 
                delay: 0.4,
                scrollTrigger: {
                    trigger: "#home",
                    start: "top 80%",
                    toggleActions: "play reset play reset"
                }
            }
        );

        return () => {
            textAnim.scrollTrigger?.kill();
            photoAnim.scrollTrigger?.kill();
        };
    }, []);

    function ConnectLinkdin() {
        window.open("https://www.linkedin.com/in/vitorhugodev/");

    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen pt-24 md:pt-0 scroll-mt-20 md:scroll-mt-28  overflow-x-hidden " id="home">

            <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative uppercase text-slate-100 order-1 px-6 md:px-0 pb-12 md:pb-0 z-10">
                <div className="text-center md:text-left w-fit flex flex-col items-center md:items-start opacity-0 desc-text-container">
                    <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold min-h-[28px] sm:min-h-[32px] md:min-h-[40px] mb-2">
                        {text1}
                        {text1.length < fullText1.length && <span className="animate-blink text-[#36ADA3] ml-1">|</span>}
                    </p>
                    <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold min-h-[28px] sm:min-h-[32px] md:min-h-[40px] text-slate-300">
                        {text2}
                        {text1.length === fullText1.length && <span className="animate-blink text-[#36ADA3] ml-1">|</span>}
                    </p>
                </div>

                <div className={`flex gap-10 mt-8 transition-all duration-1000 w-full items-center justify-center 
                ${text1.length === fullText1.length && text2.length === fullText2.length ? 'opacity-100 translate-y-0' :
                        'opacity-0 translate-y-4 pointer-events-none'}`}>

                    <Button
                        className="text-white bg-[#1d2d44]/90 backdrop-blur-md border border-[#36ADA3]/50 shadow-[0_0_15px_rgba(54,173,163,0.3)] hover:shadow-[0_0_25px_rgba(54,173,163,0.6)] hover:bg-[#36ADA3]/80 flex items-center justify-center gap-3 md:gap-4 rounded-full cursor-pointer h-14 md:h-16 px-6 md:px-8 font-medium transition-all duration-300 ease-in-out"
                        onClick={() => { ConnectLinkdin() }}>
                        <IconBrandLinkedinFilled className="w-6 h-6 md:w-[30px] md:h-[30px]" />
                        <p className="text-sm md:text-base"> Vamos nos conectar? </p>
                    </Button>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center relative order-2 flex-1 md:mt-0 min-h-[100px] opacity-0 profile-photo-container">
                <div className="absolute w-64 h-64 md:w-100 md:h-100 bg-[#36ADA3]/40 rounded-full blur-[90px] md:blur-[150px] -z-10 animate-pulse"></div>
                <img
                    src={ImgVitor}
                    alt="Foto Vitor"
                    className="relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-h-full] md:max-h-[80vh] object-contain"
                    style={{
                        WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                    }}
                />
            </div>
        </div>
    )
}