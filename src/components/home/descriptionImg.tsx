import { useState, useEffect } from "react";
import ImgVitor from "../../assets/imgVitor.png"
import { Button } from "@base-ui/react";
import { IconBrandLinkedinFilled } from "@tabler/icons-react";
import { Navigate } from "react-router-dom";

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

    function ConnectLinkdin() {
        window.open("https://www.linkedin.com/in/vitorhugodev/");

    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen pt-24 md:pt-0" id="home">

            <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative uppercase text-slate-100 order-1 px-6 md:px-0 pb-12 md:pb-0 z-10">
                <div className="text-center md:text-left w-fit flex flex-col items-center md:items-start">
                    <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold min-h-[28px] sm:min-h-[32px] md:min-h-[40px] mb-2">
                        {text1}
                        {text1.length < fullText1.length && <span className="animate-blink text-[#3e5c76] ml-1">|</span>}
                    </p>
                    <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold min-h-[28px] sm:min-h-[32px] md:min-h-[40px] text-slate-300">
                        {text2}
                        {text1.length === fullText1.length && <span className="animate-blink text-[#3e5c76] ml-1">|</span>}
                    </p>
                </div>

                <div className={`flex gap-10 mt-8 transition-all duration-1000 w-full items-center justify-center 
                ${text1.length === fullText1.length && text2.length === fullText2.length ? 'opacity-100 translate-y-0' :
                        'opacity-0 translate-y-4 pointer-events-none'}`}>

                    <Button
                        className="text-white bg-[#1d2d44]/90 backdrop-blur-md border border-[#3e5c76]/50 shadow-[0_0_15px_rgba(62,92,118,0.3)] hover:shadow-[0_0_25px_rgba(62,92,118,0.6)] hover:bg-[#3e5c76]/80 flex items-center justify-center gap-3 md:gap-4 rounded-full cursor-pointer h-14 md:h-16 px-6 md:px-8 font-medium transition-all duration-300 ease-in-out"
                        onClick={() => { ConnectLinkdin() }}>
                        <IconBrandLinkedinFilled className="w-6 h-6 md:w-[30px] md:h-[30px]" />
                        <p className="text-sm md:text-base"> Vamos nos conectar? </p>
                    </Button>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center relative order-2 flex-1  md:mt-0 min-h-[100px]">
                <div className="absolute w-64 h-64 md:w-100 md:h-100 bg-[#3e5c76]/40 rounded-full blur-[60px] md:blur-[80px] -z-10 animate-pulse"></div>
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