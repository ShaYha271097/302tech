"use client";
import { useMemo, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { X, Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  mode: "create" | "edit";
  brand?: any;
  onSuccess?: () => void;
};

export default function AddPBrandDialog({
  open,
  setOpen,
  mode,
  brand,
  onSuccess,
}: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");

  const [mainImage, setMainImage] = useState<File | string | null>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const resetForm = () => {
    setName("");
    setMainImage(null);
  };

  // 🔥 set data khi edit
  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && brand) {
      setName(brand.name || "");
      setMainImage(brand.image || null); // 👈 QUAN TRỌNG
    } else {
      resetForm();
    }
  }, [open, mode, brand]);

  const mainImageUrl = useMemo(() => {
    if (!mainImage) return "";
    return typeof mainImage === "string"
      ? mainImage
      : URL.createObjectURL(mainImage);
  }, [mainImage]);

  // 🔥 cleanup đúng
  useEffect(() => {
    return () => {
      if (mainImage && typeof mainImage !== "string") {
        URL.revokeObjectURL(mainImageUrl);
      }
    };
  }, [mainImage]);

  const validateForm = () => {
    if (!name.trim() || name.trim().length < 2) {
      return "Tên thương hiệu tối thiểu 2 ký tự";
    }
    return null;
  };

  const upload = async (file: File) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "brand");

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

  const handleSubmit = async () => {
    const err = validateForm();
    if (err) {
      alert(err);
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";

      if (mainImage && typeof mainImage !== "string") {
        imageUrl = await upload(mainImage);
      } else {
        imageUrl = mainImage || "";
      }

      const payload = {
        name,
        image: imageUrl,
      };

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
        alert(data.error || "Lỗi lưu thương hiệu");
        return;
      }

      setOpen(false);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Upload thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl flex flex-col max-h-[85vh]" showCloseButton={false}>
        
        {/* HEADER */}
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>
            {mode === "create" ? "Thêm thương hiệu" : "Sửa thương hiệu"}
          </DialogTitle>

          <DialogClose asChild>
            <button>
              <X className="w-5 h-5" />
            </button>
          </DialogClose>
        </DialogHeader>

        {/* BODY */}
        <div ref={bodyRef} className="space-y-4">

          {/* NAME */}
          <div>
            <label className="text-sm font-medium">Tên thương hiệu</label>
            <input
              className={`w-full border rounded-md p-2 mt-1 ${
                errorName ? "border-red-500" : ""
              }`}
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                setName(value);

                if (!value.trim()) setErrorName("Không được để trống");
                else if (value.length < 2)
                  setErrorName("Ít nhất 2 ký tự");
                else setErrorName("");
              }}
            />
            {errorName && (
              <p className="text-red-500 text-sm mt-1">{errorName}</p>
            )}
          </div>

          {/* IMAGE */}
          <div>
            <label className="group relative w-full h-32 rounded border bg-white cursor-pointer overflow-hidden">

              {mainImageUrl ? (
                <>
                  <img
                    src={mainImageUrl}
                    className="absolute inset-0 m-auto max-w-[80%] max-h-[80%] object-contain"
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

                  {/* delete */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setMainImage(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  + Tải logo
                </div>
              )}

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
                }}
              />

              {/* 🔥 uploading overlay */}
              {uploading && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin text-[#ff7a00]" />
                </div>
              )}
            </label>
          </div>
        </div>

        {/* FOOTER */}
      <DialogFooter>

  {/* CANCEL */}
  <DialogClose asChild>
    <Button
      variant="outline"
      className="
        border border-[#E5E7EB]
        text-[#6B7280]
        hover:bg-[#F9FAFB]
        hover:text-[#111111]
        transition-all duration-300
      "
    >
      Huỷ
    </Button>
  </DialogClose>

  {/* SAVE */}
  <Button
    disabled={loading || uploading}
    onClick={handleSubmit}
    className="
      bg-[#ff7a00]
      hover:bg-[#ea6d00]
      text-white
      border-none
      transition-all duration-300
      disabled:opacity-60
    "
  >
    {(loading || uploading) && (
      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
    )}

    {loading ? "Đang lưu..." : "Lưu"}
  </Button>

</DialogFooter>

        {/* FULL LOADING */}
        {loading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white px-6 py-4 rounded-xl flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-[#ff7a00]" />
              <span>Đang xử lý...</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}