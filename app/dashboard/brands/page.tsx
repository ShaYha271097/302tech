import { Suspense } from "react";
import BrandDetail from "./BrandDetail";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrandDetail />
    </Suspense>
  );
}