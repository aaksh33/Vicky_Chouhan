import type { Metadata } from "next"
import CatalogPage from "@/components/Pages/CatalogPage"

export const metadata: Metadata = {
  title: "Catalog",
  description: "Explore our full catalog of products across categories.",
  alternates: { canonical: "/catalog" },
}

export default function Page() {
  return <CatalogPage />
}