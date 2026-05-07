"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";
import Breadcrumb from "../products/[slug]/Breadcrumb";

export default function ContactPage() {
    return (
        <>
            <Header />

            <Suspense
                fallback={
                    <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
                        Đang tải...
                    </div>
                }
            >
                <div className="wrap-main w-clear">
                    <div className="fixwidth">
                        <div className="content-main w-clear">
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
                                        Liên Hệ 302 Tech
                                    </span>
                                </h1>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                                    {/* LEFT */}
                                    <div className="space-y-6">

                                        <div className="bg-gray-50 rounded-3xl p-6 md:p-8">

                                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
                                                Thông tin cửa hàng
                                            </h2>

                                            <div className="space-y-5 text-[15px] md:text-base text-gray-600 leading-8 font-medium">

                                                <div>
                                                    <p className="font-bold text-gray-900 text-[17px] mb-1">
                                                        📍 Cơ sở 1
                                                    </p>

                                                    <p>
                                                        302 Nguyễn Văn Rốp, Khu phố 5, Tân Ninh, Tây Ninh
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="font-bold text-gray-900 text-[17px] mb-1">
                                                        📍 Cơ sở 2
                                                    </p>

                                                    <p>
                                                        1073A Đ. Nguyễn Ảnh Thủ, Tân Chánh Hiệp,
                                                        Trung Mỹ Tây, Hồ Chí Minh
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="font-bold text-gray-900 text-[17px] mb-1">
                                                        📞 Hotline
                                                    </p>

                                                    <p>
                                                        0946932067
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="font-bold text-gray-900 text-[17px] mb-1">
                                                        📧 Email
                                                    </p>

                                                    <p>
                                                        ddrduongqua1027@gmail.com
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="font-bold text-gray-900 text-[17px] mb-1">
                                                        🕒 Thời gian làm việc
                                                    </p>

                                                    <p>
                                                        9h00 - 22h00
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 md:p-8 text-white">

                                            <h3 className="text-2xl font-extrabold mb-4">
                                                302 Tech
                                            </h3>

                                            <p className="leading-8 text-white/95 text-[15px] md:text-base font-medium">
                                                Chuyên laptop cũ chất lượng cao, hỗ trợ tận tâm,
                                                bảo hành rõ ràng và minh bạch cho khách hàng.
                                                Cam kết sản phẩm đúng mô tả, test kỹ trước khi giao.
                                            </p>

                                        </div>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="bg-gray-50 rounded-3xl p-6 md:p-8">

                                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">
                                            Bản đồ cửa hàng
                                        </h2>

                                        <div className="overflow-hidden rounded-3xl shadow-sm">
                                            <iframe
                                                src="https://www.google.com/maps?q=302%20Nguyen%20Van%20Rop%20Tan%20Ninh%20Tay%20Ninh&output=embed"
                                                width="100%"
                                                height="500"
                                                loading="lazy"
                                                allowFullScreen
                                                className="border-0 w-full"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>



            </Suspense>

            <Footer />
        </>
    );
}