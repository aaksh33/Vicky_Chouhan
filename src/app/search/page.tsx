"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type Product = {
  id: string;
  slug: string;
  name: string;
  title: string;
  category: string;
  description: string;
  price: number;
  mrp?: number;
  image: string;
  frontImage?: string;
  brand?: string;
  rating?: number;
};

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Update query when URL changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const searchProducts = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setResults([]); // Clear previous results immediately
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const results = await response.json();
      setResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      searchProducts(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchProducts(query);
    }
  };

  // Real-time search with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() && query !== initialQuery) {
        searchProducts(query);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, initialQuery]);

  return (
    <div className="mx-auto max-w-6xl h-full px-4 py-8">
      <div className="mb-0">
        <h1 className="text-3xl font-bold mb-2">Search Products</h1>
      </div>

      {loading && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p>Searching...</p>
          </div>
        </div>
      )}

      {query && !loading && (
        <div className="mb-4">
          <p className="text-muted-foreground">
            {results.length} results for &quot;{query}&quot;
          </p>
        </div>
      )}

      <div className="space-y-4">
        {results.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <div className="bg-white p-4 border-y border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex gap-4">
                <div className="w-48 h-44 flex-shrink-0">
                  <img
                    src={product.frontImage || product.image || '/no-image.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-blue-600 mb-2 hover:underline">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-green-600 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                      <span>4.3</span>
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="text-gray-600 text-sm">Ratings & Reviews</span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1 mb-3">
                    <li>• {product.description || 'High-quality product'}</li>
                    <li>• Premium build quality</li>
                    <li>• Advanced features</li>
                    <li>• 1 Year Warranty</li>
                  </ul>
                </div>
                <div className="text-left mt-5">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    ₹{product.price?.toLocaleString()}
                  </div>
                  <div className="flex gap-1">
                    <div className="text-sm text-gray-500 line-through font-medium mb-1">
                      ₹{Math.round((product.price || 0) * 1.3).toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600 font-medium mb-2">
                      27% off
                    </div>
                  </div>
                  <div className="text-xs text-blue-600 bg-blue-100 font-medium p-1 rounded">
                    Top Discount of the Sale
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {query && !loading && results.length === 0 && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-4">
              No products found for &quot;{query}&quot;
            </p>
            <p className="text-sm text-muted-foreground">
              Try searching for different keywords or browse our categories
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-8"><p>Loading...</p></div>}>
      <SearchContent />
    </Suspense>
  );
}