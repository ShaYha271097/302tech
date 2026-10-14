
"use client";

import { useMemo, useState, useEffect } from "react";
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
import { CloudinaryImage } from "@/types/image";

type UploadedImage = {
  url: string;
  publicId: string;
};

type Category = {
  _id: string;
  name: string;
  slug: string;
  image: CloudinaryImage | null;
  description?: string;
  sortOrder?: number;
  isActive: boolean;
  createdAt: string;
};

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  mode: "create" | "edit";
  category?: Category | null;
  onSuccess?: () => void;
};

export default function AddCategoryDialog({
  open,
  setOpen,
  mode,
  category,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [isActive, setIsActive] = useState(false);

  const [errorName, setErrorName] = useState("");
  const [mainImage, setMainImage] = useState<
    File | UploadedImage | null
  >(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && category) {
      setName(category.name || "");
      setDescription(category.description || "");
      setSortOrder(String(category.sortOrder ?? 0));
      setIsActive(category.isActive ?? false);
      setMainImage(category.image || null);
    } else {
      setName("");
      setDescription("");
      setSortOrder("0");
      setIsActive(false);
      setMainImage(null);
    }

    setErrorName("");
  }, [open, mode, category]);

  const mainImageUrl = useMemo(() => {
    if (!mainImage) return "";

    if (mainImage instanceof File) {
      return URL.createObjectURL(mainImage);
    }

    return mainImage.url;
  }, [mainImage]);

  useEffect(() => {
    return () => {
      if (mainImage instanceof File && mainImageUrl) {
        URL.revokeObjectURL(mainImageUrl);
      }
    };
  }, [mainImageUrl, mainImage]);

  const validateForm = () => {
    if (!name.trim() || name.trim().length < 2) {
      return "Tên danh mục phải có ít nhất 2 ký tự";
    }

    if (
      sortOrder.trim() === "" ||
      !Number.isInteger(Number(sortOrder)) ||
      Number(sortOrder) < 0
    ) {
      return "Thứ tự hiển thị phải là số nguyên không âm";
    }

    return null;
  };

  const upload = async (file: File): Promise<UploadedImage> => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "category");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.url || !data.publicId) {
        throw new Error(data.error || "Không thể tải ảnh lên");
      }

      return {
        url: data.url,
        publicId: data.publicId,
      };
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    const err = validateForm();

    if (err) {
      setErrorName(err);
      alert(err);
      return;
    }

    setLoading(true);

    try {
      let image: UploadedImage | null = null;

      if (mainImage instanceof File) {
        image = await upload(mainImage);
      } else if (mainImage) {
        image = {
          url: mainImage.url,
          publicId: mainImage.publicId,
        };
      }

      const payload = {
        name: name.trim(),
        image,
        description: description.trim(),
        sortOrder: Number(sortOrder),
        isActive,
      };

      const res = await fetch(
        mode === "create"
          ? "/api/categories"
          : `/api/categories/${category?._id}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            data.error ||
            "Lỗi lưu danh mục"
        );
        return;
      }

      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi lưu danh mục"
      );
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
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* HEADER */}
        <DialogHeader className="px-6 py-5 border-b border-[#FFE7D1] bg-gradient-to-r from-[#FFF7F0] to-[#FFFDFB]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF1E7] flex items-center justify-center shadow-sm">
                <i className="fas fa-layer-group text-[#ff7a00] text-xl" />
              </div>

              <div>
                <DialogTitle className="text-[22px] font-semibold text-[#111827]">
                  {mode === "create"
                    ? "Thêm danh mục"
                    : "Sửa danh mục"}
                </DialogTitle>

                <p className="text-sm leading-6 text-[#6B7280] mt-1">
                  Quản lý nhóm sản phẩm trên website
                </p>
              </div>
            </div>

            <DialogClose asChild>
              <button
                type="button"
                className="w-10 h-10 shrink-0 rounded-xl border border-[#E5E7EB] bg-white flex items-center justify-center hover:bg-[#FFF4EC] hover:border-[#FED7AA] transition-all"
              >
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>

        {/* BODY */}
        <div
          className={`px-6 py-5 space-y-5 ${
            loading ? "pointer-events-none opacity-70" : ""
          }`}
        >
          {/* NAME */}
          <div>
            <label className="text-[15px] font-semibold text-[#111827]">
              Tên danh mục
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              className={`mt-2 w-full h-11 rounded-2xl border bg-white px-4 text-[15px] outline-none transition-all focus:ring-4 focus:ring-[#FFF3E8] ${
                errorName
                  ? "border-red-500"
                  : "border-[#DCDCDC] focus:border-[#ff7a00]"
              }`}
              placeholder="Ví dụ: Laptop văn phòng"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                setName(value);

                if (!value.trim()) {
                  setErrorName("Không được để trống");
                } else if (value.trim().length < 2) {
                  setErrorName("Tên danh mục tối thiểu 2 ký tự");
                } else {
                  setErrorName("");
                }
              }}
            />

            <div className="mt-1 min-h-5">
              {errorName && (
                <p className="text-sm text-red-500">{errorName}</p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          {/* <div>
            <label className="text-[15px] font-semibold text-[#111827]">
              Mô tả danh mục
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ví dụ: Laptop phục vụ học tập, văn phòng và công việc hằng ngày..."
              rows={3}
              className="mt-2 w-full rounded-2xl border border-[#DCDCDC] bg-white px-4 py-3 text-[15px] outline-none resize-y focus:border-[#ff7a00] focus:ring-4 focus:ring-[#FFF3E8]"
            />
          </div> */}

          {/* SORT ORDER */}
          {/* <div>
            <label className="text-[15px] font-semibold text-[#111827]">
              Thứ tự hiển thị
            </label>

            <input
              type="number"
              min="0"
              step="1"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="mt-2 w-full h-11 rounded-2xl border border-[#DCDCDC] bg-white px-4 text-[15px] outline-none focus:border-[#ff7a00] focus:ring-4 focus:ring-[#FFF3E8]"
            />

            <p className="text-xs text-gray-500 mt-1">
              Số càng nhỏ thì danh mục càng được ưu tiên hiển thị trước.
            </p>
          </div> */}

          {/* ACTIVE STATUS */}
          {/* <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#FFE7D1] bg-[#FFF9F5] p-4">
            <div>
              <p className="font-semibold text-[#111827]">
                Hiển thị danh mục
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Cho phép danh mục xuất hiện trên website.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={isActive}
              onClick={() => setIsActive((prev) => !prev)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                isActive ? "bg-[#ff7a00]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  isActive ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div> */}

          {/* IMAGE */}
          <div>
            <label className="text-[15px] font-semibold text-[#111827]">
              Ảnh danh mục
            </label>

            <div className="relative mt-2 w-full h-[220px] rounded-3xl border-2 border-dashed border-[#FED7AA] bg-[#FFF9F5] overflow-hidden">
              {mainImageUrl ? (
                <>
                  <img
                    src={mainImageUrl}
                    alt="Ảnh danh mục"
                    className="w-full h-full object-contain p-6"
                  />

                  <button
                    type="button"
                    onClick={() => setMainImage(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white border border-[#FECACA] flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#FFF1E7] flex items-center justify-center">
                    <i className="fas fa-image text-3xl text-[#ff7a00]" />
                  </div>

                  <p className="mt-4 text-[#6B7280] text-sm">
                    Chọn ảnh đại diện cho danh mục
                  </p>
                </div>
              )}

              {!mainImageUrl && (
                <label className="absolute bottom-4 right-4 h-10 px-4 rounded-xl bg-white border border-[#E5E7EB] flex items-center gap-2 cursor-pointer hover:border-[#ff7a00] transition-all shadow-sm">
                  <i className="fas fa-upload text-[#ff7a00]" />
                  Chọn ảnh

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      if (!file.type.startsWith("image/")) {
                        alert("Vui lòng chọn file ảnh");
                      } else if (file.size > 5 * 1024 * 1024) {
                        alert("Dung lượng ảnh tối đa 5MB");
                      } else {
                        setMainImage(file);
                      }

                      e.target.value = "";
                    }}
                  />
                </label>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Nên dùng ảnh tỷ lệ 3:2. Dung lượng tối đa 5MB.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="px-6 py-5 border-t border-[#FFE7D1] bg-white flex flex-col-reverse sm:flex-row gap-3">
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={loading || uploading}
              className="h-11 rounded-2xl border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111111] cursor-pointer"
            >
              Huỷ
            </Button>
          </DialogClose>

          <Button
            disabled={loading || uploading}
            onClick={handleSubmit}
            className="h-11 rounded-2xl bg-[#ff7a00] hover:bg-[#ea6d00] text-white shadow-lg shadow-orange-200 disabled:opacity-60 cursor-pointer"
          >
            {(loading || uploading) && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}

            {uploading
              ? "Đang tải ảnh..."
              : loading
                ? "Đang lưu..."
                : mode === "create"
                  ? "Thêm danh mục"
                  : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
