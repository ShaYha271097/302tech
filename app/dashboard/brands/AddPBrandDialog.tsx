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
import { X, Loader2, Trash } from "lucide-react";

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
      <DialogContent
        showCloseButton={false}
        className="
      sm:max-w-xl
      p-0
      overflow-hidden
      rounded-3xl
      border border-[#FFE0C2]
      bg-[#FFFDFB]
      shadow-2xl
    "
      >
        {/* HEADER */}
        <DialogHeader
          className="
        px-6 py-5
        border-b border-[#FFE7D1]
        bg-gradient-to-r from-[#FFF7F0] to-[#FFFDFB]
      "
        >
          <div className="flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div
                className="
              w-12 h-12
              rounded-2xl
              bg-[#FFF1E7]
              flex items-center justify-center
              shadow-sm
            "
              >
                <i className="fas fa-tags text-[#ff7a00] text-xl" />
              </div>

              <div>
                <DialogTitle
                  className="
                text-[22px]
                font-bold
                text-[#111827]
              "
                >
                  {mode === "create"
                    ? "Thêm thương hiệu"
                    : "Sửa thương hiệu"}
                </DialogTitle>

                <p className="text-sm text-[#6B7280] mt-1">
                  Quản lý logo và thông tin thương hiệu
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
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>

        {/* BODY */}
        <div
          ref={bodyRef}
          className={`
        px-6 py-5
        space-y-6
        relative
        ${loading ? "pointer-events-none opacity-70" : ""}
      `}
        >
          {/* NAME */}
          <div>
            <label className="text-[15px] font-semibold text-[#111827]">
              Tên thương hiệu
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              className={`
            mt-2
            w-full h-11
            rounded-2xl
            border
            bg-white
            px-4
            text-[15px]
            outline-none
            transition-all
            focus:ring-4
            focus:ring-[#FFF3E8]
            ${errorName
                  ? "border-red-500"
                  : "border-[#DCDCDC] focus:border-[#ff7a00]"
                }
          `}
              placeholder="Ví dụ: Lenovo"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                setName(value);

                if (!value.trim()) {
                  setErrorName("Không được để trống");
                } else if (value.length < 2) {
                  setErrorName("Ít nhất 2 ký tự");
                } else {
                  setErrorName("");
                }
              }}
            />

            <div className="h-[20px] mt-1">
              {errorName && (
                <p className="text-sm text-red-500">{errorName}</p>
              )}
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-[15px] font-semibold text-[#111827]">
              Logo thương hiệu
            </label>

            <div
              className="
    relative
    w-full
    h-[220px]
    rounded-3xl
    border-2 border-dashed border-[#FED7AA]
    bg-[#FFF9F5]
    overflow-hidden
  "
            >
              {/* IMAGE */}
              {mainImageUrl ? (
                <>
                  <img
                    src={mainImageUrl}
                    className="w-full h-full object-contain p-6"
                  />

                  {/* DELETE */}
                  <button
                    type="button"
                    onClick={() => setMainImage(null)}
                    className="
          absolute top-4 right-4
          w-9 h-9
          rounded-xl
          bg-white
          border border-[#FECACA]
          flex items-center justify-center
          text-red-500
          hover:bg-red-500
          hover:text-white
          transition-all
        "
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
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

                  <p className="mt-4 text-[#6B7280] text-sm">
                    Click để tải logo thương hiệu
                  </p>
                </div>
              )}

              {/* BUTTON PICK FILE */}
              {!mainImageUrl && (
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
      transition-all
      shadow-sm
    "
                >
                  <i className="fas fa-upload text-[#ff7a00]" />
                  Chọn ảnh

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

                      e.target.value = "";
                    }}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter
          className="
        px-6 py-7
        border-t border-[#FFE7D1]
        bg-white
        flex flex-col-reverse sm:flex-row
        gap-3
      "
        >
          {/* CANCEL */}
          <DialogClose asChild>
            <Button
              variant="outline"
              className="
            h-11
            rounded-2xl
            border border-[#E5E7EB]
            bg-white
            text-[#6B7280]
            hover:bg-[#F9FAFB]
            hover:text-[#111111]
            transition-all
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
          h-11
          rounded-2xl
          bg-[#ff7a00]
          hover:bg-[#ea6d00]
          text-white
          shadow-lg shadow-orange-200
          transition-all
          disabled:opacity-60
        "
          >
            {(loading || uploading) && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}

            {loading ? "Đang lưu..." : "Lưu thương hiệu"}
          </Button>
        </DialogFooter>

        {/* FULL LOADING */}
        {loading && (
          <div
            className="
      absolute inset-0 z-50
      bg-white/40
      backdrop-blur-[6px]
      flex items-center justify-center
    "
          >
            <div
              className="
        min-w-[240px]
        rounded-3xl
        border border-[#FFE0C2]
        bg-white/90
        shadow-[0_10px_40px_rgba(255,122,0,0.15)]
        px-7 py-6
        flex flex-col items-center
      "
            >
              {/* SPINNER */}
              <div
                className="
          relative
          w-14 h-14
          rounded-full
          border-4 border-[#FFE7D1]
          border-t-[#ff7a00]
          animate-spin
        "
              />

              {/* TEXT */}
              <h3
                className="
          mt-5
          text-[17px]
          font-semibold
          text-[#111827]
        "
              >
                Đang xử lý
              </h3>

              <p
                className="
          mt-1
          text-sm
          text-[#6B7280]
          text-center
        "
              >
                Vui lòng chờ vài giây...
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}