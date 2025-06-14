import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost/buildcompany/backend/api/get_projects.php")
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    setProjects(data.data);
                }
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header black={true}/>
            <main className="flex-1 p-8 pt-[150px]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-[#E6B31E] text-center">جميع المشاريع</h2>
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#E6B31E]"></div>
                        </div>
                    ) : (
                        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-white rounded shadow p-4 cursor-pointer hover:shadow-lg transition"
                                    onClick={() => navigate(`/project/${project.id}`)}
                                >
                                    {/* عرض أول صورة من الصور إذا وجدت */}
                                    {Array.isArray(project.images) && project.images.length > 0 ? (
                                        <img src={project.images[0]} alt={project.title} className="w-full h-48 object-cover rounded mb-4" />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">لا توجد صورة</div>
                                    )}
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-gray-600">{project.description?.slice(0, 80)}...</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ProjectsList;
