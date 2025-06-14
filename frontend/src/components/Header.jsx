import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = (props) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("login"));
    }, []);

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

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        window.location.href = "/login";
    };

    // دالة للتعامل مع روابط الأقسام الداخلية
    const handleSectionNav = (e, sectionId) => {
        e.preventDefault();
        if (location.pathname === "/") {
            // إذا كنت في الصفحة الرئيسية، اعمل scroll مباشرة
            const el = document.getElementById(sectionId);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // إذا كنت في صفحة أخرى، انتقل للرئيسية مع باراميتر
            navigate(`/?scrollTo=${sectionId}`);
        }
        setIsOpen(false);
    };

    const navItems = [
        { label: t("nav.home"), href: "/" },
        { label: t("nav.about"), href: "#about" },
        { label: t("nav.services"), href: "#services" },
        { label: t("nav.projects"), href: "#projects" },
        { label: t("nav.contact"), href: "#contactUs" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-[1px] border-gray-300
            ${isScrolled || props.black ? "bg-[#111] shadow-md" : "bg-transparent"}
            text-white`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 ">
                {/* Logo */}
                <div className="flex items-center gap-2 py-4">
                    <img src="/logo.png" alt="logo" className="h-12" />
                    <span className="text-xl font-bold text-[var(--gold)]">{t("home.company_name")}</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex  items-center font-medium">
                    {navItems.map((item, i) => {
                        if (item.href.startsWith("#")) {
                            return (
                                <a
                                    key={i}
                                    href={item.href}
                                    onClick={e => handleSectionNav(e, item.href.replace('#', ''))}
                                    className="h-[100%] relative group transition border-x-[1px] border-gray-300 py-4 px-4"
                                >
                                    <span className="text-silver group-hover:text-[var(--gold)] transition">{item.label}</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--gold)] group-hover:w-full transition-all duration-300"></span>
                                </a>
                            );
                        } else if (item.href.startsWith("/")) {
                            return (
                                <Link
                                    key={i}
                                    to={item.href}
                                    className="h-[100%] relative group transition border-x-[1px] border-gray-300 py-4 px-4"
                                >
                                    <span className="text-silver group-hover:text-[var(--gold)] transition">{item.label}</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--gold)] group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            );
                        }
                        return null;
                    })}
                    {!isLoggedIn && (
                        <>
                            <Link to="/login" className="h-[100%] relative group transition border-x-[1px] border-gray-300 py-4 px-4">
                                <span className="text-silver group-hover:text-[var(--gold)] transition">{t("nav.login")}</span>
                            </Link>
                            <Link to="/register" className="h-[100%] relative group transition border-x-[1px] border-gray-300 py-4 px-4">
                                <span className="text-silver group-hover:text-[var(--gold)] transition">{t("nav.register")}</span>
                            </Link>
                        </>
                    )}
                    {isLoggedIn && (
                        <Link to="/dashboard" onClick={() => setIsOpen(false)} className="h-[100%] relative group transition border-x-[1px] border-gray-300 py-4 px-4">
                            {t("nav.dashboard")} 
                        </Link>
                    )}
                    {isLoggedIn && (
                        <button
                            onClick={handleLogout}
                            className="ml-4 border border-[var(--silver)] text-sm px-3 py-1 mr-4 rounded hover:bg-[var(--silver)] hover:text-black transition"
                        >
                            {t("nav.logout")}
                        </button>
                    )}
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
                    {navItems.map((item, i) => {
                        if (item.href.startsWith("#")) {
                            return (
                                <a
                                    key={i}
                                    href={item.href}
                                    onClick={e => handleSectionNav(e, item.href.replace('#', ''))}
                                    className="block text-lg hover:text-[var(--gold)] transition"
                                >
                                    {item.label}
                                </a>
                            );
                        } else if (item.href.startsWith("/")) {
                            return (
                                <Link
                                    key={i}
                                    to={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-lg hover:text-[var(--gold)] transition"
                                >
                                    {item.label}
                                </Link>
                            );
                        }
                        return null;
                    })}
                    {!isLoggedIn && (
                        <>
                            <Link to="/login" onClick={() => setIsOpen(false)} className="block text-lg hover:text-[var(--gold)] transition">
                                {t("nav.login")}
                            </Link>
                            <Link to="/register" onClick={() => setIsOpen(false)} className="block text-lg hover:text-[var(--gold)] transition">
                                {t("nav.register")}
                            </Link>
                        </>
                    )}
                    {isLoggedIn && (
                        <Link to="/admin" onClick={() => setIsOpen(false)} className="block text-lg hover:text-[var(--gold)] transition">
                            {t("nav.dashboard")}
                        </Link>
                    )}
                    {isLoggedIn && (
                        <button
                            onClick={() => { handleLogout(); setIsOpen(false); }}
                            className="mt-4 border border-[var(--silver)] px-4 py-1 rounded hover:bg-[var(--silver)] hover:text-black transition"
                        >
                            {t("nav.logout")}
                        </button>
                    )}
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


