
import { Metadata } from "next";
import CookiePolicyPage from "@/components/Pages/CookiePolicyClient";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Learn about how we use cookies and manage your preferences",
};

export default function CookiePolicyPageWrapper() {
  return (
    <CookiePolicyPage />
  )
}
