import type { Metadata } from "next"
import PromoCodeTable from "@/components/admin/promocode-table"

export const metadata: Metadata = {
  title: "Admin • Promo Codes",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin/promocodes" },
}

export default function AdminPromoCodesPage() {
  return (
    <main className="mx-auto">
      <PromoCodeTable />
    </main>
  )
}
