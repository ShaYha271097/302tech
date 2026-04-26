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


type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
    mode: "create" | "edit";
    brand?: any; // chỉ dùng khi edit
    onSuccess?: () => void;
}

export default function AddPBrandDialog({
    open,
    setOpen,
    mode,
    brand,
    onSuccess
}: Props) {
    console.log("brand", brand)
    // const variantsRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const [name, setName] = useState("")
    const [errorName, setErrorName] = useState("")

    const [images, setImages] = useState<File[]>([]);
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

   
    const resetForm = () => {
        setName("");
        setImages([]);
        setMainImage(null);
    };
    useEffect(() => {
        if (!open) return; // 🔥 chỉ chạy khi dialog mở

        if (mode === "edit" && brand) {
            setName(brand.name || "");
        } else {
            // create
            resetForm();
        }
    }, [open, mode, brand]);


  const handleSubmit = async () => {
        const err = validateForm();
        if (err) {
            alert(err);
            return;
        }
        setLoading(true);

        try {
            const payload = {
                name,
            };

            console.log("payload", mode, payload);

            const res = await fetch(
                mode === "create"
                    ? "/api/brands"
                    : `/api/brands/${brand._id}`,
                {
                    method: mode === "create" ? "POST" : "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
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



    useEffect(() => {
        return () => {
            if (typeof mainImage !== "string") {
                URL.revokeObjectURL(mainImageUrl);
            }
        };
    }, [mainImageUrl]);


    const validateForm = () => {
        if (!name.trim() || name.trim().length < 3) {
            return "Tên sản phẩm tối thiểu 3 ký tự";
        }
        return null;
    };
    const count = images.filter(i => i !== mainImage).length;
    const isInvalid = count < 2 || count > 6;
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-xl flex flex-col max-h-[85vh]" showCloseButton={false}>

                    {/* HEADER */}
                    <DialogHeader className="flex flex-row items-center justify-between">
                        <DialogTitle className="text-lg font-semibold">
                            {mode === "create" ? "Thêm thương hiệu" : "Sửa thương hiệu"}
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

                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium">Tên Thương hiệu</label>
                            <input
                                className={`w-full border rounded-md p-2 mt-1 ${errorName ? "border-red-500" : ""
                                    }`}
                                placeholder="vui lòng nhập thương hiệu"
                                value={name}
                                onChange={(e) => {
                                    const value = e.target.value
                                    setName(value)

                                    if (!value.trim()) {
                                        setErrorName("Không được để trống")
                                    } else if (value.length < 3) {
                                        setErrorName("Tên phải ít nhất 3 ký tự")
                                    } else {
                                        setErrorName("")
                                    }
                                }}
                            />

                            {errorName && (
                                <p className="text-red-500 text-sm mt-1">{errorName}</p>
                            )}
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
        </>
    );
}