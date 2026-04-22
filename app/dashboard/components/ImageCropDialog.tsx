"use client";

import Cropper from "react-easy-crop";
import { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  image: string;
  onDone: (file: File) => void;
};

export default function ImageCropDialog({
  open,
  setOpen,
  image,
  onDone,
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.2); // 🔥 zoom nhẹ như Shopee
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  // reset khi đổi ảnh
  useEffect(() => {
    if (open) {
      setCrop({ x: 0, y: 0 });
      setZoom(1.2);
    }
  }, [image, open]);

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const createImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
    });

  const getCroppedImg = async () => {
    const img = await createImage(image);

    const SIZE = 800; // 🔥 chuẩn Shopee
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;

    const ctx = canvas.getContext("2d")!;

    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      SIZE,
      SIZE
    );

    return new Promise<File>((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(
            new File([blob!], "cropped.webp", {
              type: "image/webp",
            })
          );
        },
        "image/webp",
        0.9
      );
    });
  };

  const handleDone = async () => {
    const file = await getCroppedImg();
    onDone(file);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Crop ảnh</DialogTitle>
        </DialogHeader>

        {/* CROP AREA */}
        <div className="relative w-full h-[400px] bg-black rounded">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1} // 🔥 vuông
            objectFit="cover" // 🔥 luôn fill
            showGrid // 🔥 grid giống Shopee
            minZoom={1}
            maxZoom={3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* ZOOM SLIDER */}
        <div className="mt-4">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Huỷ
          </Button>
          <Button onClick={handleDone}>Cắt ảnh</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}