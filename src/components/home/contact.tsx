import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
    IconMail,
    IconBrandWhatsapp,
    IconBrandLinkedin,
    IconBrandGithub,
    IconSend,
    IconCheck,
    IconCopy,
    IconCircleCheckFilled
} from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    useEffect(() => {
        const headerAnim = gsap.fromTo(".contact-header",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#contact",
                    start: "top 95%",
                    toggleActions: "play reset play reset"
                }
            }
        );

        const contentAnim = gsap.fromTo(".contact-content",
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#contact",
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
        };
    }, []);

    const handleCopyEmail = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText("vitorhhugo0031@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: "", email: "", message: "" });
        }, 1500);
    };

    const contactLinks = [
        {
            name: "Email",
            valueDisplay: "vitorhhugo0031@gmail.com",
            href: "mailto:vitorhhugo0031@gmail.com",
            icon: IconMail,
            color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            onClick: handleCopyEmail,
            actionIcon: IconCopy,
            actionLabel: "Copiar"
        },
        {
            name: "WhatsApp",
            valueDisplay: "+55 (XX) XXXXX-XXXX",
            href: "https://wa.me/5511995216604",
            icon: IconBrandWhatsapp,
            color: "text-green-400 bg-green-500/10 border-green-500/20",
            actionLabel: "Conversar"
        },
        {
            name: "LinkedIn",
            valueDisplay: "vitorhugodev",
            href: "https://www.linkedin.com/in/vitorhugodev/",
            icon: IconBrandLinkedin,
            color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
            actionLabel: "Conectar"
        },
        {
            name: "GitHub",
            valueDisplay: "01Vitorhugo",
            href: "https://github.com/01Vitorhugo",
            icon: IconBrandGithub,
            color: "text-slate-200 bg-slate-500/10 border-slate-500/20",
            actionLabel: "Seguir"
        }
    ];

    return (
        <div className="relative flex flex-col items-center justify-center w-full px-6 md:px-10 pb-24 mt-16 overflow-hidden scroll-mt-20 md:scroll-mt-28" id="contact">

            <div className="flex flex-col items-center mb-16 text-center z-10 opacity-0 contact-header">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#36ADA3] tracking-tight">
                    Contato
                </h1>
                <div className="h-1 w-16 bg-gradient-to-r from-[#36ADA3] to-[#2c9188] rounded-full mt-3 shadow-[0_0_10px_rgba(54,173,163,0.5)]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl z-10 opacity-0 contact-content">
                {/* Left Column: Direct Contacts */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full gap-8">
                    <div className="flex flex-col">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            Vamos criar algo <span className="text-[#36ADA3]">incrível</span> juntos?
                        </h2>
                        <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light mb-8">
                            Se você tem um projeto em mente ou apenas quer trocar uma ideia, fique à vontade para me contatar em qualquer um dos canais ou enviar uma mensagem!
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {contactLinks.map((link) => {
                                const Icon = link.icon;
                                const ActionIcon = link.actionIcon;
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target={link.name !== "Email" ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        onClick={link.onClick}
                                        className="relative group flex flex-col justify-between bg-[#0b131e]/40 border border-[#36ADA3]/10 hover:border-[#36ADA3]/30 rounded-2xl p-5 gap-4 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_0_20px_rgba(54,173,163,0.15)] hover:-translate-y-1 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#36ADA3]/5 to-transparent pointer-events-none -z-10" />

                                        <div className="flex items-center justify-between">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${link.color}`}>
                                                <Icon size={20} />
                                            </div>
                                            <span className="text-xs font-semibold text-slate-400 group-hover:text-[#36ADA3] transition-colors duration-300">
                                                {link.name === "Email" && copied ? (
                                                    <span className="flex items-center gap-1 text-emerald-400">
                                                        <IconCheck size={12} /> Copiado!
                                                    </span>
                                                ) : link.name === "Email" ? (
                                                    <span className="flex items-center gap-1">
                                                        {ActionIcon && <ActionIcon size={12} />} {link.actionLabel}
                                                    </span>
                                                ) : (
                                                    link.actionLabel
                                                )}
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-1 mt-2">
                                            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                                                {link.name}
                                            </span>
                                            <span className="text-sm font-medium text-white break-all leading-tight">
                                                {link.valueDisplay}
                                            </span>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="lg:col-span-7">
                    <div className="relative w-full p-6 md:p-8 bg-[#0b131e]/30 border border-[#36ADA3]/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md hover:border-[#36ADA3]/20 transition-all duration-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#36ADA3]/5 to-transparent pointer-events-none -z-10" />

                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#36ADA3] animate-pulse" />
                            Enviar Mensagem
                        </h3>

                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center animate-fadeIn">
                                <div className="w-16 h-16 bg-[#36ADA3]/10 border border-[#36ADA3]/20 rounded-full flex items-center justify-center text-[#36ADA3] mb-6 shadow-[0_0_20px_rgba(54,173,163,0.2)]">
                                    <IconCircleCheckFilled size={36} className="animate-scaleIn" />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-2">Mensagem Enviada!</h4>
                                <p className="text-slate-300 text-sm max-w-sm leading-relaxed">
                                    Obrigado pelo contato. Responderei o mais breve possível!
                                </p>
                                <Button
                                    onClick={() => setIsSubmitted(false)}
                                    variant="outline"
                                    className="mt-8 border-[#36ADA3]/20 hover:border-[#36ADA3]/40 text-[#36ADA3] font-medium rounded-xl px-5 h-10 hover:bg-[#36ADA3]/10 cursor-pointer transition-colors"
                                >
                                    Enviar outra mensagem
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-1.5">
                                        Nome Completo
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Seu nome"
                                        className="w-full bg-[#0b131e]/80 border border-[#36ADA3]/15 text-slate-100 rounded-xl px-4 py-3 text-sm placeholder-slate-500 outline-none transition-all focus:border-[#36ADA3] focus:shadow-[0_0_15px_rgba(54,173,163,0.2)] focus:ring-1 focus:ring-[#36ADA3]"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-1.5">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="seu.email@exemplo.com"
                                        className="w-full bg-[#0b131e]/80 border border-[#36ADA3]/15 text-slate-100 rounded-xl px-4 py-3 text-sm placeholder-slate-500 outline-none transition-all focus:border-[#36ADA3] focus:shadow-[0_0_15px_rgba(54,173,163,0.2)] focus:ring-1 focus:ring-[#36ADA3]"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-1.5">
                                        Sua Mensagem
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Como posso te ajudar?"
                                        className="w-full bg-[#0b131e]/80 border border-[#36ADA3]/15 text-slate-100 rounded-xl px-4 py-3 text-sm placeholder-slate-500 outline-none transition-all focus:border-[#36ADA3] focus:shadow-[0_0_15px_rgba(54,173,163,0.2)] focus:ring-1 focus:ring-[#36ADA3] resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-12 rounded-xl bg-[#36ADA3] hover:bg-[#2c9188] text-[#0b131e] font-bold transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(54,173,163,0.2)] hover:shadow-[0_0_25px_rgba(54,173,163,0.4)] flex items-center justify-center gap-2 border-none mt-2"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-[#0b131e] border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <IconSend size={18} />
                                            Enviar Mensagem
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}