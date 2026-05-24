
"use client";
import { useState } from "react";
import Link from "next/link";
import { Loader2, Pencil, Trash2 } from "lucide-react"
import { useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/TopBar";
import MobileSidebar from "../components/MobileSidebar";
import { uploadImage } from "@/lib/uploadImage";

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
  const [openSidebar, setOpenSidebar] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

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
  const upload = async (file: File, type: "slider" | "banner") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
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
    if (!slider.length) {
      alert("Cần ít nhất 1 slider");
      return;
    }

    if (slider.some((s) => !s.image)) {
      alert("Slider chưa đủ ảnh");
      return;
    }

    if (!banners.top.image) {
      alert("Thiếu banner trên");
      return;
    }

    if (!banners.bottom.image) {
      alert("Thiếu banner dưới");
      return;
    }

    try {
      setLoadingSave(true);

      // 🔥 upload slider
      const sliderUploaded = await Promise.all(
        slider.map(async (item) => {
          if (item.image instanceof File) {
            const url = await uploadImage(item.image, "slider");
            return { ...item, image: url };
          }
          return item;
        })
      );

      // 🔥 upload banner
      const uploadIfFile = async (
        img: string | File,
        type: "banner" | "slider"
      ) => {
        if (img instanceof File) {
          return await uploadImage(img, type);
        }
        return img;
      };

      const topImage = await uploadIfFile(banners.top.image, "banner");
      const bottomImage = await uploadIfFile(banners.bottom.image, "banner");

      // 🔥 payload
      const payload = {
        slider: sliderUploaded,
        banners: {
          top: { ...banners.top, image: topImage },
          bottom: { ...banners.bottom, image: bottomImage },
        },
      };

      await fetch("/api/homepage-banner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

    } catch (err) {
      console.error(err);
      alert("Lỗi upload");
    } finally {
      setLoadingSave(false);
    }
  };
  const handleReset = () => {
    setSlider(initialData.slider);
    setBanners(initialData.banners);
  };
const getImageSrc = (img: string | File) => {

  if (!img) {
    return "/no-image.png";
  }

  if (img instanceof File) {
    return URL.createObjectURL(img);
  }

  return img;
}
  const isValid =
    slider.length > 0 &&
    slider.every((s) => s.image) &&
    banners.top.image &&
    banners.bottom.image;
  console.log('slider', slider)
  return (
    <>
      <Topbar title="Quản lý banner" />
      <div className="flex min-h-screen bg-gray-50">
        {/* SIDEBAR */}
        <section className="w-[70px] lg:w-[240px] bg-white border-r transition-all duration-300">
          <Sidebar />
        </section>
        {/* MOBILE SIDEBAR */}
        <MobileSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />


        <div className="relative">
          {/* CONTENT */}
          <section
            className={`
      flex-1 p-4 overflow-y-auto
      transition-all
      ${loadingSave ? "pointer-events-none opacity-60" : ""}
    `}
          >


            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

              {/* LEFT */}
              <div className="col-span-1 space-y-5">

                {/* SLIDER */}
                <div
                  className="
          bg-white
          border border-[#F3E8DF]
          rounded-3xl
          p-5
          shadow-sm
        "
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h4 className="text-[16px] font-semibold text-[#111827]">
                        Slider Banners
                      </h4>

                      <p className="text-sm leading-7 text-[#6B7280] mt-1">
                        Quản lý banner slider trang chủ
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setSlider([...slider, { image: "", link: "" }])
                      }
                      className="
              h-10 px-4
              rounded-xl
              bg-[#FFF4EC]
              border border-[#FED7AA]
              text-[#ff7a00]
              font-medium
              hover:bg-[#FFE7D6]
              transition-all
            "
                    >
                      + Thêm
                    </button>
                  </div>

                  {/* LIST */}
                  <div className="space-y-3">
                    {slider.map((item, index) => (
                      <div
                        key={index}
                        className="
                flex items-center justify-between
                gap-3
                rounded-2xl
                border border-[#F3F4F6]
                bg-[#FFFCFA]
                p-3
                hover:border-[#FED7AA]
                transition-all
              "
                      >
                        {/* LEFT */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">

                          {/* INDEX */}
                          <div
                            className="
                    min-w-[28px]
                    h-7
                    rounded-lg
                    bg-[#FFF1E7]
                    flex items-center justify-center
                    text-xs
                    font-semibold
                    text-[#ff7a00]
                  "
                          >
                            {index + 1}
                          </div>

                          {/* IMAGE */}
                          {item.image ? (
                            <img
                              src={getImageSrc(item.image)}
                              className="
                      w-28 h-16
                      
                      rounded-xl
                      border border-[#E5E7EB]
                      cursor-pointer
                      hover:opacity-90
                    "
                              onClick={() =>
                                document
                                  .getElementById(`file-${index}`)
                                  ?.click()
                              }
                            />
                          ) : (
                            <label
                              htmlFor={`file-${index}`}
                              className="
                      w-28 h-16
                      rounded-xl
                      border-2 border-dashed border-[#FED7AA]
                      bg-[#FFF9F5]
                      flex flex-col items-center justify-center
                      text-xs text-[#6B7280]
                      cursor-pointer
                      hover:bg-[#FFF1E7]
                      transition-all
                    "
                            >
                              <i className="fas fa-upload text-[#ff7a00]" />
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

                              if (!file.type.startsWith("image/")) {
                                alert("Chỉ được upload ảnh");
                                return;
                              }

                              if (file.size > 6 * 1024 * 1024) {
                                alert("Ảnh tối đa 5MB");
                                return;
                              }

                              const newSlider = [...slider];
                              newSlider[index].image = file;
                              setSlider(newSlider);

                              e.target.value = "";
                            }}
                          />
                        </div>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            setSlider(slider.filter((_, i) => i !== index))
                          }
                          className="
                  w-9 h-9
                  rounded-xl
                  border border-[#FECACA]
                  bg-[#FEF2F2]
                  flex items-center justify-center
                  text-red-500
                  hover:bg-red-500
                  hover:text-white
                  transition-all
                "
                        >
                          <i className="fas fa-trash text-sm leading-7" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SIDE BANNERS */}
                <div
                  className="
          bg-white
          border border-[#F3E8DF]
          rounded-3xl
          p-5
          shadow-sm
        "
                >
                  <div className="mb-5">
                    <h4 className="text-[16px] font-semibold text-[#111827]">
                      Side Banners
                    </h4>

                    <p className="text-sm leading-7 text-[#6B7280] mt-1">
                      Banner hiển thị bên phải slider
                    </p>
                  </div>

                  {/* TOP */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div>
                      <p className="text-sm leading-7 font-medium text-[#374151]">
                        Top Banner
                      </p>
                    </div>

                    {banners.top.image ? (
                      <div
                        className="
                relative
                w-32 h-20
                rounded-2xl
                overflow-hidden
                border border-[#E5E7EB]
              "
                      >
                        <img
                          src={getImageSrc(banners.top.image)}
                          className="
                  w-full h-full
                  
                  cursor-pointer
                "
                          onClick={() =>
                            document
                              .getElementById("top-upload")
                              ?.click()
                          }
                        />
                      </div>
                    ) : (
                      <label
                        htmlFor="top-upload"
                        className="
                w-32 h-20
                rounded-2xl
                border-2 border-dashed border-[#FED7AA]
                bg-[#FFF9F5]
                flex flex-col items-center justify-center
                cursor-pointer
                text-sm leading-7 text-[#6B7280]
                hover:bg-[#FFF1E7]
                transition-all
              "
                      >
                        <i className="fas fa-upload text-[#ff7a00]" />
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
                            image: file,
                          },
                        }));

                        e.target.value = "";
                      }}
                    />
                  </div>

                  {/* BOTTOM */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm leading-7 font-medium text-[#374151]">
                        Bottom Banner
                      </p>
                    </div>

                    {banners.bottom.image ? (
                      <div
                        className="
                relative
                w-32 h-20
                rounded-2xl
                overflow-hidden
                border border-[#E5E7EB]
              "
                      >
                        <img
                          src={getImageSrc(banners.bottom.image)}
                          className="
                  w-full h-full
                  
                  cursor-pointer
                "
                          onClick={() =>
                            document
                              .getElementById("bottom-upload")
                              ?.click()
                          }
                        />
                      </div>
                    ) : (
                      <label
                        htmlFor="bottom-upload"
                        className="
                w-32 h-20
                rounded-2xl
                border-2 border-dashed border-[#FED7AA]
                bg-[#FFF9F5]
                flex flex-col items-center justify-center
                cursor-pointer
                text-sm leading-7 text-[#6B7280]
                hover:bg-[#FFF1E7]
                transition-all
              "
                      >
                        <i className="fas fa-upload text-[#ff7a00]" />
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
                            image: file,
                          },
                        }));

                        e.target.value = "";
                      }}
                    />
                  </div>
                </div>

                {/* ACTION */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* <button
                    className="
            flex-1
            h-11
            rounded-2xl
            border border-[#E5E7EB]
            bg-white
            text-[#6B7280]
            hover:bg-[#FAFAFA]
            transition-all
          "
                    onClick={() => handleReset()}
                  >
                    Reset
                  </button> */}

                  <button
                    onClick={handleSave}
                    disabled={!isValid || loadingSave}
                    className="
            flex-1
            h-11
            rounded-2xl
            bg-[#ff7a00]
            hover:bg-[#ea6d00]
            text-white
            font-medium
            transition-all
            disabled:opacity-60
            shadow-lg shadow-orange-200
            flex items-center justify-center gap-2
          "
                  >
                    {loadingSave && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}

                    Lưu thay đổi
                  </button>
                </div>
              </div>
              {/* RIGHT PREVIEW */}
              <div
                className="
    col-span-1 xl:col-span-2
    bg-white
    border border-[#F3E8DF]
    rounded-3xl
    p-3 sm:p-4 lg:p-5
    shadow-sm
    self-start
  "
              >
                {/* HEADER */}
                <div className="mb-4 sm:mb-5">
                  <h4 className="text-[15px] sm:text-[16px] font-semibold text-[#111827]">
                    Preview
                  </h4>

                  <p className="text-xs sm:text-sm leading-7 text-[#6B7280] mt-1">
                    Xem trước giao diện banner
                  </p>
                </div>

                {/* GRID */}
                <div
                  className="
      grid
      grid-cols-2
      xl:grid-cols-3
      gap-3
    "
                >
                  {/* SLIDER */}
                  <div
                    className="
        col-span-2
        xl:col-span-2
        xl:row-span-2

        h-[180px]
        sm:h-[240px]
        lg:h-[280px]
        xl:h-[300px]

        rounded-2xl lg:rounded-3xl
        overflow-hidden
        border border-[#E5E7EB]
        bg-[#FFF9F5]
      "
                  >
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
                              className="w-full h-full "
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <div
                        className="
            w-full h-full
            flex flex-col items-center justify-center
            text-[#9CA3AF]
          "
                      >
                        <div
                          className="
              w-14 h-14
              rounded-full
              bg-[#FFF1E7]
              flex items-center justify-center
              mb-3
            "
                        >
                          <i className="fas fa-images text-[#ff7a00] text-lg" />
                        </div>

                        <span className="text-sm leading-7">
                          Chưa có ảnh slider
                        </span>
                      </div>
                    )}
                  </div>

                  {/* TOP */}
                  {banners.top.image ? (
                    <img
                      src={getImageSrc(banners.top.image)}
                      className="
          col-span-1

          h-[90px]
          sm:h-[120px]
          lg:h-[140px]
          xl:h-[144px]

          w-full
          
          rounded-2xl lg:rounded-3xl
          border border-[#E5E7EB]
        "
                    />
                  ) : (
                    <div
                      className="
          col-span-1

          h-[90px]
          sm:h-[120px]
          lg:h-[140px]
          xl:h-[144px]

          rounded-2xl lg:rounded-3xl
          border border-dashed border-[#FED7AA]
          bg-[#FFF9F5]

          flex flex-col items-center justify-center
          text-[#9CA3AF]
        "
                    >
                      <div
                        className="
            w-10 h-10
            rounded-full
            bg-[#FFF1E7]
            flex items-center justify-center
            mb-2
          "
                      >
                        <i className="fas fa-image text-[#ff7a00] text-xs" />
                      </div>

                      <span className="text-xs sm:text-sm leading-7">
                        Banner trên
                      </span>
                    </div>
                  )}

                  {/* BOTTOM */}
                  {banners.bottom.image ? (
                    <img
                      src={getImageSrc(banners.bottom.image)}
                      className="
          col-span-1

          h-[90px]
          sm:h-[120px]
          lg:h-[140px]
          xl:h-[144px]

          w-full
          
          rounded-2xl lg:rounded-3xl
          border border-[#E5E7EB]
        "
                    />
                  ) : (
                    <div
                      className="
          col-span-1

          h-[90px]
          sm:h-[120px]
          lg:h-[140px]
          xl:h-[144px]

          rounded-2xl lg:rounded-3xl
          border border-dashed border-[#FED7AA]
          bg-[#FFF9F5]

          flex flex-col items-center justify-center
          text-[#9CA3AF]
        "
                    >
                      <div
                        className="
            w-10 h-10
            rounded-full
            bg-[#FFF1E7]
            flex items-center justify-center
            mb-2
          "
                      >
                        <i className="fas fa-image text-[#ff7a00] text-xs" />
                      </div>

                      <span className="text-xs sm:text-sm leading-7">
                        Banner dưới
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* LOADING CONTENT */}
          {loadingSave && (
            <div
              className="
        absolute inset-0
        bg-white/60
        backdrop-blur-[2px]
        flex items-center justify-center
        z-20
      "
            >
              <div
                className="
          px-5 py-4
          rounded-2xl
          bg-white
          border border-[#FED7AA]
          shadow-xl
          flex items-center gap-3
        "
              >
                <div
                  className="
            w-5 h-5
            border-[3px]
            border-[#ff7a00]
            border-t-transparent
            rounded-full
            animate-spin
          "
                />

                <div>
                  <p className="text-sm leading-7 font-semibold text-[#111827]">
                    Đang lưu homepage...
                  </p>

                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Vui lòng chờ vài giây
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  )
}
