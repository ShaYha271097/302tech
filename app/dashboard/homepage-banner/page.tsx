
"use client";
import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react"
import { useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import Topbar from "../components/TopBar";
type Variant = {
    id: string
    cpu: string
    ram: string
    ssd: string
    price: number
}

type Product = {
    _id: string
    name: string
    mainImage: string
    gallery: string[]
    createdAt: string
    variants: Variant[]
    brand?: {
        name: string
    }
}

type Slide = {
    image: string | File;
    link: string;
};


type SliderItem = {
    image: string | File;
    link: string;
};
type Banner = {
    image: string | File;
    link: string;
};

type Banners = {
    top: Banner;
    bottom: Banner;
};
export default function HomePageBanner() {
    const [open, setOpen] = useState(false);
    const [initialData, setInitialData] = useState({
        slider: [
            {
                image: "",
                link: "",
            },
        ],

        banners: {
            top: {
                image: "",
                link: "",
            },
            bottom: {
                image: "",
                link: "",
            },
        },
    });
    const [slider, setSlider] = useState<SliderItem[]>(initialData.slider);

    const [banners, setBanners] = useState<Banners>(initialData.banners);

    useEffect(() => {
        fetch("/api/homepage-banner")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return;

                const formatted = {
                    slider: data.slider || [],
                    banners: data.banners || {
                        top: { image: "", link: "" },
                        bottom: { image: "", link: "" },
                    },
                };
                console.log("formatted", formatted)
                setSlider(formatted.slider);
                setBanners(formatted.banners);
                setInitialData(formatted);
            });
    }, []);
    const upload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        console.log("data.url", data.url)
        return data.url;
    };


    const isFile = (value: any): value is File => {
        return value instanceof File;
    };
    const handleSave = async () => {
        const sliderUploaded = await Promise.all(
            slider.map(async (item) => {
                console.log("isFile(item.image)", isFile(item.image), item.image)
                if (isFile(item.image)) {

                    const url = await upload(item.image);
                    return { ...item, image: url };
                }

                return item;
            })
        );
        let topImage = banners.top.image;
        let bottomImage = banners.bottom.image;

        if (isFile(topImage)) {
            topImage = await upload(topImage);
        }

        if (isFile(bottomImage)) {
            bottomImage = await upload(bottomImage);
        }

        const payload = {
            slider: sliderUploaded,
            banners: {
                top: { ...banners.top, image: topImage },
                bottom: { ...banners.bottom, image: bottomImage },
            },
        };
        console.log("payload", payload)
        await fetch("/api/homepage-banner", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    };

    const handleReset = () => {
        setSlider(initialData.slider);
        setBanners(initialData.banners);
    };
    const getImageSrc = (img: string | File) => {
        if (!img) return "";

        if (img instanceof File) {
            return URL.createObjectURL(img);
        }

        return img;
    };
    console.log('slider', slider)
    return (
        <>
            <DashboardHeader />
            <Topbar title="Dashboard" />
            <div className="flex min-h-screen bg-gray-50">
                {/* SIDEBAR */}
                <section className="w-[240px] bg-white border-r">
                    <Sidebar />
                </section>
                {/* CONTENT */}
                <section className="flex-1 p-4 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-2">

                        {/* LEFT */}
                        <div className="col-span-1 space-y-5">

                            {/* SLIDER */}
                            <div className="bg-white rounded-xl border p-3">
                                {/* HEADER */}
                                <div className="flex justify-between items-center mb-5">
                                    <h4 className="font-medium text-sm text-gray-700">
                                        Slider Banners
                                    </h4>

                                    <button
                                        onClick={() =>
                                            setSlider([...slider, { image: "", link: "" }])
                                        }
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded text-xs"
                                    >
                                        + Thêm
                                    </button>
                                </div>

                                {/* LIST */}
                                <div className="space-y-2">
                                    {slider.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between border rounded-lg px-3 py-2 hover:bg-gray-50 transition"
                                        >
                                            {/* LEFT */}
                                            <div className="flex items-center gap-3 flex-1">

                                                {/* INDEX */}
                                                <span className="text-xs text-gray-400 w-5 text-center">
                                                    {index + 1}
                                                </span>

                                                {/* IMAGE */}
                                                {item.image ? (
                                                    <img
                                                        src={getImageSrc(item.image)}
                                                        className="w-28 h-16 object-cover rounded-md border cursor-pointer"
                                                        onClick={() =>
                                                            document.getElementById(`file-${index}`)?.click()
                                                        }
                                                    />
                                                ) : (
                                                    <label
                                                        htmlFor={`file-${index}`}
                                                        className="w-28 h-16 bg-gray-100 !flex flex-col items-center justify-center rounded-md cursor-pointer text-xs text-gray-500 border hover:bg-gray-200 leading-none gap-1"
                                                    >
                                                        <span className="text-sm">📤</span>
                                                        Upload
                                                    </label>
                                                )}

                                                {/* FILE */}
                                                <input
                                                    id={`file-${index}`}
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;

                                                        const newSlider = [...slider];

                                                        newSlider[index].image = file; // 👈 giữ File luôn

                                                        setSlider(newSlider);
                                                    }}
                                                />
                                            </div>

                                            {/* DELETE */}
                                            <button
                                                onClick={() =>
                                                    setSlider(slider.filter((_, i) => i !== index))
                                                }
                                                className="ml-3 text-gray-400 hover:text-red-500 text-xs transition"
                                            >
                                                Xoá
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* SIDE BANNERS */}
                            <div className="bg-white rounded-xl border p-3">
                                <h4 className="font-semibold mb-4">Side Banners</h4>

                                {/* TOP */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-36 text-sm text-gray-500">
                                        Top Banner
                                    </span>

                                    {banners.top.image ? (
                                        <div className="w-28 h-16 overflow-hidden rounded border">
                                            <img
                                                src={getImageSrc(banners.top.image)}
                                                className="w-full h-full object-cover cursor-pointer"
                                                onClick={() =>
                                                    document.getElementById("top-upload")?.click()
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <label
                                            htmlFor="top-upload"
                                            className="w-28 h-16 bg-gray-100 !flex items-center justify-center rounded cursor-pointer text-xs text-gray-500 border hover:bg-gray-200"
                                        >
                                            <span className="text-sm">📤</span>
                                            Upload
                                        </label>
                                    )}

                                    <input
                                        id="top-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            setBanners((prev) => ({
                                                ...prev,
                                                top: {
                                                    ...prev.top,
                                                    image: file, // 👈 giữ File
                                                },
                                            }));
                                        }}
                                    />


                                </div>

                                {/* BOTTOM */}
                                <div className="flex items-center gap-3">
                                    <span className="w-36 text-sm text-gray-500">
                                        Bottom Banner
                                    </span>

                                    {banners.bottom.image ? (
                                        <div className="w-28 h-16 overflow-hidden rounded border">
                                            <img
                                                src={getImageSrc(banners.bottom.image)}
                                                className="w-full h-full object-cover cursor-pointer"
                                                onClick={() =>
                                                    document.getElementById("bottom-upload")?.click()
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <label
                                            htmlFor="bottom-upload"
                                            className="w-28 h-16 bg-gray-100  !flex items-center justify-center rounded cursor-pointer text-xs text-gray-500 border hover:bg-gray-200"
                                        >
                                            <span className="text-sm">📤</span>
                                            Upload
                                        </label>
                                    )}




                                    <input
                                        id="bottom-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            setBanners((prev) => ({
                                                ...prev,
                                                bottom: {
                                                    ...prev.bottom,
                                                    image: file, // 👈 giữ File
                                                },
                                            }));
                                        }}
                                    />
                                </div>
                            </div>

                            {/* ACTION */}
                            <div className="flex justify-between items-center pt-2">
                                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm border" onClick={() => handleReset()}>
                                    Reset
                                </button>

                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm" onClick={() => handleSave()}>
                                    Lưu thay đổi
                                </button>
                            </div>
                        </div>

                        {/* RIGHT PREVIEW (GIỮ NGUYÊN) */}
                        <div className="col-span-2 bg-white rounded-xl border p-3 self-start">
                            <h4 className="font-semibold mb-4">Preview</h4>

                            <div className="grid grid-cols-3 gap-2">

                                {/* SLIDER */}
                                <div className="col-span-2 row-span-2 w-full h-[260px] rounded overflow-hidden border">
                                    {slider?.length > 0 ? (
                                        <Swiper
                                            modules={[Pagination, Autoplay]}
                                            pagination={{ clickable: true }}
                                            autoplay={{
                                                delay: 2500,
                                                disableOnInteraction: false,
                                            }}
                                            loop
                                            className="w-full h-full"
                                        >
                                            {slider.map((item: any, index: number) => (
                                                <SwiperSlide key={index}>
                                                    <img
                                                        src={getImageSrc(item.image)}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                            Chưa có ảnh slider
                                        </div>
                                    )}
                                </div>

                                {/* TOP */}
                                {banners.top.image ? (
                                    <img
                                        src={getImageSrc(banners.top.image)}
                                        className="w-full h-[124px] object-cover rounded border"
                                    />
                                ) : (
                                    <div className="w-full h-[124px] flex items-center justify-center text-gray-400 text-sm border rounded">
                                        Chưa có banner trên
                                    </div>
                                )}


                                {/* BOTTOM */}
                                {banners.bottom.image ? (
                                    <img
                                        src={getImageSrc(banners.bottom.image)}
                                        className="w-full h-[124px] object-cover rounded border"
                                    />
                                ) : (
                                    <div className="w-full h-[124px] flex items-center justify-center text-gray-400 text-sm border rounded">
                                        Chưa có banner dưới
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                </section>
            </div>

        </>
    )
}
