
"use client";

import { useState, useRef,useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading2,
  Heading3,
  Quote,
  Undo2,
  Redo2,
  Palette,
} from "lucide-react";


type Props = {
  value: string;
  onChange: (value: string) => void;
  onPendingImagesChange?: (
    images: Map<string, File>
  ) => void;
};

export default function ProductDescriptionEditor({
  value,
  onChange,
  onPendingImagesChange,
}: Props) {
  const pendingImages = useRef<Map<string, File>>(new Map());
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState("#ff7a00");

useEffect(() => {
  return () => {
    for (const blobUrl of pendingImages.current.keys()) {
      URL.revokeObjectURL(blobUrl);
    }

    pendingImages.current.clear();
  };
}, []);
  const syncPendingImages = () => {
  onPendingImagesChange?.(
    new Map(pendingImages.current)
  );
};

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: false,
        resize: {
          enabled: true,
          directions: [
            "top",
            "bottom",
            "left",
            "right",
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ],
          minWidth: 100,
          minHeight: 100,
          alwaysPreserveAspectRatio: true,
        },
      }),
      TextStyleKit,
      Color,
    ],

    content: value || "<p></p>",

    immediatelyRender: false,

   onUpdate: ({ editor }) => {
  const html = editor.getHTML();

  onChange(html);

  // Những blob URL còn tồn tại trong nội dung
  const currentBlobUrls = new Set<string>();

  editor.state.doc.descendants((node) => {
    if (node.type.name === "image") {
      const src = node.attrs.src;

      if (typeof src === "string" && src.startsWith("blob:")) {
        currentBlobUrls.add(src);
      }
    }
  });

  // Tìm những ảnh tạm đã bị xóa khỏi editor
  for (const [blobUrl] of pendingImages.current) {
    if (!currentBlobUrls.has(blobUrl)) {
      URL.revokeObjectURL(blobUrl);

      pendingImages.current.delete(blobUrl);
    }
  }

  syncPendingImages();
},
  });

  if (!editor) return null;

  const buttonClass = (active = false) => `
    w-9 h-9
    rounded-lg
    flex items-center justify-center
    transition-all
    cursor-pointer
    ${active
      ? "bg-[#FFF4EC] text-[#ff7a00]"
      : "text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]"
    }
  `;

  // Màu preset
  const presetColors = [
    "#111827", // Đen
    "#6B7280", // Xám
    "#ff7a00", // Cam 302 Tech
    "#EF4444", // Đỏ
    "#2563EB", // Xanh dương
    "#16A34A", // Xanh lá
    "#9333EA", // Tím
  ];

  const setTextColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
    setCustomColor(color);
    setShowColorPicker(false);
  };

  const unsetTextColor = () => {
    editor.chain().focus().unsetColor().run();
    setShowColorPicker(false);
  };

  return (
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
        "
      >
        <h2 className="text-[15px] font-semibold text-[#111827]">
          Mô tả sản phẩm
        </h2>

        <p className="text-sm leading-7 text-[#6B7280] mt-1">
          Viết mô tả chi tiết, có thể thêm hình ảnh, tiêu đề và danh sách
        </p>
      </div>

      {/* TOOLBAR */}
      <div
        className="
          px-3 sm:px-4 py-2
          border-b border-[#E5E7EB]
          bg-[#F9FAFB]
          flex flex-wrap items-center gap-1
        "
      >
        {/* BOLD */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive("bold"))}
          title="In đậm"
        >
          <Bold className="w-4 h-4" />
        </button>

        {/* ITALIC */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive("italic"))}
          title="In nghiêng"
        >
          <Italic className="w-4 h-4" />
        </button>

        {/* UNDERLINE */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className={buttonClass(editor.isActive("underline"))}
          title="Gạch chân"
        >
          <Underline className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[#E5E7EB] mx-1" />

        {/* H2 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={buttonClass(
            editor.isActive("heading", { level: 2 })
          )}
          title="Tiêu đề lớn"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        {/* H3 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={buttonClass(
            editor.isActive("heading", { level: 3 })
          )}
          title="Tiêu đề nhỏ"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[#E5E7EB] mx-1" />

        {/* BULLET LIST */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className={buttonClass(editor.isActive("bulletList"))}
          title="Danh sách"
        >
          <List className="w-4 h-4" />
        </button>

        {/* ORDERED LIST */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className={buttonClass(editor.isActive("orderedList"))}
          title="Danh sách đánh số"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        {/* QUOTE */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          className={buttonClass(editor.isActive("blockquote"))}
          title="Trích dẫn"
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[#E5E7EB] mx-1" />

        {/* COLOR */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColorPicker((prev) => !prev)}
            className={buttonClass(editor.isActive("textStyle"))}
            title="Màu chữ"
          >
            <Palette className="w-4 h-4" />
          </button>

          {showColorPicker && (
            <div
              className="
                absolute
                top-11
                left-0
                z-50
                w-[250px]
                rounded-xl
                border border-[#E5E7EB]
                bg-white
                shadow-lg
                p-3
              "
            >
              {/* TITLE */}
              <div className="text-sm font-semibold text-[#111827] mb-3">
                Màu chữ
              </div>

              {/* PRESET COLORS */}
              <div className="flex flex-wrap gap-2 mb-3">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setTextColor(color)}
                    className="
                      w-7 h-7
                      rounded-full
                      border-2
                      border-white
                      ring-1
                      ring-[#E5E7EB]
                      hover:scale-110
                      transition-transform
                    "
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>

              <div className="border-t border-[#E5E7EB] pt-3">
                <div className="text-xs font-medium text-[#6B7280] mb-2">
                  Màu tùy chỉnh
                </div>

                <div className="flex items-center gap-2">
                  {/* COLOR INPUT */}
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => {
                      const color = e.target.value;
                      setCustomColor(color);
                      editor
                        .chain()
                        .focus()
                        .setColor(color)
                        .run();
                    }}
                    className="
                      w-9 h-9
                      p-0
                      border-0
                      rounded-lg
                      cursor-pointer
                      overflow-hidden
                    "
                  />

                  {/* HEX INPUT */}
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const isValidHex =
                          /^#[0-9A-Fa-f]{6}$/.test(customColor);

                        if (isValidHex) {
                          setTextColor(customColor);
                        }
                      }
                    }}
                    className="
                      flex-1
                      h-9
                      px-3
                      rounded-lg
                      border border-[#E5E7EB]
                      bg-white
                      text-sm
                      text-[#111827]
                      outline-none
                      focus:border-[#ff7a00]
                      focus:ring-2
                      focus:ring-[#ff7a00]/10
                    "
                    placeholder="#FF7A00"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const isValidHex =
                        /^#[0-9A-Fa-f]{6}$/.test(customColor);

                      if (isValidHex) {
                        setTextColor(customColor);
                      }
                    }}
                    className="
                      h-9
                      px-3
                      rounded-lg
                      bg-[#ff7a00]
                      text-white
                      text-xs
                      font-medium
                      hover:bg-[#e96d00]
                      transition-colors
                    "
                  >
                    Áp dụng
                  </button>
                </div>
              </div>

              {/* REMOVE COLOR */}
              <button
                type="button"
                onClick={unsetTextColor}
                className="
                  mt-3
                  w-full
                  h-9
                  rounded-lg
                  border border-[#E5E7EB]
                  text-sm
                  text-[#6B7280]
                  hover:bg-[#F9FAFB]
                  hover:text-[#111827]
                  transition-colors
                "
              >
                Xóa màu
              </button>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-[#E5E7EB] mx-1" />

        {/* IMAGE */}
        {/* IMAGE */}
        <button
          type="button"
          onClick={() => {
            const input = document.createElement("input");

            input.type = "file";
            input.accept = "image/*";

            input.onchange = () => {
              const file = input.files?.[0];

              if (!file) return;

              // Giới hạn 5MB
              if (file.size > 5 * 1024 * 1024) {
                alert("Ảnh không được vượt quá 5MB");
                return;
              }

              // Chỉ nhận image
              if (!file.type.startsWith("image/")) {
                alert("Vui lòng chọn file hình ảnh");
                return;
              }

              // Tạo URL tạm
              const blobUrl = URL.createObjectURL(file);

            pendingImages.current.set(blobUrl, file);

            syncPendingImages();

              // Chèn ảnh tạm vào Tiptap
              editor
                .chain()
                .focus()
                .setImage({
                  src: blobUrl,
                  alt: file.name,
                })
                .run();
            };

            input.click();
          }}
          className={buttonClass()}
          title="Thêm hình ảnh"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        {/* LINK */}
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Nhập URL");

            if (url) {
              editor
                .chain()
                .focus()
                .setLink({ href: url })
                .run();
            }
          }}
          className={buttonClass(editor.isActive("link"))}
          title="Thêm liên kết"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <div className="flex-1" />

        {/* UNDO */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().undo().run()
          }
          disabled={!editor.can().undo()}
          className={buttonClass()}
          title="Hoàn tác"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        {/* REDO */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().redo().run()
          }
          disabled={!editor.can().redo()}
          className={buttonClass()}
          title="Làm lại"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      {/* EDITOR */}
      <div
        className="
          px-4 sm:px-5 py-4
          min-h-[350px]
        "
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

