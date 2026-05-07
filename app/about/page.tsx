"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Breadcrumb from "../products/[slug]/Breadcrumb";

export default function AboutPage() {
    return (
        <>
            <Header />

            <div className="wrap-main w-clear">
                <div className="fixwidth">

                    <div className="content-main w-clear">

                        {/* Breadcrumb */}
                        <div className="breadCrumbs_sanpham mb-3 mt-3">
                            <div>
                                <Breadcrumb />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 md:p-10">

                            {/* Title */}
                            <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-10">
                                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                    Về 302 Tech
                                </span>
                            </h1>

                            {/* TOP */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

                                {/* LEFT */}
                                <div className="space-y-6">

                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">
                                            302 Tech là ai?
                                        </h2>

                                        <div className="space-y-5 text-[15px] md:text-base text-gray-600 leading-8 font-medium">

                                            <p>
                                                302 Tech chuyên cung cấp laptop cũ chất lượng cao,
                                                tập trung vào các dòng doanh nhân, gaming,
                                                đồ họa và học tập với mức giá tốt.
                                            </p>

                                            <p>
                                                Chúng tôi luôn ưu tiên sự minh bạch,
                                                hỗ trợ tận tâm và kiểm tra kỹ sản phẩm
                                                trước khi đến tay khách hàng.
                                            </p>

                                            <p>
                                                Mỗi sản phẩm tại 302 Tech đều được test kỹ,
                                                vệ sinh sạch sẽ và hỗ trợ bảo hành rõ ràng.
                                            </p>

                                        </div>
                                    </div>

                                    {/* BOX */}
                                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 text-white">

                                        <h3 className="text-2xl font-extrabold mb-4">
                                            Cam kết từ 302 Tech
                                        </h3>

                                        <ul className="space-y-3 text-white/95 leading-7 font-medium">
                                            <li>
                                                ✔️ Laptop đúng mô tả
                                            </li>

                                            <li>
                                                ✔️ Kiểm tra kỹ trước khi giao
                                            </li>

                                            <li>
                                                ✔️ Hỗ trợ nhanh chóng và tận tâm
                                            </li>

                                            <li>
                                                ✔️ Chính sách bảo hành minh bạch
                                            </li>
                                        </ul>

                                    </div>

                                </div>

                                {/* RIGHT */}
                                <div className="bg-gray-50 rounded-3xl p-6 md:p-8 h-full flex flex-col justify-between">

                                    <div>

                                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">
                                            Vì sao chọn 302 Tech?
                                        </h2>

                                        <div className="space-y-5 text-[15px] md:text-base text-gray-600 leading-8 font-medium">

                                            <div className="flex gap-4">
                                                <div className="text-2xl">
                                                    💻
                                                </div>

                                                <div>
                                                    <h3 className="font-bold text-gray-900 mb-1">
                                                        Laptop chất lượng
                                                    </h3>

                                                    <p>
                                                        Chọn lọc kỹ càng, kiểm tra đầy đủ trước khi bán ra.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <div className="text-2xl">
                                                    🛠️
                                                </div>

                                                <div>
                                                    <h3 className="font-bold text-gray-900 mb-1">
                                                        Hỗ trợ tận tâm
                                                    </h3>

                                                    <p>
                                                        Hỗ trợ khách hàng nhanh chóng trong suốt quá trình sử dụng.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <div className="text-2xl">
                                                    🔒
                                                </div>

                                                <div>
                                                    <h3 className="font-bold text-gray-900 mb-1">
                                                        Bảo hành rõ ràng
                                                    </h3>

                                                    <p>
                                                        Chính sách minh bạch, hỗ trợ xử lý nhanh khi phát sinh lỗi.
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Bottom Box */}
                                    <div className="mt-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 text-white">

                                        <h3 className="text-3xl font-extrabold mb-2">
                                            302 Tech
                                        </h3>

                                        <p className="leading-8 text-white/95 font-medium">
                                            Đồng hành cùng khách hàng với những chiếc laptop
                                            chất lượng và dịch vụ tận tâm.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* STATS */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">

                                <div className="bg-gray-50 rounded-3xl p-6 text-center">
                                    <h3 className="text-3xl font-extrabold text-orange-500 mb-2">
                                        1000+
                                    </h3>

                                    <p className="text-gray-600 font-medium">
                                        Khách hàng
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-3xl p-6 text-center">
                                    <h3 className="text-3xl font-extrabold text-orange-500 mb-2">
                                        500+
                                    </h3>

                                    <p className="text-gray-600 font-medium">
                                        Laptop bán ra
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-3xl p-6 text-center">
                                    <h3 className="text-3xl font-extrabold text-orange-500 mb-2">
                                        2
                                    </h3>

                                    <p className="text-gray-600 font-medium">
                                        Chi nhánh
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-3xl p-6 text-center">
                                    <h3 className="text-3xl font-extrabold text-orange-500 mb-2">

                                        24/7
                                    </h3>
                                    <p className="text-gray-600 font-medium">
                                        Hỗ trợ khách hàng
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}