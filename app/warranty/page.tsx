"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";
import Breadcrumb from "../products/[slug]/Breadcrumb";

export default function WarrantyPage() {
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


                            <div className="space-y-8 text-gray-700 leading-8 px-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 ">
                                    Chính Sách Bảo Hành
                                </h2>
                                <section>
                                    <h4 className="text-xl font-semibold text-black mb-3">
                                        1. Thời gian bảo hành
                                    </h4>

                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>
                                            Laptop dưới 10 triệu: Bảo hành 3 tháng
                                        </li>
                                        <li>
                                            Laptop từ 10 triệu trở lên: Bảo hành 6 tháng
                                        </li>
                                        <li>
                                            Bao test đổi trả 7 ngày nếu lỗi phần cứng
                                        </li>
                                    </ul>
                                </section>

                                <section>
                                    <h4 className="text-xl font-semibold text-black mb-3">
                                        2. Phạm vi bảo hành
                                    </h4>

                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Phần cứng máy</li>
                                        <li>Mainboard</li>
                                        <li>Màn hình</li>
                                        <li>Nguồn / sạc theo máy</li>
                                        <li>Lỗi phần mềm cơ bản</li>
                                    </ul>
                                </section>

                                <section>
                                    <h4 className="text-xl font-semibold text-black mb-3">
                                        3. Điều kiện được bảo hành
                                    </h4>

                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Máy còn thời hạn bảo hành</li>
                                        <li>Tem bảo hành còn nguyên vẹn</li>
                                        <li>Lỗi do phần cứng hoặc nhà sản xuất</li>
                                        <li>
                                            Máy không bị rơi vỡ, vào nước hoặc tác động vật lý
                                        </li>
                                        <li>Sử dụng đúng sạc phù hợp với máy</li>
                                    </ul>
                                </section>

                                <section>
                                    <h4 className="text-xl font-semibold text-black mb-3">
                                        4. Trường hợp không bảo hành
                                    </h4>

                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Máy hết thời hạn bảo hành</li>
                                        <li>Tem bảo hành bị rách hoặc mất</li>
                                        <li>
                                            Máy bị rơi, móp méo, vào nước hoặc cháy nổ
                                        </li>
                                        <li>
                                            Màn hình bể, chảy mực, sọc do va đập
                                        </li>
                                        <li>
                                            Tự ý sửa chữa hoặc can thiệp phần cứng
                                        </li>
                                        <li>
                                            Không bảo hành pin hao mòn theo thời gian
                                        </li>
                                    </ul>
                                </section>

                                <section>
                                    <h4 className="text-xl font-semibold text-black mb-3">
                                        5. Lưu ý
                                    </h4>

                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>
                                            Khách vui lòng kiểm tra kỹ máy trước khi rời cửa hàng
                                        </li>
                                        <li>
                                            Nên quay video khi mở hàng để đảm bảo quyền lợi
                                        </li>
                                        <li>
                                            Khi bảo hành vui lòng mang theo đầy đủ phụ kiện
                                        </li>
                                    </ul>
                                </section>

                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-5 text-white mb-6">
                                    <p className="font-medium">
                                        302 Tech luôn hỗ trợ khách hàng nhanh chóng,
                                        minh bạch và tận tâm trong suốt quá trình sử dụng
                                        sản phẩm.
                                    </p>
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