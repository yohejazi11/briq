import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const res = await fetch("http://localhost/buildcompany/backend/api/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // لو استعملت Access-Control-Allow-Credentials
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (data.status === "success") {
                setSuccess("✅ تم إنشاء الحساب بنجاح! سيتم تحويلك لتسجيل الدخول...");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setError(data.message || "حدث خطأ أثناء التسجيل");
            }
        } catch {
            setError("❌ خطأ في الاتصال بالسيرفر");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header black={true}/>
            <main className="flex-1 flex items-center justify-center py-8 pt-[150px]">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-center mb-2 text-[#E6B31E]">إنشاء حساب جديد</h2>
                    {error && <div className="text-red-600 text-center text-sm mb-2">{error}</div>}
                    {success && <div className="text-green-600 text-center text-sm mb-2">{success}</div>}
                    <input
                        type="text"
                        placeholder="اسم المستخدم"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E6B31E]"
                        required
                    />
                    <input
                        type="password"
                        placeholder="كلمة المرور"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E6B31E]"
                        required
                    />
                    <button type="submit" className="bg-[#E6B31E] text-white font-bold py-3 rounded-lg hover:bg-[#c99c19] transition-all duration-150">
                        {loading ? "جاري التسجيل..." : "تسجيل"}
                    </button>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default Register;

