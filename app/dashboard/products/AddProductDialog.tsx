"use client";

import { useMemo, useState } from "react";
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

type Variant = {
    id: string;
    cpu: string;
    ram: string;
    ssd: string;
    price: number;
};

export default function AddProductDialog({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
}) {
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
        },
    ]);

    const addVariant = () => {
        setVariants((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                cpu: "",
                ram: "",
                ssd: "",
                price: 0,
            },
        ]);
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
        if (!brandId) return alert("Chưa chọn thương hiệu");
        if (!variants.length) return alert("Chưa có cấu hình");

        if (!name.trim()) {
            setErrorName("Không được để trống");
            return;
        }

        if (name.length < 5) {
            setErrorName("Tên phải ít nhất 5 ký tự");
            return;
        }

        try {
            if (!mainImage) {
                alert("Chưa chọn ảnh chính");
                return;
            }

            // 🔥 upload ảnh chính
            const mainImageUrl = await upload(mainImage);

            // 🔥 upload gallery
            const galleryUrls = await Promise.all(
                images
                    .filter((i) => i !== mainImage)
                    .map((file) => upload(file))
            );

            const payload = {
                name,
                brandId,
                mainImage: mainImageUrl,
                gallery: galleryUrls,
                variants,
            };

            console.log("payload", payload);

            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                alert("Lỗi tạo sản phẩm");
                return;
            }

            setOpen(false);
        } catch (err) {
            console.error(err);
            alert("Upload thất bại");
        }
    };

    const upload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        return data.url;
    };


    const mainImageUrl = useMemo(() => {
    return mainImage ? URL.createObjectURL(mainImage) : "";
    }, [mainImage]);


    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-2xl" showCloseButton={false}>

                    {/* HEADER */}
                    <DialogHeader className="flex flex-row items-center justify-between">
                        <DialogTitle className="text-lg font-semibold">
                            Thêm Sản Phẩm
                        </DialogTitle>

                        <DialogClose asChild>
                            <button>
                                <X className="w-5 h-5" />
                            </button>
                        </DialogClose>
                    </DialogHeader>

                    {/* BODY */}
                    <div className="space-y-4">

                        {/* Brand */}
                        <div>
                            <div className="flex items-center justify-between">
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
                            <label className="text-sm font-medium">Ảnh</label>

                            {/* MAIN IMAGE */}
                            <div className="mt-2">
                                {mainImageUrl ? (
                                    <img
                                         src={mainImageUrl}
                                        className="w-full h-64 object-contain rounded border"
                                    />
                                ) : (
                                    <div className="w-full h-64 border rounded flex items-center justify-center text-gray-400">
                                        Chưa có ảnh
                                    </div>
                                )}
                            </div>

                            {/* THUMB LIST */}
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {images.map((img, index) => {
                                    console.log("check thử",img === mainImage)
                                         return (
                                    <div
                                        key={index}
                                        className={`relative cursor-pointer border rounded ${img === mainImage ? "border-blue-500" : ""
                                            }`}
                                        onClick={() => setMainImage(img)}
                                    >
                                        <img
                                            src={URL.createObjectURL(img)}
                                            className="w-20 h-20 object-cover rounded"
                                        />

                                        {/* LABEL MAIN */}
                                        {img === mainImage && (
                                            <span className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-1 rounded-br">
                                                Main
                                            </span>
                                        )}

                                        {/* DELETE */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                const newImgs = images.filter((i) => i !== img)
                                                setImages(newImgs)

                                                // nếu xóa ảnh chính → set lại ảnh đầu
                                                if (img === mainImage) {
                                                    setMainImage(newImgs[0] || "")
                                                }
                                            }}
                                            className="absolute bottom-0 right-0 text-xs bg-white px-1 border"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                )
                                }
                               )}

                                {/* UPLOAD */}
                                <label className="border rounded-md px-4 py-2 cursor-pointer flex items-center">
                                    + Tải ảnh
                                    <input
                                        type="file"
                                        multiple
                                        hidden
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files || [])
                                            const urls = files.map((file) => URL.createObjectURL(file))

                                            setImages((prev) => {
                                                const newList = [...prev, ...files]; // 👈 files là File[]
                                                console.log("newList=>>>",newList,newList[0])
                                                if (!mainImage && newList.length > 0) {
                                                    setMainImage(newList[0]);
                                                }

                                                return newList;
                                            });
                                        }}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* VARIANTS */}
                        <div>
                            <label className="text-sm font-medium">Cấu hình</label>

                            <div className="space-y-2 mt-2 max-h-30 overflow-y-auto pr-2">
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

                                        <input
                                            type="number"
                                            className="border rounded p-2"
                                            placeholder="Giá"
                                            value={v.price}
                                            onChange={(e) => {
                                                setVariants(prev =>
                                                    prev.map(item =>
                                                        item.id === v.id
                                                            ? { ...item, price: Number(e.target.value) }
                                                            : item
                                                    )
                                                )
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

                        <Button onClick={handleSubmit}>Lưu</Button>
                    </DialogFooter>
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
        </>
    );
}