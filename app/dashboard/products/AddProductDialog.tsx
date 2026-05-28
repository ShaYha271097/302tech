


"use client";
import { useMemo, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { X, Trash } from "lucide-react";
import { useEffect } from "react";
import ImageCropDialog from "../components/ImageCropDialog";
import { Loader2 } from "lucide-react";
type Variant = {
  id: string;
  cpu: string;
  ram: string;
  ssd: string;
  gpu: string;
  price: number;
  screenSize: string;
  resolution: string;
  refreshRate: string;
  priceInput?: string;
  slug:string
};

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  mode: "create" | "edit";
  product?: any; // chỉ dùng khi edit
  onSuccess?: () => void;
};
const inputClass = `
  w-full
  h-9
  rounded-xl
  border border-[#DCDCDC]
  bg-white
  px-2
  text-sm leading-7
  outline-none
  transition-all
  focus:border-[#ff7a00]
`;

const selectClass = `
  appearance-none
  w-full
  h-9
  rounded-xl
  border border-[#DCDCDC]
  bg-white
  px-2
  text-sm leading-7
  outline-none
  focus:border-[#ff7a00]
`;

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng việt
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const defaultVariant: Variant = {
  id: Date.now().toString(),
  cpu: "",
  ram: "8GB",
  ssd: "256GB",
  gpu: "",
  price: 0,
  screenSize: "",
  resolution: "",
  refreshRate: "",
  slug:""
};

export default function AddProductDialog({
  open,
  setOpen,
  mode,
  product,
  onSuccess,
}: Props) {
  console.log("product", product);
  // const variantsRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
const [loadingBrand, setLoadingBrand] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [errorName, setErrorName] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [openBrand, setOpenBrand] = useState(false);
  const [newBrand, setNewBrand] = useState("");
  const [brands, setBrands] = useState<any[]>([]);
  const [brandId, setBrandId] = useState("");
  const [variants, setVariants] = useState<Variant[]>([
    defaultVariant
  ]);
  const [cropOpen, setCropOpen] = useState(false);
  const [cropImage, setCropImage] = useState<string>("");
  const [cropIndex, setCropIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isHot, setIsHot] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const formatPrice = (num: number) => {
    return num.toLocaleString("vi-VN");
  };
  const resetForm = () => {
    setName("");
    setVariants([
      defaultVariant
    ]);
    setImages([]);
    setMainImage(null);
  };
  useEffect(() => {
    if (!open) return; // 🔥 chỉ chạy khi dialog mở

    if (mode === "edit" && product) {
      setName(product.name || "");
      setBrandId(product.brandId || "");
      setVariants(product.variants || []);
      setMainImage(product.mainImage || null);
      setImages(product.gallery || []);
    } else {
      // create
      resetForm();
    }
  }, [open, mode, product]);

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      defaultVariant,
    ]);

    setTimeout(() => {
      bodyRef.current?.scrollTo({
        top: bodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  };

  const removeVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  };

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await fetch("/api/brands");
      const dataBrands = await res.json();
      setBrands(dataBrands?.brands);
    };

    fetchBrands();
  }, []);
  useEffect(() => {
    if (brands.length > 0) {
      setBrandId(brands[0]._id);
    }
  }, [brands]);

  const handleSubmit = async () => {
    const err = validateForm();
    if (err) {
      alert(err);
      return;
    }

    if (!mainImage) return;

    setLoading(true);

    try {
      // 👉 MAIN IMAGE
      const mainImageUrl =
        typeof mainImage === "string"
          ? mainImage
          : await upload(mainImage, "product");

      // 👉 GALLERY (upload song song nhưng ổn định hơn)
      const galleryUrls = await Promise.all(
        images
          .filter((i) => i !== mainImage)
          .map(async (img) => {
            if (typeof img === "string") return img;
            return await upload(img, "product");
          }),
      );

      const payload = {
        name,
        brandId,
        mainImage: mainImageUrl,
        gallery: galleryUrls,
        variants,
        isHot,
        isNew,
        isActive,
        slug
      };

      console.log("payload", mode, payload);

      const res = await fetch(
        mode === "create" ? "/api/products" : `/api/products/${product._id}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        console.log("ERROR:", data);
        alert(data.error || "Lỗi lưu sản phẩm");
        return;
      }

      setOpen(false);
      onSuccess?.();
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Upload thất bại");
    } finally {
      setLoading(false);
    }
  };
  const upload = async (file: File, type: "product" | "brand" | "slider" | "banner") => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type); // 👈 thêm dòng này
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return data.url;
    } finally {
      setUploading(false);
    }
  };

  const mainImageUrl = useMemo(() => {
    if (!mainImage) return "";

    return typeof mainImage === "string"
      ? mainImage
      : URL.createObjectURL(mainImage);
  }, [mainImage]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [bodyRef]);

  const handleCropDone = (file: File) => {
    if (cropIndex === null) return;

    setImages((prev) => {
      const newList = [...prev];
      newList[cropIndex] = file;
      return newList;
    });

    setMainImage(file); // set luôn làm ảnh chính
  };

  useEffect(() => {
    return () => {
      if (typeof mainImage !== "string") {
        URL.revokeObjectURL(mainImageUrl);
      }
    };
  }, [mainImageUrl]);

  const validateForm = () => {
    if (!name.trim() || name.trim().length < 5) {
      return "Tên sản phẩm tối thiểu 5 ký tự";
    }

    if (!brandId) {
      return "Chưa chọn thương hiệu";
    }

    if (!mainImage) {
      return "Chưa chọn ảnh chính";
    }

    // 🔥 TÁCH GALLERY
    const gallery = images.filter((i) => i !== mainImage);

    if (gallery.length < 2) {
      return "Cần ít nhất 2 ảnh phụ";
    }

    if (gallery.length > 6) {
      return "Tối đa 6 ảnh phụ";
    }

    // 🔥 VARIANTS
    if (!variants.length) {
      return "Phải có ít nhất 1 cấu hình";
    }

    for (const v of variants) {
      if (!v.cpu.trim()) return "CPU không được để trống";
      if (!v.price || v.price <= 0) return "Giá phải > 0";
    }

    return null;
  };
  const count = images.filter((i) => i !== mainImage).length;
  const isInvalid = count < 2 || count > 6;



  const handleCreateBrand = async () => {
  if (!newBrand.trim()) {
    alert("Vui lòng nhập tên thương hiệu");
    return;
  }

  setLoadingBrand(true);

  try {
    let imageUrl = "";

    // upload logo
    if (mainImage && typeof mainImage !== "string") {
      imageUrl = await upload(mainImage, "brand");
    } else {
      imageUrl = mainImage || "";
    }

    const payload = {
      name: newBrand.trim(),
      image: imageUrl,
    };

    const res = await fetch("/api/brands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

if (!res.ok) {
  alert(data.error || "Lỗi tạo thương hiệu");
  return;
}

const brand = data.data;

if (!brand?._id) {
  alert("Brand không hợp lệ");
  return;
}

setBrands((prev) => {
  const exists = prev.some(
    (item) => String(item._id) === String(brand._id)
  );

  if (exists) return prev;

  return [...prev, brand];
});

setBrandId(String(brand._id));
    // reset form
    setNewBrand("");
    setMainImage(null);

    // đóng popup
    setOpenBrand(false);

  } catch (err) {
    console.error(err);
    alert("Upload thất bại");
  } finally {
    setLoadingBrand(false);
  }
};

const SelectIcon = () => {
  return (
    <i
      className="
        fas fa-chevron-down
        absolute right-3 top-1/2
        -translate-y-1/2
        text-[12px]
        text-[#9CA3AF]
        pointer-events-none
      "
    />
  );
};
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="
    w-[100vw]
sm:w-[96vw]
sm:max-w-[1000px]
h-[100vh]
sm:h-[90vh]
    flex flex-col
    overflow-hidden
    p-0
    rounded-2xl
    border border-[#E5E7EB]
    bg-[#FAFAFA]
  "
        >
          {/* HEADER */}
          <DialogHeader
            className="
                px-7 py-5
                bg-white
                border-b border-[#ECECEC]
            "
          >
            <div
  className="
    flex flex-col
    sm:flex-row
    gap-4
    sm:items-center
    sm:justify-between
  "
>
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div
                  className="
                            w-14 h-14
                            rounded-2xl
                            bg-[#FFF1E7]
                            flex items-center justify-center
                        "
                >
                  <i className="fas fa-box-open text-[24px] text-[#ff7a00]" />
                </div>

                <div>
                  <DialogTitle
                    className="
                               text-[22px] sm:text-[28px]
                                font-semibold
                                text-[#111827]
                            "
                  >
                    {mode === "create" ? "Thêm Sản Phẩm" : "Sửa Sản Phẩm"}
                  </DialogTitle>

                  <p className="text-sm leading-7 text-[#6B7280] mt-1">
                    Quản lý thông tin laptop, cấu hình và hình ảnh sản phẩm
                  </p>
                </div>
              </div>

              {/* CLOSE */}
              <DialogClose asChild>
                <button
                  className="
                            w-10 h-10
                            rounded-xl
                            border border-[#E5E7EB]
                            bg-white
                            flex items-center justify-center
                            hover:bg-[#FFF4EC]
                            hover:border-[#FED7AA]
                            transition-all
                        "
                >
                  <X className="w-5 h-5" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          {/* BODY */}
          <div
            ref={bodyRef}
            className={`
                px-4 sm:px-6 lg:px-7 py-4
                max-h-[78vh]
                overflow-y-auto
                space-y-6
                ${loading ? "pointer-events-none opacity-60" : ""}
            `}
          >
            {/* TOP */}
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-5
                items-start
              "
            >
              {/* BRAND */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between ">
                  <label className="text-[15px] font-semibold text-[#111827] mb-2">
                    Thương hiệu <span className="text-red-500">*</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setOpenBrand(true)}
                    className="
                                        text-[#ff7a00]
                                        text-sm leading-7
                                        font-semibold
                                        hover:underline
                                    "
                  >
                    + Thêm
                  </button>
                </div>

                <div className="relative">
                 <select
  value={brandId}
  onChange={(e) => setBrandId(e.target.value)}
  className="
    w-full h-[35px]
    rounded-xl
    border border-[#DCDCDC]
    bg-white
    px-2 pr-10
    outline-none
    text-[15px]
    appearance-none
    transition-all
    focus:border-[#ff7a00]
    focus:ring-4
    focus:ring-[#FFF3E8]
    cursor-pointer
  "
>
  {brands.map((b: any) => (
    <option
      key={String(b._id)}
      value={String(b._id)}
    >
      {b.name}
    </option>
  ))}
</select>

                  <i
                    className="
                                        fas fa-chevron-down
                                        absolute right-3 top-1/2
                                        -translate-y-1/2
                                        text-[12px]
                                        text-[#9CA3AF]
                                        pointer-events-none
                                    "
                  />
                </div>
              </div>

              {/* NAME */}
              <div className="flex flex-col">
                <label className="text-[15px] font-semibold text-[#111827] mb-2">
                  Tên Sản Phẩm <span className="text-red-500">*</span>
                </label>

                <input
                  value={name}
                  placeholder="Nhập tên sản phẩm"
                  onChange={(e) => {
                    const value = e.target.value;

                    setName(value);

                    // auto slug
                    setSlug(slugify(value));

                    if (!value.trim()) {
                      setErrorName("Không được để trống");
                    } else if (value.length < 5) {
                      setErrorName("Tên phải ít nhất 5 ký tự");
                    } else {
                      setErrorName("");
                    }
                  }}
                  className={`
                                    w-full h-[35px]
                                    rounded-xl
                                    border
                                    bg-white
                                    px-4
                                    outline-none
                                    text-[15px]
                                    transition-all
                                    focus:ring-4
                                    focus:ring-[#FFF3E8]
                                    ${errorName
                      ? "border-red-500"
                      : "border-[#DCDCDC] focus:border-[#ff7a00]"
                    }
                                `}
                />

                {/* FIX HEIGHT */}
                <div className="h-[20px] mt-1">
                  {errorName && (
                    <p className="text-red-500 text-sm leading-7">{errorName}</p>
                  )}
                </div>
              </div>

              {/* SLUG */}
              <div className="flex flex-col">
                <label className="text-[15px] font-semibold text-[#111827] mb-2">
                  Slug
                </label>

                <input
                  disabled
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="slug tự tạo"
                  className="
                                    w-full h-[35px]
                                    rounded-xl
                                    border border-[#DCDCDC]
                                    bg-white
                                    px-4
                                    outline-none
                                    text-[15px]
                                    transition-all
                                    focus:border-[#ff7a00]
                                    focus:ring-4
                                    focus:ring-[#FFF3E8]
                                "
                />

                {/* giữ chiều cao đồng đều */}
                <div className="h-[20px] mt-1" />
              </div>
            </div>

            {/* STATUS */}
            <div
              className="
                bg-white
                border border-[#E5E7EB]
                rounded-2xl
                p-5
                flex flex-col
                lg:flex-row
                gap-6
                lg:items-center
                lg:justify-between
              "
            >
              {/* LEFT */}
              <div>
                <label className="text-[15px] font-semibold text-[#111827] mb-4">
                  Trạng thái sản phẩm
                </label>

                <div className="flex items-center gap-3">
                  {/* HOT */}
                  <label
                    className={`
        flex items-center gap-3
        h-[52px]
        px-4
        rounded-xl
        border
        cursor-pointer
        transition-all
        ${isHot ? "border-[#FED7AA] bg-[#FFF7ED]" : "border-[#E5E7EB] bg-white"}
    `}
                  >
                    <div
                      className="
            w-8 h-8
            rounded-lg
            bg-[#FFF1E7]
            flex items-center justify-center
            text-[18px]
        "
                    >
                      🔥
                    </div>

                    <input
                      type="checkbox"
                      checked={isHot}
                      onChange={(e) => setIsHot(e.target.checked)}
                      className="
                        cursor-pointer
            w-4 h-4
            accent-[#ff7a00]
        "
                    />

                    <span className="text-[15px] font-medium text-[#374151]">
                      Hot
                    </span>
                  </label>

                  {/* NEW */}
                  <label
                    className={`
        flex items-center gap-3
        h-[52px]
        px-4
        rounded-xl
        border
        cursor-pointer
        transition-all
        ${isNew ? "border-[#BBF7D0] bg-[#F0FDF4]" : "border-[#E5E7EB] bg-white"}
    `}
                  >
                    <div
                      className="
            px-2 h-8
            rounded-lg
            bg-[#DCFCE7]
            flex items-center justify-center
            text-[12px]
            font-semibold
            text-[#16A34A]
        "
                    >
                      NEW
                    </div>

                    <input
                      type="checkbox"
                      checked={isNew}
                      onChange={(e) => setIsNew(e.target.checked)}
                    
                      className="
                        cursor-pointer
              w-4 h-4
            accent-[#ff7a00]
    "
                    />

                    <span className="text-[15px] font-medium text-[#374151]">
                      New
                    </span>
                  </label>
                </div>
              </div>

              {/* RIGHT */}
             <div
              className="
                lg:border-l border-[#E5E7EB]
                lg:pl-8
                flex items-center gap-4
              "
            >
                <div>
                  <label className="text-[15px] font-semibold text-[#111827]">
                    Sản phẩm hoạt động
                  </label>

                  <p className="text-sm leading-7 text-[#6B7280] mt-1">
                    Tắt để ẩn sản phẩm khỏi cửa hàng
                  </p>
                </div>

                {/* TOGGLE */}
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`
    relative
     w-11 h-6
          cursor-pointer
      rounded-full
    transition-all duration-300
    ${isActive ? "bg-[#ff7a00]" : "bg-[#D1D5DB]"}
  `}
                >
                  <div
                    className={`
      absolute top-0.5
                    w-5 h-5
      rounded-full
      bg-white
      shadow-md
      transition-all duration-300
      ${isActive ? "left-[22px]" : "left-[2px]"}
    `}
                  />
                </button>
              </div>
            </div>

            {/* IMAGE */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-[15px] font-semibold text-[#111827] text-lg">
                  Ảnh sản phẩm
                  <span className="text-[#6B7280] font-normal text-sm leading-7">
                    {" "}
                    (tối thiểu 2 ảnh)
                  </span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
              </div>

                      
       {/* MAIN */}
<div
  className="
    border-2 border-dashed border-[#FED7AA]
    bg-[#FFF9F5]
    rounded-2xl
    h-[180px] sm:h-[230px]
    flex flex-col items-center justify-center
    relative
    overflow-hidden
    mb-4
  "
>

  {/* IMAGE */}
  {mainImageUrl ? (
    <img
      src={mainImageUrl}
      className="w-full h-full object-contain"
    />
  ) : (
    <>
      <div
        className="
          w-20 h-20
          rounded-full
          bg-[#FFF1E7]
          flex items-center justify-center
        "
      >
        <i className="fas fa-images text-3xl text-[#ff7a00]" />
      </div>

      <p className="mt-4 text-[#6B7280]">
        Kéo thả ảnh vào đây hoặc click để chọn
      </p>
    </>
  )}

  {/* UPLOAD BUTTON LUÔN HIỆN */}
  <label
    className="
      absolute bottom-4 right-4
      h-9 px-5
      rounded-xl
      border border-[#DCDCDC]
      bg-white
      flex items-center gap-2
      cursor-pointer
      hover:border-[#ff7a00]
      shadow-sm
    "
  >
    <i className="fas fa-plus" />
    Thêm ảnh

    <input
      type="file"
      multiple
      hidden
      onChange={(e) => {
        const files = Array.from(e.target.files || []);

        const validFiles: File[] = [];

        for (const file of files) {
          if (!file.type.startsWith("image/")) {
            alert("Chỉ được upload ảnh");
            continue;
          }

          if (file.size > 5 * 1024 * 1024) {
            alert("Ảnh tối đa 5MB");
            continue;
          }

          validFiles.push(file);
        }

        if (!validFiles.length) {
          e.target.value = "";
          return;
        }

        setImages((prev) => {
          const newList = [...prev, ...validFiles];

          // CHỈ set main khi chưa có
          if (!mainImage && newList.length > 0) {
            setMainImage(newList[0]);
          }

          return newList;
        });

        e.target.value = "";
      }}
    />
  </label>
</div>

              {/* THUMB LIST */}
              <div className="flex flex-wrap gap-3">

                {images.map((img, index) => {
                  const url =
                    typeof img === "string"
                      ? img
                      : URL.createObjectURL(img);

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setCropImage(url);
                        setCropIndex(index);
                        setCropOpen(true);
                      }}
                      className={`
          relative
         w-20 h-20 sm:w-24 sm:h-24
          rounded-2xl
          overflow-hidden
          border-2
          cursor-pointer
          group
          transition-all duration-300
          hover:shadow-lg
          ${img === mainImage
                          ? "border-[#ff7a00]"
                          : "border-[#E5E7EB]"
                        }
        `}
                    >

                      <img
                        src={url}
                        className="
            w-full h-full
            object-cover
            transition-all duration-300
            group-hover:scale-105
          "
                      />

                      {/* MAIN LABEL */}
                      {img === mainImage && (
                        <div
                          className="
              absolute top-2 left-2
              px-2 py-1
              rounded-lg
              bg-[#ff7a00]
              text-white
              text-[10px]
              font-semibold
              z-20
            "
                        >
                          MAIN
                        </div>
                      )}

                      {/* DELETE */}
                         <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();

            const newImgs = images.filter((i) => i !== img);
            setImages(newImgs);

            if (img === mainImage) {
              setMainImage(newImgs[0] || null);
            }
          }}
          className="
            absolute bottom-2 right-2
            w-7 h-7
            rounded-lg
            bg-white
            border border-[#E5E7EB]
            flex items-center justify-center
            text-red-500
            transition-all
            cursor-pointer
          "
        >
          <Trash className="w-3 h-3" />
        </button>

                    </div>
                  );
                })}

              </div>


             {/* VARIANTS */}
<div
  className="
    bg-white
    border border-[#E5E7EB]
    rounded-2xl
    overflow-hidden
    mt-5
  "
>
  {/* HEADER */}
  <div
    className="
      px-4 sm:px-5 py-4
      border-b border-[#E5E7EB]
      flex flex-col sm:flex-row
      gap-4
      sm:items-center
      sm:justify-between
    "
  >
    <div>
      <h2 className="text-[15px] font-semibold text-[#111827]">
        Cấu hình sản phẩm
      </h2>

      <p className="text-sm leading-7 text-[#6B7280] mt-1">
        Quản lý nhiều phiên bản cấu hình
      </p>
    </div>

    <button
      onClick={addVariant}
      className="
        h-10 px-4
        rounded-xl
        border border-[#FED7AA]
        bg-[#FFF4EC]
        text-[#ff7a00]
        font-medium
        hover:bg-[#FFE7D6]
        transition-all
        w-full sm:w-auto
      "
    >
      + Thêm cấu hình
    </button>
  </div>

  {/* DESKTOP HEADER */}
  <div
    className="
      hidden lg:grid
      grid-cols-[1.1fr_0.7fr_0.8fr_1.3fr_0.7fr_0.7fr_0.8fr_110px_50px]
      gap-3
      px-5 py-3
      bg-[#F9FAFB]
      border-b border-[#E5E7EB]
      text-xs font-semibold text-[#6B7280]
    "
  >
    <div>CPU</div>
    <div>RAM</div>
    <div>SSD</div>
    <div>GPU</div>
    <div>Size</div>
    <div>Độ phân giải</div>
    <div>Tần số</div>
    <div>Giá</div>
    <div className="text-center">Xóa</div>
  </div>

  {/* BODY */}
  <div className="divide-y divide-[#F3F4F6]">
    {variants.map((v, index) => (
      <div
        key={v.id}
        className="
          p-4 lg:px-5 lg:py-4
          hover:bg-[#FAFAFA]
          transition-all
        "
      >

        {/* DESKTOP */}
        <div
          className="
            hidden lg:grid
            grid-cols-[1.1fr_0.7fr_0.8fr_1.3fr_0.7fr_0.7fr_0.8fr_110px_50px]
            gap-3
            items-center
          "
        >

          {/* CPU */}
          <input
            className={selectClass}
            placeholder="i7-1165G7"
            value={v.cpu}
            onChange={(e) => {
              const newVariants = [...variants];
              newVariants[index].cpu = e.target.value;
              setVariants(newVariants);
            }}
          />

          {/* RAM */}
          <div className="relative">
            <select
             className={selectClass}
              value={v.ram}
              onChange={(e) =>
                setVariants((prev) =>
                  prev.map((item) =>
                    item.id === v.id
                      ? { ...item, ram: e.target.value }
                      : item
                  )
                )
              }
            >
              <option value="8GB">8GB</option>
              <option value="16GB">16GB</option>
              <option value="32GB">32GB</option>
              <option value="64GB">64GB</option>
            </select>

           <SelectIcon />
          </div>

          {/* SSD */}
          <div className="relative">
            <select
             className={selectClass}
              value={v.ssd}
              onChange={(e) =>
                setVariants((prev) =>
                  prev.map((item) =>
                    item.id === v.id
                      ? { ...item, ssd: e.target.value }
                      : item
                  )
                )
              }
            >
              <option value="128GB">128GB</option>
              <option value="256GB">256GB</option>
              <option value="512GB">512GB</option>
              <option value="1TB">1TB</option>
            </select>

           <SelectIcon />
          </div>

          {/* GPU */}
          <input
          className={selectClass}
            placeholder="RTX 4060"
            value={v.gpu || ""}
            onChange={(e) => {
              const newVariants = [...variants];
              newVariants[index].gpu = e.target.value;
              setVariants(newVariants);
            }}
          />

          {/* SIZE */}
          <div className="relative">
            <select
             className={selectClass}
              value={v.screenSize}
              onChange={(e) =>
                setVariants((prev) =>
                  prev.map((item) =>
                    item.id === v.id
                      ? { ...item, screenSize: e.target.value }
                      : item
                  )
                )
              }
            >
              <option value="13.3">13.3"</option>
              <option value="14">14"</option>
              <option value="15.6">15.6"</option>
              <option value="16">16"</option>
            </select>

           <SelectIcon />
          </div>

          {/* RESOLUTION */}
          <div className="relative">
            <select
             className={selectClass}
              value={v.resolution}
              onChange={(e) =>
                setVariants((prev) =>
                  prev.map((item) =>
                    item.id === v.id
                      ? { ...item, resolution: e.target.value }
                      : item
                  )
                )
              }
            >
              <option value="FHD">FHD</option>
              <option value="2K">2K</option>
              <option value="4K">4K</option>
            </select>

           <SelectIcon />
          </div>

          {/* REFRESH */}
          <div className="relative">
            <select
           className={selectClass}
              value={v.refreshRate}
              onChange={(e) =>
                setVariants((prev) =>
                  prev.map((item) =>
                    item.id === v.id
                      ? { ...item, refreshRate: e.target.value }
                      : item
                  )
                )
              }
            >
              <option value="60">60Hz</option>
              <option value="90">90Hz</option>
              <option value="120">120Hz</option>
              <option value="144">144Hz</option>
            </select>

           <SelectIcon />
          </div>

          {/* PRICE */}
          <div className="relative">
            <input
             className={selectClass}
              value={
                v.priceInput !== undefined
                  ? new Intl.NumberFormat("vi-VN").format(
                      Number(v.priceInput || 0)
                    )
                  : ""
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");

                setVariants((prev) =>
                  prev.map((item) =>
                    item.id === v.id
                      ? {
                          ...item,
                          priceInput: raw,
                          price: Number(raw || 0),
                        }
                      : item
                  )
                );
              }}
              placeholder="15.900.000"
            />

            <span
              className="
                absolute right-3 top-1/2
                -translate-y-1/2
                text-sm leading-7 text-[#6B7280]
              "
            >
              đ
            </span>
          </div>

          {/* DELETE */}
          <div className="flex justify-center">
            {variants.length > 1 && (
              <button
                onClick={() => removeVariant(v.id)}
                className="
                  w-8 h-8
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
                <Trash className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* MOBILE + TABLET */}
        <div className="lg:hidden space-y-3">

          {/* CPU */}
       
          <input
            className="
              w-full h-10
              rounded-xl
              border border-[#DCDCDC]
              px-3
              text-sm leading-7
               
            "
            placeholder="CPU"
            value={v.cpu}
            onChange={(e) => {
              const newVariants = [...variants];
              newVariants[index].cpu = e.target.value;
              setVariants(newVariants);
            }}
          />

          {/* GPU */}
          <input
            className="
              w-full h-10
              rounded-xl
              border border-[#DCDCDC]
              px-3
              text-sm leading-7
            "
            placeholder="GPU"
            value={v.gpu}
            onChange={(e) => {
              const newVariants = [...variants];
              newVariants[index].gpu = e.target.value;
              setVariants(newVariants);
            }}
          />

          {/* RAM + SSD */}
          <div className="grid grid-cols-2 gap-3">
               <div className="relative">
            <select
              className="
                w-full h-10
                rounded-xl
                border border-[#DCDCDC]
                px-3
                appearance-none
              "
              value={v.ram}
              onChange={(e) =>
                setVariants((prev) =>
                  prev.map((item) =>
                    item.id === v.id
                      ? { ...item, ram: e.target.value }
                      : item
                  )
                )
              }
            >
              <option value="8GB">8GB</option>
              <option value="16GB">16GB</option>
              <option value="32GB">32GB</option>
              <option value="64GB">64GB</option>
            </select>
            <SelectIcon />
  </div>
                <div className="relative">   
            <select
              className="
                w-full h-10
                rounded-xl
                border border-[#DCDCDC]
                px-3
                appearance-none
              "
              value={v.ssd}
              onChange={(e) =>
                setVariants((prev) =>
                  prev.map((item) =>
                    item.id === v.id
                      ? { ...item, ssd: e.target.value }
                      : item
                  )
                )
              }
            >
              <option value="128GB">128GB</option>
              <option value="256GB">256GB</option>
              <option value="512GB">512GB</option>
              <option value="1TB">1TB</option>
            </select>
              <SelectIcon />
  </div>
          </div>

          {/* SIZE + REFRESH */}
          <div className="grid grid-cols-2 gap-3">
             <div className="relative">   
            <select
              className="
                w-full h-10
                rounded-xl
                border border-[#DCDCDC]
                px-3
                appearance-none
              "
              value={v.screenSize}
              onChange={(e) =>
                setVariants((prev) =>
                  prev.map((item) =>
                    item.id === v.id
                      ? { ...item, screenSize: e.target.value }
                      : item
                  )
                )
              }
            >
              <option value="13.3">13.3"</option>
              <option value="14">14"</option>
              <option value="15.6">15.6"</option>
              <option value="16">16"</option>
            </select>
               <SelectIcon />
  </div>
<div className="relative">   
            <select
              className="
                w-full h-10
                rounded-xl
                border border-[#DCDCDC]
                px-3
                 appearance-none
              "
              value={v.refreshRate}
              onChange={(e) =>
                setVariants((prev) =>
                  prev.map((item) =>
                    item.id === v.id
                      ? { ...item, refreshRate: e.target.value }
                      : item
                  )
                )
              }
            >
              <option value="60">60Hz</option>
              <option value="90">90Hz</option>
              <option value="120">120Hz</option>
              <option value="144">144Hz</option>
            </select>
             <SelectIcon />
  </div>
          </div>

          {/* RESOLUTION + PRICE */}
          <div className="grid grid-cols-2 gap-3">
<div className="relative">   
            <select
              className="
                w-full h-10
                rounded-xl
                border border-[#DCDCDC]
                px-3
                  appearance-none
              "
              value={v.resolution}
              onChange={(e) =>
                setVariants((prev) =>
                  prev.map((item) =>
                    item.id === v.id
                      ? { ...item, resolution: e.target.value }
                      : item
                  )
                )
              }
            >
              <option value="FHD">FHD</option>
              <option value="2K">2K</option>
              <option value="4K">4K</option>
            </select>
<SelectIcon />
  </div>
            <div className="relative">
              <input
                className="
                  w-full h-10
                  rounded-xl
                  border border-[#DCDCDC]
                  px-3 pr-8
                "
                placeholder="Giá"
                value={
                  v.priceInput !== undefined
                    ? new Intl.NumberFormat("vi-VN").format(
                        Number(v.priceInput || 0)
                      )
                    : ""
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");

                  setVariants((prev) =>
                    prev.map((item) =>
                      item.id === v.id
                        ? {
                            ...item,
                            priceInput: raw,
                            price: Number(raw || 0),
                          }
                        : item
                    )
                  );
                }}
              />

              <span
                className="
                  absolute right-3 top-1/2
                  -translate-y-1/2
                  text-sm leading-7 text-[#6B7280]
                "
              >
                đ
              </span>
            </div>
          </div>

          {/* DELETE */}
          {variants.length > 1 && (
            <button
              onClick={() => removeVariant(v.id)}
              className="
                w-full h-10
                rounded-xl
                border border-red-200
                bg-red-50
                text-red-500
                hover:bg-red-500
                hover:text-white
                transition-all
              "
            >
              Xóa cấu hình
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
            </div>
          </div>

          {/* FOOTER */}
          <DialogFooter
            className="
                px-7 py-4
                bg-white
                border-t border-[#ECECEC]
                flex justify-end gap-3
                mb-0
            "
          >
            <DialogClose asChild>
              <Button variant="outline" className="h-8 px-7 rounded-xl">
                Huỷ
              </Button>
            </DialogClose>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="
                    h-8 px-8
                    rounded-xl
                    bg-[#ff7a00]
                    hover:bg-[#eb6f00]
                    text-white
                    shadow-lg shadow-orange-200
                "
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}

              {loading ? "Đang lưu..." : "Lưu"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

     <Dialog open={openBrand} onOpenChange={setOpenBrand}>
  <DialogContent
    className="
      sm:max-w-md
      rounded-3xl
      border border-[#F3E8DF]
      bg-[#FFFDFB]
      p-0
      overflow-hidden
      shadow-2xl
    "
  >

    {/* HEADER */}
    <DialogHeader
      className="
        px-6 py-5
        border-b border-[#F3E8DF]
        bg-white
      "
    >
      <div className="flex items-center gap-4">

        {/* ICON */}
        <div
          className="
            w-14 h-14
            rounded-2xl
            bg-[#FFF1E7]
            flex items-center justify-center
          "
        >
          <i className="fas fa-tags text-[22px] text-[#ff7a00]" />
        </div>

        {/* TEXT */}
        <div>
          <DialogTitle
            className="
              text-[22px]
              font-semibold
              text-[#111827]
            "
          >
            Thêm thương hiệu
          </DialogTitle>

          <p className="text-sm leading-7 text-[#6B7280] mt-1">
            Tạo thương hiệu mới cho sản phẩm
          </p>
        </div>
      </div>
    </DialogHeader>

    {/* BODY */}
    <div className="px-6 py-5">

      <label className="text-sm leading-7 font-semibold text-[#111827] mb-2 block">
        Tên thương hiệu
      </label>

      <input
        className="
          w-full h-12
          rounded-2xl
          border border-[#E5E7EB]
          bg-white
          px-4
          text-[15px]
          outline-none
          transition-all
          focus:border-[#ff7a00]
          focus:ring-4
          focus:ring-[#FFF3E8]
        "
        placeholder="Ví dụ: Dell, Lenovo, ASUS..."
        value={newBrand}
        onChange={(e) => setNewBrand(e.target.value)}
      />

      {/* IMAGE */}
<div>
  <div className="flex items-center justify-between mb-3">
    <label className="text-[15px] font-semibold text-[#111827]">
      Logo thương hiệu
    </label>

    {mainImageUrl && (
      <span className="text-xs text-[#9CA3AF]">
        PNG, JPG tối đa 5MB
      </span>
    )}
  </div>

  <div
    className="
      relative
      w-full
      h-[220px]
      rounded-3xl
      border-2 border-dashed border-[#FED7AA]
      bg-[#FFF9F5]
      overflow-hidden
      transition-all
      hover:border-[#ffb066]
    "
  >

    {/* IMAGE */}
    {mainImageUrl ? (
      <>
        <img
          src={mainImageUrl}
          className="
            w-full h-full
            object-contain
            p-6
          "
        />

        {/* OVERLAY */}
        <div
          className="
            absolute inset-0
            bg-black/0
            hover:bg-black/5
            transition-all
          "
        />

        {/* DELETE */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMainImage(null);
          }}
          className="
            absolute top-4 right-4
            w-10 h-10
            rounded-xl
            bg-white
            border border-[#FECACA]
            flex items-center justify-center
            text-red-500
            hover:bg-red-500
            hover:text-white
            transition-all
            shadow-sm
            z-20
          "
        >
          <Trash className="w-4 h-4" />
        </button>
      </>
    ) : (
      <div
        className="
          w-full h-full
          flex flex-col
          items-center justify-center
          px-5
          text-center
        "
      >
        {/* ICON */}
        <div
          className="
            w-20 h-20
            rounded-full
            bg-[#FFF1E7]
            flex items-center justify-center
          "
        >
          <i className="fas fa-image text-3xl text-[#ff7a00]" />
        </div>

        <p className="mt-5 text-[#374151] font-medium">
          Tải logo thương hiệu
        </p>

        <p className="text-sm leading-7 text-[#9CA3AF] mt-1">
          PNG, JPG hoặc WEBP
        </p>
      </div>
    )}

    {/* PICK BUTTON */}
    <label
      className="
        absolute bottom-4 right-4
        h-10 px-4
        rounded-xl
        bg-white
        border border-[#E5E7EB]
        flex items-center gap-2
        cursor-pointer
        hover:border-[#ff7a00]
        hover:bg-[#FFF7ED]
        transition-all
        shadow-sm
        z-20
      "
    >
      <i className="fas fa-upload text-[#ff7a00]" />

      {mainImageUrl ? "Đổi ảnh" : "Chọn ảnh"}

      <input
        type="file"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          if (!file.type.startsWith("image/")) {
            alert("Chỉ upload ảnh");
            return;
          }

          if (file.size > 5 * 1024 * 1024) {
            alert("Max 5MB");
            return;
          }

          setMainImage(file);

          // QUAN TRỌNG
          e.target.value = "";
        }}
      />
    </label>

    {/* LOADING */}
    {uploading && (
      <div
        className="
          absolute inset-0
          bg-white/80
          backdrop-blur-sm
          flex flex-col
          items-center justify-center
          z-30
        "
      >
        <Loader2 className="w-7 h-7 animate-spin text-[#ff7a00]" />

        <p className="mt-3 text-sm leading-7 text-[#6B7280]">
          Đang upload ảnh...
        </p>
      </div>
    )}
  </div>
</div>
    </div>
    

    {/* FOOTER */}
    <DialogFooter
      className="
        px-6 py-7
        border-t border-[#F3E8DF]
        bg-white
        flex-row justify-end gap-3
      "
    >

      {/* CANCEL */}
      <Button
        variant="outline"
        onClick={() => setOpenBrand(false)}
        className="
          h-11 px-5
          rounded-xl
          border border-[#E5E7EB]
          bg-white
          text-[#6B7280]
          hover:bg-[#FFF4EC]
          hover:border-[#FED7AA]
          hover:text-[#111827]
          transition-all
        "
      >
        Huỷ
      </Button>

      {/* SAVE */}
      <Button
  disabled={loadingBrand}
  onClick={handleCreateBrand}
  className="
    h-11 px-6
    rounded-xl
    bg-[#ff7a00]
    hover:bg-[#eb6f00]
    text-white
    shadow-lg shadow-orange-200
    transition-all
    disabled:opacity-60
  "
>
  {loadingBrand ? (
    <>
      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      Đang lưu...
    </>
  ) : (
    <>
      <i className="fas fa-plus text-sm leading-7 mr-2" />
      Lưu thương hiệu
    </>
  )}
</Button>

    </DialogFooter>
  </DialogContent>
</Dialog>

      <ImageCropDialog
        open={cropOpen}
        setOpen={setCropOpen}
        image={cropImage}
        onDone={handleCropDone}
      />
    </>
  );
}
