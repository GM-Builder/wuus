"use client";
import { useSearchParams } from "next/navigation";
import { InquiryForm } from "./inquiry-form";
export function ReviewForm() {
  const params = useSearchParams();
  const hotel = (params.get("h") || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .slice(0, 160);
  return <InquiryForm source="review" initialHotel={hotel} key={hotel} />;
}
