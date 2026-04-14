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
        className="relative border rounded-lg overflow-hidden cursor-zoom-in"
        onClick={handleClick}
        onMouseMove={handleMove}
        onMouseLeave={() => setIsZoomActive(false)}
      >
        <img
          src={currentImage}
          className="w-full h-[400px] object-contain"
          draggable={false}
        />

        {/* Lens */}
        {isZoomActive && (
          <div
            className="absolute border border-white shadow-lg rounded-full"
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
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
          />
        )}

        {!isZoomActive && (
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
            <span className="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded">
              Click to zoom
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail */}
      <div className="grid grid-cols-4 gap-2 mt-3">
        {images.slice(0, 4).map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => setCurrentImage(img)}
            className={`w-full h-24 object-cover cursor-pointer border rounded 
              ${
                currentImage === img
                  ? "border-red-500 ring-2 ring-red-300"
                  : "border-gray-200"
              }`}
          />
        ))}
      </div>
    </div>
  );
}