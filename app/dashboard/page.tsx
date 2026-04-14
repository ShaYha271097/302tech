"use client";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react"

export default function Dashboard() {

  return (
    <>
    hello
    </>
  )
}


//   const [initialData, setInitialData] = useState({
//         slider: [
//             {
//                 image: "",
//                 link: "",
//             },
//         ],

//         banners: {
//             top: {
//                 image: "",
//                 link: "",
//             },
//             bottom: {
//                 image: "",
//                 link: "",
//             },
//         },
//     });
//   const [slider, setSlider] = useState(initialData.slider);

// const [banners, setBanners] = useState(initialData.banners);

// useEffect(() => {
//   fetch("/api/homepage-banner")
//     .then((res) => res.json())
//     .then((data) => {
//       if (!data) return;

//       const formatted = {
//         slider: data.slider || [],
//         banners: data.banners || {
//           top: { image: "", link: "" },
//           bottom: { image: "", link: "" },
//         },
//       };

//       setSlider(formatted.slider);
//       setBanners(formatted.banners);
//       setInitialData(formatted);
//     });
// }, []);

//     const handleSave = async () => {
//         await fetch("/api/homepage-banner", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 slider,
//                 banners,
//             }),
//         });

//         setInitialData({ slider, banners });
//     };

//     const handleReset = () => {
//         setSlider(initialData.slider);
//         setBanners(initialData.banners);
//     };