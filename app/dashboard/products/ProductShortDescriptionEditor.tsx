"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  Heading2,
  Heading3,
  Palette,
} from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const colors = [
  "#111827",
  "#374151",
  "#6B7280",
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#16A34A",
  "#2563EB",
  "#9333EA",
];

export default function ProductShortDescriptionEditor({
  value,
  onChange,
}: Props) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,
      Underline,
      TextStyleKit,
      Color.configure({
        types: ["textStyle"],
      }),
    ],

    content: value || "",

    editorProps: {
      attributes: {
        class:
          "min-h-[220px] px-4 py-4 outline-none prose prose-sm max-w-none " +
          "prose-p:my-1 prose-ul:my-2 prose-ol:my-2 " +
          "prose-li:my-0.5",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();

    if (value !== current) {
      editor.commands.setContent(value || "", {
        emitUpdate: false,
      });
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Mô tả ngắn
          </h3>

          <p className="mt-0.5 text-xs text-gray-500">
            Thông tin nổi bật hiển thị nhanh trên trang sản phẩm
          </p>
        </div>

        <span className="rounded-md bg-orange-50 px-2 py-1 text-[11px] font-medium text-orange-600">
          Không hỗ trợ ảnh
        </span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-white px-3 py-2">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`toolbar-btn ${
            editor.isActive("bold")
              ? "bg-orange-50 text-[#ff7a00]"
              : ""
          }`}
          title="In đậm"
        >
          <Bold size={16} />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`toolbar-btn ${
            editor.isActive("italic")
              ? "bg-orange-50 text-[#ff7a00]"
              : ""
          }`}
          title="In nghiêng"
        >
          <Italic size={16} />
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`toolbar-btn ${
            editor.isActive("underline")
              ? "bg-orange-50 text-[#ff7a00]"
              : ""
          }`}
          title="Gạch chân"
        >
          <UnderlineIcon size={16} />
        </button>

        <div className="mx-1 h-5 w-px bg-gray-200" />

        {/* H2 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`toolbar-btn ${
            editor.isActive("heading", { level: 2 })
              ? "bg-orange-50 text-[#ff7a00]"
              : ""
          }`}
          title="Tiêu đề lớn"
        >
          <Heading2 size={17} />
        </button>

        {/* H3 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`toolbar-btn ${
            editor.isActive("heading", { level: 3 })
              ? "bg-orange-50 text-[#ff7a00]"
              : ""
          }`}
          title="Tiêu đề nhỏ"
        >
          <Heading3 size={17} />
        </button>

        <div className="mx-1 h-5 w-px bg-gray-200" />

        {/* Bullet */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className={`toolbar-btn ${
            editor.isActive("bulletList")
              ? "bg-orange-50 text-[#ff7a00]"
              : ""
          }`}
          title="Danh sách"
        >
          <List size={17} />
        </button>

        {/* Ordered */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className={`toolbar-btn ${
            editor.isActive("orderedList")
              ? "bg-orange-50 text-[#ff7a00]"
              : ""
          }`}
          title="Danh sách đánh số"
        >
          <ListOrdered size={17} />
        </button>

        <div className="mx-1 h-5 w-px bg-gray-200" />

        {/* Color */}
        <div className="group relative">
          <button
            type="button"
            className="toolbar-btn"
            title="Màu chữ"
          >
            <Palette size={17} />
          </button>

          <div className="invisible absolute left-0 top-full z-20 mt-1 w-[170px] rounded-lg border border-gray-200 bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setColor(color)
                      .run()
                  }
                  className="h-6 w-6 rounded-full border border-gray-200 transition-transform hover:scale-110"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1" />

        {/* Undo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="toolbar-btn disabled:cursor-not-allowed disabled:opacity-30"
          title="Hoàn tác"
        >
          <Undo2 size={16} />
        </button>

        {/* Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="toolbar-btn disabled:cursor-not-allowed disabled:opacity-30"
          title="Làm lại"
        >
          <Redo2 size={16} />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Footer */}
      <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
        <p className="text-[11px] text-gray-400">
          Có thể dùng <b>in đậm</b>, màu chữ, tiêu đề và danh sách để trình
          bày thông tin dễ đọc hơn.
        </p>
      </div>

      <style jsx>{`
        .toolbar-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          color: #4b5563;
          transition: all 0.15s ease;
        }

        .toolbar-btn:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .toolbar-btn:focus-visible {
          outline: 2px solid #ff7a00;
          outline-offset: 1px;
        }
      `}</style>
    </div>
  );
}