import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-[#2C2F33] text-white py-14 relative z-10 mt-20 overflow-hidden">
            {/* تأثير زخرفي دائري */}
            <div className="absolute top-[-40px] left-[-40px] w-52 h-52 bg-[#E6B31E]/20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-[-40px] right-[-40px] w-52 h-52 bg-[#686D76]/30 blur-3xl rounded-full"></div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-start relative z-10">
                {/* الشعار والوصف */}
                <div>
                    <img src="logo.png" alt="logo" className="w-32 mx-auto md:mx-0 mb-5" />
                    <p className="text-sm text-gray-300 leading-relaxed">
                        {t("footer.description")}
                    </p>
                </div>

                {/* الروابط */}
                <div>
                    <h3 className="text-lg font-bold text-[#E6B31E] mb-5">{t("footer.links")}</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li><a href="#" className="hover:text-[#E6B31E] transition">{t("nav.home")}</a></li>
                        <li><a href="#" className="hover:text-[#E6B31E] transition">{t("nav.about")}</a></li>
                        <li><a href="#" className="hover:text-[#E6B31E] transition">{t("nav.services")}</a></li>
                        <li><a href="#" className="hover:text-[#E6B31E] transition">{t("nav.projects")}</a></li>
                        <li><a href="#" className="hover:text-[#E6B31E] transition">{t("nav.contact")}</a></li>
                    </ul>
                </div>

                {/* التواصل */}
                <div>
                    <h3 className="text-lg font-bold text-[#E6B31E] mb-5">{t("footer.contact")}</h3>
                    <p className="text-sm text-gray-300 mb-2">
                        <strong>{t("footer.email")}:</strong> info@briq-1.sa
                    </p>
                    <p className="text-sm text-gray-300 mb-2">
                        <strong>{t("footer.phone")}:</strong> +966 532344964
                    </p>
                    <p className="text-sm text-gray-300">{t("footer.address")}</p>
                </div>
            </div>

            {/* الحقوق */}
            <div className="mt-12 text-center text-xs text-gray-400 border-t border-white/10 pt-4 relative z-10">
                © {new Date().getFullYear()} {t("footer.rights")}
            </div>
        </footer>
    );
};

export default Footer;

