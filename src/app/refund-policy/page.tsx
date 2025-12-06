
import { Metadata } from "next";
import RefundPolicyPage from "@/components/Pages/RefundPolicyClient";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description: "Learn about our return and refund policy for products",
};

export default function RefundPolicyPageWrapper() {
  return(
<RefundPolicyPage/>
  )
}