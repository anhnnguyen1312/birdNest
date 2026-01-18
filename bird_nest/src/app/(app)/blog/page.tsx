import { Suspense } from "react";
import BlogContent from "./BlogContent";

export default function Blog() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent />
    </Suspense>
  );
}
