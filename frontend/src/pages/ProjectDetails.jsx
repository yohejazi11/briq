import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imgIdx, setImgIdx] = useState(0);

    useEffect(() => {
        fetch("http://localhost/buildcompany/backend/api/get_projects.php")
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    const found = data.data.find(p => p.id === id);
                    setProject(found);
                }
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-40"><div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#E6B31E]"></div></div>;
    if (!project) return <div className="text-center text-red-600 mt-10">المشروع غير موجود</div>;

    // الصور
    const images = Array.isArray(project.images) && project.images.length > 0 ? project.images : [];
    const hasImages = images.length > 0;
    const showPrev = imgIdx > 0;
    const showNext = imgIdx < images.length - 1;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f3f4f6] to-[#fff] flex flex-col">
            <Header black={true}/>
            <main className="flex-1 flex items-center justify-center py-12 px-4 pt-[150px]">
                <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-14 flex flex-col md:flex-row gap-10 items-center">
                    <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                        <div className="relative w-full">
                            {hasImages ? (
                                <>
                                    <img
                                        src={images[imgIdx]}
                                        alt={project.title}
                                        className="w-full h-72 object-cover rounded-xl shadow-lg border-4 border-[#E6B31E]/20 mb-6"
                                    />
                                    {showPrev && (
                                        <button
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-yellow-200 z-10"
                                            onClick={() => setImgIdx(imgIdx - 1)}
                                            type="button"
                                        >
                                            <span className="text-2xl font-bold">&#8592;</span>
                                        </button>
                                    )}
                                    {showNext && (
                                        <button
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-yellow-200 z-10"
                                            onClick={() => setImgIdx(imgIdx + 1)}
                                            type="button"
                                        >
                                            <span className="text-2xl font-bold">&#8594;</span>
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-72 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 mb-6">لا توجد صور</div>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-4 text-right">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#E6B31E] mb-2 drop-shadow-lg">{project.title}</h2>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">{project.description}</p>
                        {/* أضف تفاصيل إضافية هنا مثل الموقع، تاريخ التنفيذ، الخ */}
                        <div className="flex flex-wrap gap-3 mt-4">
                            {/* مثال: */}
                            {/* <span className="bg-[#E6B31E]/10 text-[#E6B31E] px-4 py-2 rounded-full font-bold text-sm">الرياض</span> */}
                        </div>
                        <button
                            className="mt-8 px-8 py-3 bg-[#E6B31E] text-white font-bold rounded-lg shadow hover:bg-[#c99c19] transition w-fit self-end"
                            onClick={() => window.history.back()}
                        >
                            العودة للمشاريع
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ProjectDetails;
