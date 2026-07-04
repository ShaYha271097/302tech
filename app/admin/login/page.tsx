"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {

    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const router = useRouter();

    const isValid = username && password;
    const handleLogin = async () => {
        
        if (!validate()) return;
        
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password,
                }),
            });

            const data = await res.json();
            // ❌ login fail
            if (!res.ok) {
                setErrors({
                    password: data.error || "Đăng nhập thất bại",
                });
                return;
            }

            // ✅ login success
            router.push("/dashboard");
        } catch (err) {
            alert("Lỗi kết nối server");
        }
    };
    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") handleLogin();
    };
    const validate = () => {
        const err: any = {};

        if (!username.trim()) {
            err.username = "Không được để trống username";
        } else if (username.length < 3) {
            err.username = "Username tối thiểu 3 ký tự";
        }

        if (!password) {
            err.password = "Không được để trống mật khẩu";
        } else if (password.length < 4) {
            err.password = "Mật khẩu tối thiểu 4 ký tự";
        }

        setErrors(err);
        return Object.keys(err).length === 0;
    };
    return (
        <div className="relative h-screen flex items-center justify-center">
            {/* <img src={""} /> */}
            {/* BACKGROUND */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('../assets/images/homelogin.jpg')",
                }}
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40" />

            {/* LOGIN BOX */}
            <div className="relative bg-white/95 backdrop-blur p-6 rounded w-[360px] shadow-xl">

                <h2 className="text-lg font-semibold text-center mb-5">
                    Admin Login
                </h2>
                {/* NAME */}
                <input
                    placeholder="Username"
                    className="w-full border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-blue-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {errors.username && (
                    <p className="text-red-500 text-xs mb-2">{errors.username}</p>
                )}
                {/* PASSWORD */}
                <div className="mb-3">
                    <div className="relative">
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder="Password"
                            className="w-full border p-2 rounded pr-10 outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />

                        {/* ICON */}
                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>

                    {/* ERROR (đưa ra ngoài) */}
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                </div>


                {/* BUTTON */}
                <button
                    onClick={handleLogin}
                    disabled={!isValid}
                    className={`w-full p-2 rounded text-white transition 
    ${isValid
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    Đăng nhập
                </button>
            </div>
        </div>
    );
}