import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch("http://localhost/buildcompany/backend/api/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (data.status === "success") {
                localStorage.setItem("login", "true");
                navigate("/dashboard");
            } else {
                setError(data.message || "بيانات الدخول غير صحيحة");
            }
        } catch {
            setError("خطأ في الاتصال بالسيرفر");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header black={true}/>
            <main className="flex-1 flex items-center justify-center py-8 pt-[150px]">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-center mb-2 text-[#E6B31E]">تسجيل الدخول</h2>
                    {error && <div className="text-red-600 text-center text-sm mb-2">{error}</div>}
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
                    <button type="submit" className="bg-[#E6B31E] text-white font-bold py-3 rounded-lg hover:bg-[#c99c19] transition-all duration-150">دخول</button>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default Login
