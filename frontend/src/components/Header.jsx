import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    }, [i18n.language]);

    const toggleLanguage = () => {
        const newLang = i18n.language === "ar" ? "en" : "ar";
        i18n.changeLanguage(newLang);
    };

    const navItems = [
        { label: t("nav.home"), href: "#" },
        { label: t("nav.about"), href: "#" },
        { label: t("nav.services"), href: "#" },
        { label: t("nav.projects"), href: "#" },
        { label: t("nav.contact"), href: "#" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-[1px] border-gray-300
            ${isScrolled ? "bg-[#111] shadow-md" : "bg-transparent"}
            text-white`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 ">
                {/* Logo */}
                <div className="flex items-center gap-2 py-4">
                    <img src="/logo.png" alt="logo" className="h-12" />
                    <span className="text-xl font-bold text-[var(--gold)]">بي آر آي كيو</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex  items-center font-medium">
                    {navItems.map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            className="h-[100%] relative group transition border-x-[1px] border-gray-300 py-4 px-4"
                        >
                            <span className="text-silver group-hover:text-[var(--gold)] transition">{item.label}</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--gold)] group-hover:w-full transition-all duration-300"></span>
                        </a>
                    ))}
                    <button
                        onClick={toggleLanguage}
                        className="ml-4 border border-[var(--silver)] text-sm px-3 py-1 mr-4 rounded hover:bg-[var(--silver)] hover:text-black transition"
                    >
                        {i18n.language === "ar" ? "EN" : "ع"}
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <div className="md:hidden z-50">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-[#111] text-white py-6 px-6 space-y-4 text-center">
                    {navItems.map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-lg hover:text-[var(--gold)] transition"
                        >
                            {item.label}
                        </a>
                    ))}
                    <button
                        onClick={toggleLanguage}
                        className="mt-4 border border-[var(--silver)] px-4 py-1 rounded hover:bg-[var(--silver)] hover:text-black transition"
                    >
                        {i18n.language === "ar" ? "EN" : "ع"}
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;


