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
import { useEffect } from "react"
import ImageCropDialog from "../components/ImageCropDialog";
import { Loader2 } from "lucide-react";
type Variant = {
    id: string;
    cpu: string;
    ram: string;
    ssd: string;
    price: number;
    priceInput?: string;
      screenSize: string;   // 🔥 thêm
    resolution: string;   // 🔥 thêm
};

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
    mode: "create" | "edit";
    product?: any; // chỉ dùng khi edit
    onSuccess?: () => void;
}

export default function AddProductDialog({
    open,
    setOpen,
    mode,
    product,
    onSuccess
}: Props) {
    console.log("product", product)
    // const variantsRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const [name, setName] = useState("")
    const [errorName, setErrorName] = useState("")
    const [images, setImages] = useState<File[]>([]);
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [openBrand, setOpenBrand] = useState(false)
    const [newBrand, setNewBrand] = useState("")
    const [brands, setBrands] = useState<any[]>([])
    const [brandId, setBrandId] = useState("")
    const [variants, setVariants] = useState<Variant[]>([
        {
            id: Date.now().toString(),
            cpu: "",
            ram: "8GB",
            ssd: "256GB",
            price: 0,
              screenSize: "",   // 🔥 thêm
            resolution: "",   // 🔥 thêm
        },
    ]);
    const [cropOpen, setCropOpen] = useState(false);
    const [cropImage, setCropImage] = useState<string>("");
    const [cropIndex, setCropIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const formatPrice = (num: number) => {
        return num.toLocaleString("vi-VN");
    };
    const resetForm = () => {
        setName("");
        setVariants([
            {
                id: Date.now().toString(),
                cpu: "",
                ram: "8GB",
                ssd: "256GB",
                price: 0,
                  screenSize: "",   // 🔥 thêm
            resolution: "",   // 🔥 thêm
            },
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
            {
                id: Date.now().toString(),
                cpu: "",
                ram: "",
                ssd: "",
                price: 0,
                  screenSize: "",   // 🔥 thêm
            resolution: "",   // 🔥 thêm
            },
        ]);

        setTimeout(() => {
            bodyRef.current?.scrollTo({
                top: bodyRef.current.scrollHeight,
                behavior: "smooth"
            });
        }, 0);
    };

    const removeVariant = (id: string) => {
        setVariants((prev) => prev.filter((v) => v.id !== id));
    };



    useEffect(() => {
        const fetchBrands = async () => {
            const res = await fetch("/api/brands")
            const data = await res.json()
            console.log("data", data)
            setBrands(data)
        }

        fetchBrands()
    }, [])
    useEffect(() => {
        if (brands.length > 0) {
            setBrandId(brands[0]._id)
        }
    }, [brands])

    const handleSubmit = async () => {
        const err = validateForm();
        if (err) {
            setLoading(false);
            alert(err);
            return;
        }
        try {
            if (!mainImage) {
                setLoading(false);
                return;
            }
            setLoading(true);
            // 👉 MAIN IMAGE
            let mainImageUrl = "";

            if (typeof mainImage === "string") {
                mainImageUrl = mainImage; // ảnh cũ
            } else {
                mainImageUrl = await upload(mainImage); // ảnh mới
            }

            // 👉 GALLERY
            const galleryUrls = await Promise.all(
                images
                    .filter((i) => i !== mainImage)
                    .map(async (img) => {
                        if (typeof img === "string") {
                            return img; // giữ ảnh cũ
                        }
                        return await upload(img); // upload ảnh mới
                    })
            );

            const payload = {
                name,
                brandId,
                mainImage: mainImageUrl,
                gallery: galleryUrls,
                variants,
            };

            console.log("payload", mode, payload);

            // 👉 CREATE vs EDIT
            const res = await fetch(
                mode === "create"
                    ? "/api/products"
                    : `/api/products/${product._id}`,
                {
                    method: mode === "create" ? "POST" : "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );



            if (!res.ok) {
                const err = await res.json(); // 🔥 lấy error từ backend
                console.log("res", err)
                alert(err.error || "Lỗi lưu sản phẩm");
                return;
            }

            setOpen(false);
            onSuccess?.();
        } catch (err) {
            console.error(err);
            alert("Upload thất bại xx");
        } finally {
            setLoading(false);
        }
    };
    const upload = async (file: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
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
        const gallery = images.filter(i => i !== mainImage);

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
    const count = images.filter(i => i !== mainImage).length;
    const isInvalid = count < 2 || count > 6;
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-2xl flex flex-col max-h-[85vh]" showCloseButton={false}>

                    {/* HEADER */}
                    <DialogHeader className="flex flex-row items-center justify-between">
                        <DialogTitle className="text-lg font-semibold">
                            {mode === "create" ? "Thêm Sản Phẩm" : "Sửa Sản Phẩm"}
                        </DialogTitle>

                        <DialogClose asChild>
                            <button>
                                <X className="w-5 h-5" />
                            </button>
                        </DialogClose>
                    </DialogHeader>

                    {/* BODY */}
                    <div
                        ref={bodyRef}
                        className={`flex-1 overflow-y-auto space-y-4 pr-2 ${loading ? "pointer-events-none opacity-60" : ""
                            }`}
                    >

                        {/* Brand */}
                        <div>
                            <div className="flex items-center justify-between ">
                                <label className="text-sm font-medium">Thương hiệu</label>

                                <button
                                    type="button"
                                    className="text-sm text-blue-600"
                                    onClick={() => setOpenBrand(true)}
                                >
                                    + Thêm
                                </button>
                            </div>

                            <select
                                className="w-full border rounded-md p-2 mt-1"
                                value={brandId}
                                onChange={(e) => setBrandId(e.target.value)}
                            >
                                {brands.map((b: any) => (
                                    <option key={b._id?.toString()} value={b._id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium">Tên Sản Phẩm</label>
                            <input
                                className={`w-full border rounded-md p-2 mt-1 ${errorName ? "border-red-500" : ""
                                    }`}
                                placeholder="ThinkPad X1 Carbon Gen 9"
                                value={name}
                                onChange={(e) => {
                                    const value = e.target.value
                                    setName(value)

                                    if (!value.trim()) {
                                        setErrorName("Không được để trống")
                                    } else if (value.length < 5) {
                                        setErrorName("Tên phải ít nhất 5 ký tự")
                                    } else {
                                        setErrorName("")
                                    }
                                }}
                            />

                            {errorName && (
                                <p className="text-red-500 text-sm mt-1">{errorName}</p>
                            )}
                        </div>

                        {/* Images */}
                        <div>

                            {/* MAIN IMAGE */}
   <div className="mt-2">
  {/* Thẻ container, quy định kích thước cố định */}
  <div className="relative w-full h-48 rounded border overflow-hidden bg-gray-100">
    {mainImageUrl ? (
      <img
        src={mainImageUrl}
        alt="Main product visual"
        className="h-full w-full object-cover 
                   hover:object-contain hover:bg-black/80 
                   transition-all duration-500 ease-in-out 
                   cursor-zoom-in"
      />
    ) : (
      /* Trạng thái không có ảnh */
      <div className="flex items-center justify-center h-full text-gray-400">
        Chưa có ảnh
      </div>
    )}
  </div>
</div>
                            {uploading && (
                                <p className="text-sm text-blue-500 mt-2 flex items-center gap-2">
                                    <span className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
                                    Đang upload ảnh...
                                </p>
                            )}

                            {/* THUMB LIST */}
                           <div className="flex gap-2 mt-3 flex-wrap">
    {images.map((img, index) => {
        const url =
            typeof img === "string"
                ? img
                : URL.createObjectURL(img);

        return (
            <div
                key={index}
                className={`relative cursor-pointer border rounded overflow-hidden ${
                    img === mainImage ? "border-blue-500" : ""
                }`}
                onClick={() => {
                    setCropImage(url);
                    setCropIndex(index);
                    setCropOpen(true);
                }}
            >
                <img
                    src={url}
                    className="w-20 h-20 object-contain bg-white rounded"
                />

                {/* MAIN LABEL */}
                {img === mainImage && (
                    <span className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-1 rounded-br">
                        Main
                    </span>
                )}

                {/* DELETE */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();

                        const newImgs = images.filter((i) => i !== img);
                        setImages(newImgs);

                        if (img === mainImage) {
                            setMainImage(newImgs[0] || null);
                        }
                    }}
                    className="absolute bottom-0 right-0 text-xs bg-white px-1 border"
                >
                    Xóa
                </button>
            </div>
        );
    })}

    {/* UPLOAD */}
    <label className="border rounded-md px-4 py-2 cursor-pointer flex items-center">
        + Tải ảnh
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
                            <p
                                className={`text-sm mt-2 flex items-center gap-1 ${isInvalid ? "text-red-500" : "text-gray-500"
                                    }`}
                            >
                                {isInvalid && <span>⚠️</span>}
                                Ảnh phụ: {count}/6 (tối thiểu 2)
                            </p>
                        </div>

                        {/* VARIANTS */}
                        <div>
                            <label className="text-sm font-medium">Cấu hình</label>

                            <div className="space-y-2 mt-2 pr-2   ">
                                {variants.map((v, index) => (
                                    <div
                                        key={v.id}
                                        className="grid grid-cols-5 gap-2 items-center"
                                    >
                                        <input
                                            className="border rounded p-2"
                                            placeholder="CPU"
                                            value={v.cpu}
                                            onChange={(e) => {
                                                const newVariants = [...variants]
                                                newVariants[index].cpu = e.target.value
                                                setVariants(newVariants)
                                            }}
                                        />

                                        <select
                                            className="border rounded p-2"
                                            value={v.ram}
                                            onChange={(e) =>
                                                setVariants(prev =>
                                                    prev.map(item =>
                                                        item.id === v.id ? { ...item, ram: e.target.value } : item
                                                    )
                                                )
                                            }
                                        >
                                            <option value="8GB">8GB</option>
                                            <option value="16GB">16GB</option>
                                            <option value="32GB">32GB</option>
                                            <option value="64GB">64GB</option>
                                        </select>

                                        <select
                                            className="border rounded p-2"
                                            value={v.ssd}
                                            onChange={(e) =>
                                                setVariants(prev =>
                                                    prev.map(item =>
                                                        item.id === v.id ? { ...item, ssd: e.target.value } : item
                                                    )
                                                )
                                            }
                                        >
                                            <option value="128GB">128GB</option>
                                            <option value="256GB">256GB</option>
                                            <option value="512GB">512GB</option>
                                            <option value="1TB">1TB</option>
                                        </select>
                                           {/* SIZE */}
<select
    className="border rounded p-2"
    value={v.screenSize}
    onChange={(e) =>
        setVariants(prev =>
            prev.map(item =>
                item.id === v.id ? { ...item, screenSize: e.target.value } : item
            )
        )
    }
>
    <option value="">Size</option>
    <option value='13.3"'>13.3"</option>
    <option value='14"'>14"</option>
    <option value='15.6"'>15.6"</option>
    <option value="custom">Khác...</option>
</select>

{/* RESOLUTION */}
<select
    className="border rounded p-2"
    value={v.resolution}
    onChange={(e) =>
        setVariants(prev =>
            prev.map(item =>
                item.id === v.id ? { ...item, resolution: e.target.value } : item
            )
        )
    }
>
    <option value="">Res</option>
    <option value="FHD">FHD</option>
    <option value="2K">2K</option>
    <option value="4K">4K</option>
</select>     
                                        <input
                                            type="number"
                                            className="border rounded p-2"
                                            placeholder="Giá"
                                            value={v.priceInput ?? formatPrice(v.price)}
                                            onChange={(e) => {
                                                let value = e.target.value;

                                                // 🔥 chỉ cho số
                                                value = value.replace(/\D/g, "");

                                                // 🔥 bỏ số 0 đầu
                                                value = value.replace(/^0+/, "");
                                                if (Number(value) < 0) value = "0";
                                                setVariants(prev =>
                                                    prev.map(item =>
                                                        item.id === v.id
                                                            ? {
                                                                ...item,
                                                                priceInput: value,
                                                                price: Number(value || 0),
                                                            }
                                                            : item
                                                    )
                                                );
                                            }}
                                        />
                                        {variants.length > 1 && index > 0 && (
                                            <button onClick={() => removeVariant(v.id)}>
                                                <Trash className="w-4 h-4 text-red-500" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={addVariant}
                                className="mt-3 border rounded px-3 py-1"
                            >
                                + Thêm cấu hình
                            </button>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <DialogFooter className="flex justify-end gap-2 mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Huỷ</Button>
                        </DialogClose>

                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {loading ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </DialogFooter>

                    {loading && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 rounded-lg">
                            <div className="bg-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg">
                                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                <span className="text-sm font-medium">Đang lưu sản phẩm...</span>
                            </div>
                        </div>
                    )}


                </DialogContent>
            </Dialog>





            <Dialog open={openBrand} onOpenChange={setOpenBrand}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Thêm thương hiệu</DialogTitle>
                    </DialogHeader>

                    <input
                        className="w-full border rounded p-2"
                        placeholder="Nhập tên thương hiệu"
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                    />

                    <DialogFooter className="mt-3">
                        <Button
                            onClick={async () => {
                                const res = await fetch("/api/brands", {
                                    method: "POST",
                                    body: JSON.stringify({ name: newBrand }),
                                })

                                const data = await res.json()

                                // 🔥 thêm vào list luôn
                                setBrands((prev) => [...prev, data])

                                // 🔥 chọn luôn brand mới
                                setBrandId(data._id)

                                setNewBrand("")
                                setOpenBrand(false)
                            }}
                        >
                            Lưu
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