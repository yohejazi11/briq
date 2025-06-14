import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Header from '../components/Header'; // عدّل المسار إذا كان مختلفاً
import Footer from '../components/Footer'; // عدّل المسار إذا كان مختلفاً

function AdminDashboard() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [msg, setMsg] = useState("");
    const [projects, setProjects] = useState([]);
    const [activeSection, setActiveSection] = useState('projects');
    const [activeProjectOption, setActiveProjectOption] = useState('view');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("login") === "true") {
            setIsAdmin(true);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleAddProject = async (e) => {
        e.preventDefault();
        setMsg("");
        if (!title || !description || images.length === 0) {
            setMsg("جميع الحقول مطلوبة");
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        // أضف كل صورة على حدة
        images.forEach((img, idx) => {
            formData.append("images[]", img);
        });
        try {
            const res = await fetch("http://localhost/buildcompany/backend/api/add_project.php", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.status === "success") {
                setMsg("تمت إضافة المشروع بنجاح");
                setTitle(""); setDescription(""); setImages([]);
                fetchProjects(); // إعادة جلب المشاريع بعد الإضافة الناجحة
            } else {
                setMsg(data.message || "حدث خطأ");
            }
        } catch {
            setMsg("خطأ في الاتصال بالسيرفر");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("هل أنت متأكد من حذف المشروع؟")) return;
        const formData = new FormData();
        formData.append("id", id);
        try {
            const res = await fetch("http://localhost/buildcompany/backend/api/delete_project.php", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.status === "success") {
                setProjects(projects.filter(p => p.id !== id));
            } else {
                alert(data.message || "حدث خطأ أثناء الحذف");
            }
        } catch {
            alert("خطأ في الاتصال بالسيرفر");
        }
    };

    const fetchProjects = async () => {
        try {
            const res = await fetch("http://localhost/buildcompany/backend/api/get_projects.php");
            const data = await res.json();
            if (data.status === "success") {
                setProjects(data.data);
            } else {
                setMsg(data.message || "حدث خطأ");
            }
        } catch {
            setMsg("خطأ في الاتصال بالسيرفر");
        }
    };

    // جلب الطلبات (مثال بسيط، عدل حسب API لديك)
    const fetchOrders = async () => {
        try {
            const res = await fetch("http://localhost/buildcompany/backend/api/get_contacts.php");
            const data = await res.json();
            if (data.status === "success") {
                setOrders(data.data);
            }
        } catch {
            // تجاهل الأخطاء هنا
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        if (activeSection === 'orders') {
            fetchOrders();
        }
    }, [activeSection]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* الهيدر */}
            <Header black={true}/>

            {/* المحتوى الرئيسي */}
            <main className="flex-1 p-8 pt-[100px]">
                {/* الأزرار العلوية */}
                <div className="flex gap-4 mb-8 justify-center">
                    <button
                        className={`px-8 py-2 rounded-lg font-bold transition-all duration-150 shadow-sm border-2 ${activeSection === 'projects' ? 'bg-[#E6B31E] text-white border-[#E6B31E]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setActiveSection('projects')}
                    >
                        إدارة المشاريع
                    </button>
                    <button
                        className={`px-8 py-2 rounded-lg font-bold transition-all duration-150 shadow-sm border-2 ${activeSection === 'orders' ? 'bg-[#E6B31E] text-white border-[#E6B31E]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setActiveSection('orders')}
                    >
                        إدارة الطلبات
                    </button>
                </div>
                {/* الحاوية الرئيسية */}
                <div className="bg-white rounded-2xl shadow-lg flex max-sm:flex-col w-full max-w-5xl mx-auto min-h-[400px] overflow-hidden border border-gray-200">
                    {/* الجزء الأيمن: الخيارات */}
                    <div className="w-1/3 max-sm:w-[100%] border-l p-8 flex flex-col  gap-6 bg-gray-50">
                        {activeSection === 'projects' && (
                            <>
                                <button
                                    className={`py-3 rounded-lg text-lg font-semibold transition-all duration-150 shadow-sm border-2 ${activeProjectOption === 'add' ? 'bg-[#E6B31E] text-white border-[#E6B31E]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                                    onClick={() => setActiveProjectOption('add')}
                                >
                                    إضافة مشروع
                                </button>
                                <button
                                    className={`py-3 rounded-lg text-lg font-semibold transition-all duration-150 shadow-sm border-2 ${activeProjectOption === 'delete' ? 'bg-[#E6B31E] text-white border-[#E6B31E]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                                    onClick={() => setActiveProjectOption('delete')}
                                >
                                    حذف مشروع
                                </button>
                                <button
                                    className={`py-3 rounded-lg text-lg font-semibold transition-all duration-150 shadow-sm border-2 ${activeProjectOption === 'view' ? 'bg-[#E6B31E] text-white border-[#E6B31E]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                                    onClick={() => setActiveProjectOption('view')}
                                >
                                    استعراض المشاريع
                                </button>
                            </>
                        )}
                        {activeSection === 'orders' && (
                            <div className="text-gray-400 text-center mt-8">لا توجد خيارات إضافية</div>
                        )}
                    </div>
                    {/* الجزء الأيسر: العمليات */}
                    <div className="w-2/3 p-8 bg-white max-sm:w-[100%]">
                        {activeSection === 'projects' && (
                            <>
                                {activeProjectOption === 'add' && (
                                    <form className="flex flex-col gap-5 mb-6" onSubmit={handleAddProject}>
                                        {msg && <div className="text-center text-red-600 font-semibold">{msg}</div>}
                                        <input type="text" placeholder="اسم المشروع" className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E6B31E]" value={title} onChange={e => setTitle(e.target.value)} />
                                        <textarea placeholder="وصف المشروع" className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E6B31E]" value={description} onChange={e => setDescription(e.target.value)} />
                                        <input
                                            type="file"
                                            className="border rounded-lg px-4 py-3 bg-gray-50"
                                            multiple
                                            onChange={e => setImages(Array.from(e.target.files))}
                                        />
                                        <button type="submit" className="bg-[#E6B31E] text-white font-bold py-3 rounded-lg hover:bg-[#c99c19] transition-all duration-150">إضافة مشروع</button>
                                    </form>
                                )}
                                {activeProjectOption === 'delete' && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-6 text-[#E6B31E]">حذف مشروع</h3>
                                        {Array.isArray(projects) && projects.length === 0 && (
                                            <div className="text-gray-400">لا توجد مشاريع</div>
                                        )}
                                        {Array.isArray(projects) && projects.map((project) => (
                                            <div key={project.id} className="bg-gray-50 rounded-lg shadow p-4 flex justify-between items-center mb-4 border">
                                                <div>
                                                    <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                                                    <p className="text-gray-600">{project.description?.slice(0, 80)}...</p>
                                                </div>
                                                <button onClick={() => handleDelete(project.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-150">حذف</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {activeProjectOption === 'view' && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-6 text-[#E6B31E]">المشاريع الحالية</h3>
                                        {Array.isArray(projects) && projects.length === 0 && (
                                            <div className="text-gray-400">لا توجد مشاريع</div>
                                        )}
                                        {Array.isArray(projects) && projects.map((project) => {
                                            // الصور تأتي كمصفوفة في project.images
                                            const images = Array.isArray(project.images) ? project.images : [];

                                            // لكل بطاقة مشروع، نحتاج state منفصل للصورة الحالية
                                            // لذلك نستخدم مكون فرعي داخل الماب
                                            function ProjectCard() {
                                                const [imgIdx, setImgIdx] = useState(0);
                                                const hasImages = images.length > 0;
                                                const showPrev = imgIdx > 0;
                                                const showNext = imgIdx < images.length - 1;

                                                const handlePrev = (e) => {
                                                    e.stopPropagation();
                                                    if (imgIdx > 0) setImgIdx(imgIdx - 1);
                                                };
                                                const handleNext = (e) => {
                                                    e.stopPropagation();
                                                    if (imgIdx < images.length - 1) setImgIdx(imgIdx + 1);
                                                };

                                                return (
                                                    <div className="bg-gray-50 rounded-lg shadow p-4 flex justify-between items-center mb-4 border">
                                                        <div className="flex items-center gap-4">
                                                            {hasImages && (
                                                                <div className="relative w-24 h-24 flex items-center">
                                                                    <img
                                                                        src={`${images[imgIdx]}`}
                                                                        alt={project.title}
                                                                        className="w-24 h-24 object-cover rounded-lg border"
                                                                    />
                                                                    {showPrev && (
                                                                        <button
                                                                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-yellow-200"
                                                                            onClick={handlePrev}
                                                                            type="button"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span className="text-xl font-bold">&#8592;</span>
                                                                        </button>
                                                                    )}
                                                                    {showNext && (
                                                                        <button
                                                                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-yellow-200"
                                                                            onClick={handleNext}
                                                                            type="button"
                                                                            tabIndex={-1}
                                                                        >
                                                                            <span className="text-xl font-bold">&#8594;</span>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            )}
                                                            <div>
                                                                <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                                                                <p className="text-gray-600">{project.description?.slice(0, 80)}...</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            return <ProjectCard key={project.id} />;
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                        {activeSection === 'orders' && (
                            <div>
                                <h3 className="text-xl font-bold mb-6 text-[#E6B31E]">الطلبات الواردة</h3>
                                {Array.isArray(orders) && orders.length === 0 && (
                                    <div className="text-gray-400">لا توجد طلبات</div>
                                )}
                                {Array.isArray(orders) && orders.map((order) => (
                                    <div key={order.id} className="bg-gray-50 rounded-lg shadow p-4 mb-4 border">
                                        <div className="font-bold text-[#E6B31E]">طلب رقم: {order.id}</div>
                                        <div>اسم العميل: {order.name}</div>
                                        <div>البريد الإلكتروني: {order.email}</div>
                                        <div>رقم الهاتف: {order.phone}</div>
                                        <div>الرسالة: {order.message}</div>
                                        {/* أضف المزيد من التفاصيل حسب الحاجة */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* الفوتر */}
            <Footer />
        </div>
    );
}

export default AdminDashboard

