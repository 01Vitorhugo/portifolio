import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import gsap from "gsap";
import { IconHome, IconRocket, IconUser, IconMail } from "@tabler/icons-react";

const navItems = [
    { id: "home", label: "Home", icon: IconHome },
    { id: "projects", label: "Projetos", icon: IconRocket },
    { id: "about", label: "Sobre", icon: IconUser },
    { id: "contact", label: "Contato", icon: IconMail },
];

export default function NavBar() {
    const [selectButton, setSelectButton] = useState<string>("home");

    useEffect(() => {
        gsap.fromTo(".nav-bar-container",
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
        );
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const activeSections = navItems
                .map(item => ({ id: item.id, element: document.getElementById(item.id) }))
                .filter(item => item.element !== null) as { id: string; element: HTMLElement }[];

            if (activeSections.length === 0) return;

            if (window.scrollY < 50) {
                setSelectButton(activeSections[0].id);
                return;
            }

            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
            if (isAtBottom) {
                setSelectButton(activeSections[activeSections.length - 1].id);
                return;
            }

            const triggerPoint = 160;
            let currentActive = activeSections[0].id;

            for (let i = 0; i < activeSections.length; i++) {
                const rect = activeSections[i].element.getBoundingClientRect();
                if (rect.top <= triggerPoint) {
                    currentActive = activeSections[i].id;
                }
            }

            setSelectButton(currentActive);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Run once initially to sync state
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
                            className={`rounded-full cursor-pointer h-full flex-1 font-medium text-xs md:text-sm transition-colors duration-300 ease-in-out px-0 py-0 flex items-center justify-center gap-1.5 md:gap-2
                                ${selectButton === item.id ? "text-white" : "text-slate-400 hover:text-white hover:bg-transparent"}`}
                            onClick={() => {
                                setSelectButton(item.id);
                                const element = document.getElementById(item.id);
                                if (element) {
                                    element.scrollIntoView({ behavior: "smooth" });
                                }
                            }}>
                            {item.icon && <item.icon size={18} />}
                            {item.label}
                        </Button>
                    ))}
                </div>
            </div>
        </nav>
    );
}   