
export default function MaintenancePage() {
    return (

        <main className="min-h-screen flex items-center justify-center bg-white px-5">
            <div className="w-full max-w-xl text-center">
                <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50 text-4xl">
                        🛠️
                    </div>
                </div>

                <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                    <span className="text-[#ff7a00]">302</span> TECH
                </h1>

                <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-[#ff7a00]" />

                <h2 className="mt-7 text-2xl font-bold text-gray-900">
                    Website đang bảo trì
                </h2>

                <p className="mx-auto mt-4 max-w-md leading-7 text-gray-600">
                    302 Tech đang nâng cấp hệ thống để mang đến trải nghiệm tốt hơn.
                    Quý khách vui lòng quay lại sau. Xin cảm ơn!
                </p>

                <div className="mt-6 inline-block rounded-xl border border-orange-200 bg-orange-50 px-5 py-3">
                    <p className="text-sm text-gray-600">
                        Dự kiến hoạt động trở lại
                    </p>
                    <p className="mt-1 font-bold text-[#ff7a00]">
                        12:00 trưa · 29/10/2026
                    </p>
                </div>

                <p className="mt-8 text-sm font-medium text-gray-500">
                    302 Tech · Laptop & Công nghệ
                </p>
            </div>
        </main>

    );
}
