import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import gsap from "gsap";

export default function NavBar() {
    const [selectButton, setSelectButton] = useState<string>("home");

    useEffect(() => {
        gsap.fromTo(".nav-bar-container",
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
        );
    }, []);

    const navItems = [
        { id: "home", label: "Home" },
        { id: "projects", label: "Projetos" },
        { id: "about", label: "Sobre" },
        { id: "contact", label: "Contato" },
    ];

    const selectedIndex = navItems.findIndex(item => item.id === selectButton);

    return (
        <nav className="fixed top-4 md:top-6 left-0 w-full flex justify-center h-12 md:h-14 z-50 pointer-events-none px-4 opacity-0 nav-bar-container">
            <div className="bg-[#1d2d44]/90 backdrop-blur-md border border-[#36ADA3]/50 shadow-[0_0_15px_rgba(54,173,163,0.3)] rounded-full h-full w-full max-w-[360px] md:max-w-[500px] p-1 relative isolate pointer-events-auto">
                <div className="relative flex w-full h-full items-center">
                    <div
                        className="absolute top-0 left-0 h-full bg-[#3e5c76] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10"
                        style={{
                            width: '25%',
                            transform: `translateX(${selectedIndex * 100}%)`
                        }}
                    />

                    {navItems.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className={`rounded-full cursor-pointer h-full flex-1 font-medium text-xs md:text-sm transition-colors duration-300 ease-in-out px-0 py-0
                                ${selectButton === item.id ? "text-white" : "text-slate-400 hover:text-white hover:bg-transparent"}`}
                            onClick={() => {
                                setSelectButton(item.id);
                                const element = document.getElementById(item.id);
                                if (element) {
                                    element.scrollIntoView({ behavior: "smooth" });
                                }
                            }}>
                            {item.label}
                        </Button>
                    ))}
                </div>
            </div>
        </nav>
    )
}   