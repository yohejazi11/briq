import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from "../components/ProjectCard"; // عدّل المسار حسب مكان المكون

function Home() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const { t, i18n } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    }, [i18n.language]);

    // Scroll to section if scrollTo param exists
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const scrollTo = params.get('scrollTo');
        if (scrollTo) {
            setTimeout(() => {
                const el = document.getElementById(scrollTo);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            }, 300);
        }
    }, [location]);

    useEffect(() => {
        axios.get("http://localhost/buildcompany/backend/api/get_projects.php") // غيّر المسار حسب الحاجة
            .then(res => {
                if (res.data.status === "success") {
                    setProjects(res.data.data);
                }
                setLoading(false);
            }).catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        fetch("http://localhost/buildcompany/backend/api/contact.php", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status=="success") {
                    alert("✅ تم إرسال رسالتك بنجاح!");
                    e.target.reset();
                } else {
                    alert("❌ حدث خطأ أثناء الإرسال.");
                }
            })
            .catch((err) => {
                console.error(err);
                alert("❌ حدث خطأ في الاتصال بالسيرفر.");
            });
    }


    return (
        <HelmetProvider>
            <Helmet>
                <title>{t('home.seo_title') || 'شركة بي آر آي كيو للبناء | أفضل حلول البناء والمقاولات'}</title>
                <meta name="description" content={t('home.seo_description') || ' شركة بي آر آي كيو للبناء والمقاولات  تقدم أفضل خدمات البناء والمقاولات، إدارة المشاريع، التصميم الداخلي، وتجديد المنازل في السعودية.'} />
                <meta name="keywords" content="شركة بي آر آي كيو للبناء  , مقاولات, بناء, مشاريع, تصميم داخلي, تجديد منازل, السعودية" />
                <meta property="og:title" content={t('home.seo_title') || ' شركة بي آر آي كيو للبناء والمقاولات  | أفضل حلول البناء والمقاولات'} />
                <meta property="og:description" content={t('home.seo_description') || ' شركة بي آر آي كيو للبناء والمقاولات  تقدم أفضل خدمات البناء والمقاولات، إدارة المشاريع، التصميم الداخلي، وتجديد المنازل في السعودية.'} />
                <meta property="og:image" content="https://briqfront.onrender.com/build1.jpeg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://briqfront.onrender.com/" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t('home.seo_title') || 'شركة بي آر آي كيو للبناء | أفضل حلول البناء والمقاولات'} />
                <meta name="twitter:description" content={t('home.seo_description') || 'شركة بي آر آي كيو للبناء تقدم أفضل خدمات البناء والمقاولات، إدارة المشاريع، التصميم الداخلي، وتجديد المنازل في السعودية.'} />
                <meta name="twitter:image" content="https://briqfront.onrender.com/build1.jpeg" />
                <meta name="twitter:image:width" content="1200" />
                <meta name="twitter:image:height" content="630" />
            </Helmet>
            <div className="font-sans ">
                <Header />

                {/* Intro Section */}
                <section className="relative w-full h-screen bg-blue-900 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/introPic.png')] bg-cover bg-center animate-zoomSlow" />
                    <div className="absolute inset-0 bg-black opacity-30" />
                    <div className='intro-texture w-[100%] h-[100vh] absolute top-0 z-10'></div>

                    <motion.div
                        className="absolute inset-0 z-10 flex items-center justify-center text-white text-center px-6"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-10 drop-shadow-lg">{t('home.tagline')}</h1>
                            <motion.a
                                href="#contactUs"
                                className="px-6 py-4 text-[#E6B31E] font-bold border-[#E6B31E] border-[1.5px] rounded-md shadow-lg hover:bg-[#E6B31E] hover:text-white transition"
                                whileHover={{ scale: 1.08 }}
                            >
                                {t("home.contact_title")}
                                
                            </motion.a>
                        </div>
                    </motion.div>
                </section>

                {/* About Us */}
                <section className="w-full min-h-screen flex flex-col gap-y-4 md:flex-row items-center justify-center overflow-x-hidden">
                    <motion.div
                        className="w-full md:w-[60%] text-center flex flex-col items-start p-10"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#E6B31E]">{t('home.about_title')}</h2>
                        <p className={`w-full md:w-[60%] text-gray-800 font-semibold text-[1.2rem] max-sm:text-[18px] max-sm:p-2 ${i18n.language==="ar"?"text-right":"text-left"}  bg-white/70 rounded-lg p-4 shadow`}>
                            {t('home.about_text')}
                        </p>
                    </motion.div>
                    <motion.div
                        className="relative w-full md:w-[40%] h-[600px] md:h-[100vh] flex items-center justify-center bg-[#686D76] first-bg main-shadow max-sm:hidden"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={`relative w-[80vw] max-w-[600px] h-[80vw] max-h-[600px] md:w-[40vw] md:h-[40vw] flex items-center ${i18n.language === "ar" ? "translate-x-[25%]" : "translate-x-[-25%]"}  justify-center main-shadow`}>
                            <img
                                className="w-full h-full object-cover"
                                src="bg11.jpg"
                                alt="مشروع بناء حديث - شركة البناء"
                            />
                            <div className={`absolute inset-0 z-10 bg-black opacity-35 `}></div>
                        </div>
                    </motion.div>
                </section>

                {/* Why Us - تصميم ونصوص محسنة */}
                <section className="w-full min-h-[60vh] bg-gradient-to-br from-[#f8fafc] via-[#f3f4f6] to-[#fff] py-20 px-4 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#E6B31E] drop-shadow-lg">
                            {t("home.why_us") || "لماذا نحن؟"}
                        </h2>
                        <p className="text-gray-700 max-w-2xl mx-auto mb-14 text-lg font-medium leading-relaxed">
                             {t("home.why_us_text_1")} <span className="text-[#E6B31E] font-bold">{t("home.company_name")} </span> {t("home.why_us_text_2") || "نقدم حلولاً متكاملة في مجال البناء والمقاولات، حيث نركز على الجودة والابتكار في كل مشروع نقوم به."}
                        </p>
                        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
                            {[
                                {
                                    icon: "quality.png",
                                    title: t("home.features.quality.title"),
                                    text: t("home.features.quality.description"), bg: "bg-[#E6B31E]/10"
                                },
                                {
                                    icon: "deal.png",
                                    title: t("home.features.commitment.title"),
                                    text: t("home.features.commitment.description"), bg: "bg-[#686D76]/10"
                                },
                                {
                                    icon: "medal.png",
                                    title: t("home.features.team.title"),
                                    text: t("home.features.team.description"),
                                    bg: "bg-[#E6B31E]/10"
                                },
                                {
                                    icon: "innovation.png",
                                    title: t("home.features.innovation.title"),
                                    text: t("home.features.innovation.description"),
                                    bg: "bg-[#686D76]/10"
                                }

                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    className={`flex flex-col items-center rounded-2xl shadow-xl p-8 glass-card ${item.bg} hover:scale-105 transition-transform duration-300`}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                                >
                                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white shadow-lg mb-5 border-4 border-[#E6B31E]/20">
                                        <img className="w-12 h-12" src={item.icon} alt={item.title} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#333] mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* Services */}
                <section className="w-full min-h-screen bg-[#686D76] py-16 px-4 second-bg overflow-x-hidden">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#E6B31E] mb-12">
                            {t('home.services_title')}
                        </h2>

                        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 w-full">
                            {[
                                {
                                    icon: "construction.png",
                                    title: t("home.services.construction"),
                                    desc: t("home.services.construction_desc"),
                                },
                                {
                                    icon: "project-management.png",
                                    title: t("home.services.management"),
                                    desc: t("home.services.management_desc"),
                                },
                                {
                                    icon: "interior-design.png",
                                    title: t("home.services.design"),
                                    desc: t("home.services.design_desc"),
                                },
                                {
                                    icon: "home-renovation.png",
                                    title: t("home.services.renovation"),
                                    desc: t("home.services.renovation_desc"),
                                },
                            ].map((service, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex flex-col items-center bg-white rounded-md shadow-lg hover:shadow-xl transition p-6 text-start"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                                    whileHover={{ scale: 1.04 }}
                                >
                                    <img className="w-[80px] h-[80px] mb-4" src={service.icon} alt={service.title} />
                                    <h3 className="text-xl font-semibold text-[#333] mb-2">{service.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Works */}
                <section className="w-full min-h-screen p-10 main-bg bg-gray-50 third-bg" id="projects">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#E6B31E]">
                        {t('home.our_works')}
                    </h2>
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#E6B31E]"></div>
                        </div>
                    ) : (
                        <>
                        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                            {projects.slice(0, 6).map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.03, boxShadow: "0 8px 32px #E6B31E33" }}
                                    onClick={() => window.location.href = `/project/${project.id}`}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <ProjectCard project={project} delay={index * 100} />
                                </motion.div>
                            ))}
                        </div>
                        {projects.length > 6 && (
                            <div className="flex justify-center mt-8">
                                <a href="/projects" className="px-8 py-3 bg-[#E6B31E] text-white font-bold rounded shadow hover:bg-[#c99c19] transition">{t("home.show_more")}</a>
                            </div>
                        )}
                        </>
                    )}
                </section>


                {/* Contact Us - تصميم جديد */}
                <section
                    id="contactUs"
                    className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6B31E]/10 via-[#686D76]/10 to-[#fff] py-16 px-4 overflow-hidden"
                >
                    {/* زخارف خلفية دائرية */}
                    <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#E6B31E]/20 blur-3xl rounded-full z-0"></div>
                    <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#686D76]/20 blur-3xl rounded-full z-0"></div>

                    <motion.div
                        className="relative z-10 flex flex-col md:flex-row items-center w-full max-w-5xl"
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* العنوان الجانبي */}
                        <div className="hidden md:flex flex-col items-start justify-center w-1/3 pr-8">
                            <h2 className="text-4xl font-bold text-[#E6B31E] mb-4 drop-shadow-lg">{t('home.contact_title')}</h2>
                            <p className="text-gray-700 text-lg">{t('home.contact_subtext') || "نسعد بتواصلك معنا لأي استفسار أو طلب عرض سعر."}</p>
                            <div className="mt-8 flex items-center gap-3 text-[#686D76]">
                                <svg width="24" height="24" fill="none" stroke="currentColor" className="mr-2"><path d="M21 10.5a8.38 8.38 0 01-.9 3.8c-.6 1.2-1.5 2.3-2.6 3.1-1.1.8-2.4 1.3-3.8 1.3s-2.7-.5-3.8-1.3c-1.1-.8-2-1.9-2.6-3.1A8.38 8.38 0 013 10.5C3 6.4 6.4 3 10.5 3S18 6.4 18 10.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <span className="font-semibold">info@briq-1.sa</span>
                            </div>
                            <div className="mt-2 flex items-center gap-3 text-[#686D76]">
                                <svg width="24" height="24" fill="none" stroke="currentColor" className="mr-2"><path d="M22 16.92V19a2 2 0 01-2 2h-1a19.72 19.72 0 01-8.7-3.1A19.5 19.5 0 013 5V4a2 2 0 012-2h2.09a2 2 0 012 1.72c.13 1.13.37 2.24.7 3.32a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c1.08.33 2.19.57 3.32.7A2 2 0 0122 16.92z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <span className="font-semibold">+966 532344964</span>
                            </div>
                        </div>

                        {/* الفورم */}
                        <motion.form
                            className="w-full md:w-2/3 bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-[#E6B31E]/10"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <h2 className="md:hidden text-3xl font-bold text-[#E6B31E] mb-2 text-center">{t('home.contact_title')}</h2>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative w-full">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E6B31E]">
                                        <svg width="22" height="22" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </span>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={t('home.name')}
                                        className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E6B31E] w-full text-right"
                                        required
                                    />
                                </div>
                                <div className="relative w-full">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E6B31E]">
                                        <svg width="22" height="22" fill="none" stroke="currentColor"><path d="M22 16.92V19a2 2 0 01-2 2h-1a19.72 19.72 0 01-8.7-3.1A19.5 19.5 0 013 5V4a2 2 0 012-2h2.09a2 2 0 012 1.72c.13 1.13.37 2.24.7 3.32a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c1.08.33 2.19.57 3.32.7A2 2 0 0122 16.92z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder={t('home.phone')}
                                        className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E6B31E] w-full text-right"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-5 text-[#E6B31E]">
                                    <svg width="22" height="22" fill="none" stroke="currentColor"><path d="M21 10.5a8.38 8.38 0 01-.9 3.8c-.6 1.2-1.5 2.3-2.6 3.1-1.1.8-2.4 1.3-3.8 1.3s-2.7-.5-3.8-1.3c-1.1-.8-2-1.9-2.6-3.1A8.38 8.38 0 013 10.5C3 6.4 6.4 3 10.5 3S18 6.4 18 10.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </span>
                                <textarea
                                    rows={4}
                                    name="message"
                                    placeholder={t('home.message')}
                                    className="pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E6B31E] w-full text-right"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-[#E6B31E] hover:bg-[#c99c19] text-white font-bold py-3 rounded-lg transition shadow-lg text-lg"
                            >
                                {t('home.send_message')}
                            </button>
                        </motion.form>
                    </motion.div>
                </section>

                {/* Map Section */}
                <section className="w-full h-screen px-4 py-10 flex flex-col items-center justify-center bg-gray-100">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#E6B31E]">{t('home.map_location')}</h2>

                    <div className="w-full max-w-5xl h-[500px] rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            title="office-map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.8160561528424!2d46.7749748!3d24.7603954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f01b864d1d9ed%3A0xb7f0ca3cea6796d4!2z2YXYrNmF2K3YqSDYp9mE2KrZhdmK2Ycg2YTZhNmF2YjYp9mK2Kcg2KfZhNmF2YbYt9mI2YTZhA!5e0!3m2!1sar!2ssa!4v1717523215432!5m2!1sar!2ssa"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </section>

                <a
                    href="https://wa.me/966532344964" // ← عدل الرقم إلى رقمك
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300"
                    aria-label="WhatsApp"
                >
                    <img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
                </a>


                <Footer />
            </div>
        </HelmetProvider>
    );
}

export default Home;
