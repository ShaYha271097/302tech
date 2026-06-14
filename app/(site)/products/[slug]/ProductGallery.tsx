"use client";

import { useMemo, useState } from "react";

type Props = {
  mainImage: string;
  gallery: string[];
};

export default function ProductGallery({
  mainImage,
  gallery,
}: Props) {
  const images = useMemo(() => {
    const arr = [mainImage, ...(gallery || [])];
    return [...new Set(arr)];
  }, [mainImage, gallery]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [openViewer, setOpenViewer] = useState(false);

  const currentImage = images[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      {/* MAIN IMAGE */}
      <div className="w-full max-w-xl">

        <div
          onClick={() => setOpenViewer(true)}
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border border-orange-100
            bg-white
            cursor-zoom-in
          "
        >
          <img
            src={currentImage}
            alt=""
            className="
              w-full
              aspect-square
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

          {/* Overlay */}
          <div
            className="
              absolute inset-0
              bg-black/0
              group-hover:bg-black/5
              transition
            "
          />

          {/* Zoom Icon */}
          <div
            className="
              absolute
              bottom-4
              right-4

              bg-white/90
              backdrop-blur

              rounded-full
              px-3 py-2

              text-sm
              shadow-lg
            "
          >
            🔍 Xem ảnh lớn
          </div>
        </div>

        {/* THUMBNAILS */}
        <div className="grid grid-cols-4 gap-3 mt-4">

          {images.slice(0,4).map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                overflow-hidden
                rounded-xl
                border
                bg-white
                transition-all

                ${
                  currentIndex === index
                    ? `
                      border-[#ff7a00]
                      ring-4 ring-orange-100
                    `
                    : `
                      border-orange-100
                      hover:border-orange-300
                    `
                }
              `}
            >
              <img
                src={img}
                alt=""
                className="
                  w-full
                  aspect-square
                  object-cover
                  transition-transform
                  duration-300
                  hover:scale-105
                "
              />
            </button>
          ))}

        </div>
      </div>

      {/* FULLSCREEN VIEWER */}
      {openViewer && (
        <div
          className="
            fixed
            inset-0
            z-[9999]

            bg-black/90
            backdrop-blur-sm

            flex
            items-center
            justify-center
          "
        >

          {/* Close */}
          <button
            onClick={() => setOpenViewer(false)}
            className="
              absolute
              top-5
              right-5

              w-12 h-12

              rounded-full
              bg-white

              text-xl
              shadow-lg
            "
          >
            ✕
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="
                absolute
                left-4

                w-12 h-12

                rounded-full
                bg-white

                text-xl
                shadow-lg
              "
            >
              ←
            </button>
          )}

          {/* Image */}
          <img
            src={currentImage}
            alt=""
            className="
              max-w-[95vw]
              max-h-[90vh]
              object-contain
            "
          />

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="
                absolute
                right-4

                w-12 h-12

                rounded-full
                bg-white

                text-xl
                shadow-lg
              "
            >
              →
            </button>
          )}

          {/* Counter */}
          <div
            className="
              absolute
              bottom-6

              rounded-full
              bg-white/10

              px-4 py-2

              text-white
              backdrop-blur
            "
          >
            {currentIndex + 1} / {images.length}
          </div>

        </div>
      )}
    </>
  );
}