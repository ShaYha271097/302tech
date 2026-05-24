"use client";

import { useState, useRef, MouseEvent, useMemo } from "react";

const LENS_SIZE = 160;
const ZOOM = 10;

type Props = {
  mainImage: string;
  gallery: string[];
};

export default function ProductGallery({ mainImage, gallery }: Props) {
  // 👉 gộp ảnh
  const images = useMemo(() => {
    const arr = [mainImage, ...(gallery || [])];
    return [...new Set(arr)]; // tránh trùng
  }, [mainImage, gallery]);

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const getPosition = (e: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current!.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    const half = LENS_SIZE / 2;

    x = Math.max(half, Math.min(x, rect.width - half));
    y = Math.max(half, Math.min(y, rect.height - half));

    return { x, y, width: rect.width, height: rect.height };
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const { x, y } = getPosition(e);

    if (!isZoomActive) {
      setPos({ x, y });
      setIsZoomActive(true);
    } else {
      setIsZoomActive(false);
    }
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isZoomActive) return;

    const { x, y } = getPosition(e);
    setPos({ x, y });
  };

  const rect = containerRef.current?.getBoundingClientRect();
  const width = rect?.width || 1;
  const height = rect?.height || 1;

  return (
    <div className="w-full max-w-xl">
      {/* Ảnh lớn */}
      <div
        ref={containerRef}
        className="w-full aspect-square bg-white border rounded-lg overflow-hidden"
        onClick={handleClick}
        onMouseMove={handleMove}
        onMouseLeave={() => setIsZoomActive(false)}
      >
        <img
          src={currentImage}
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* Lens */}
        {isZoomActive && (
          <div
            className="absolute border border-white shadow-lg rounded-full transition-all duration-100"
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              top: pos.y - LENS_SIZE / 2,
              left: pos.x - LENS_SIZE / 2,
              backgroundImage: `url(${currentImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${ZOOM * 100}%`,
              backgroundPosition: `${(pos.x / width) * 100}% ${(pos.y / height) * 100}%`,
              pointerEvents: "none",
              borderRadius: "50%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          />
        )}

        {!isZoomActive && (
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition">
            <span className="text-white text-sm leading-7 font-medium bg-black/50 px-3 py-1 rounded mb-3">
              Click to zoom
            </span>
          </div>
        )}
      </div>

     {/* Thumbnail */}
<div className="grid grid-cols-4 gap-3 mt-4">

  {images.slice(0, 4).map((img, index) => (
    <button
      key={index}
      onClick={() => setCurrentImage(img)}
      className={`
        group
        relative
        aspect-square
        overflow-hidden
        rounded-xl
        border
        bg-white
        transition-all duration-300

        ${
          currentImage === img
            ? `
              border-[#ff7a00]
              ring-4 ring-orange-100
              shadow-[0_4px_20px_rgba(255,122,0,0.15)]
            `
            : `
              border-orange-100
              hover:border-orange-300
              hover:shadow-[0_4px_20px_rgba(255,122,0,0.08)]
            `
        }
      `}
    >

    
      {/* IMAGE */}
      <img
        src={img}
        className="
          w-full h-full
          object-cover
          transition-transform duration-300
          group-hover:scale-105
        "
      />

      {/* OVERLAY */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-black/5
          to-transparent
          opacity-0
          group-hover:opacity-100
          transition
        "
      />

    </button>
  ))}

</div>
    </div>
  );
}