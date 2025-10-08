"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { addToCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

export default function ProductCard({ product }: { product: Product }) {
  const { toast } = useToast();
  const discounted = product.mrp && product.mrp > product.price;
  const discountPct =
    discounted && product.mrp
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <div className="bg-white p-4">
      <Link href={`/products/${product.slug}`} className="block overflow-hidden mb-4">
        <CloudinaryImage
          src={product.frontImage || product.image || "/no-image.svg"}
          alt={`${product.name} image`}
          width={500}
          height={300}
          className="h-48 w-full object-contain transition-transform duration-300 hover:scale-110"
        />
      </Link>
      <Link href={`/products/${product.slug}`} className="block">
        <h3 className="text-sm font-medium text-gray-800 hover:text-blue-600 line-clamp-2">
          {product.name}
        </h3>
      </Link>
      <div className="text-xs text-gray-500 mb-3">{product.brand}</div>
      <div className="mb-3">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-lg font-semibold text-gray-900">
            ₹{product.price.toFixed(2)}
          </span>
          {discounted && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ₹{product.mrp?.toFixed(2)}
              </span>
              <span className="text-sm text-green-600 font-medium">
                {discountPct}% off
              </span>
            </>
          )}
        </div>
        <span className={product.quantity <= 5 ? "text-xs text-amber-600" : "text-xs text-gray-500"}>
          {product.quantity <= 5 ? "Low stock" : "In stock"}
        </span>
      </div>
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700"
        onClick={() => {
          addToCart({
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.frontImage || product.image,
          });
        }}
        disabled={product.quantity <= 0}
      >
        Add to Cart
      </Button>
    </div>
  );
}
