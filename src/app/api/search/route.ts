import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const limit = searchParams.get("limit");
    
    if (!q.trim()) {
      return NextResponse.json([]);
    }
    
    let query = q.trim().toLowerCase();
    
    // Normalize plural/singular forms
    query = query.replace(/s\b/g, '').trim();
    
    // Extract price filter from query (e.g., "under 10000", "below 5000")
    const priceMatch = query.match(/(?:under|below|less than)\s*(\d+)/);
    const maxPrice = priceMatch ? parseInt(priceMatch[1]) : null;
    
    // Remove price filter from search query
    const cleanQuery = query.replace(/(?:under|below|less than)\s*\d+/g, '').trim();
    
    const whereClause: any = {
      status: 'active'
    };
    
    if (cleanQuery) {
      const words = cleanQuery.split(/\s+/).filter(w => w.length >= 3);
      
      if (words.length > 0) {
        whereClause.OR = words.flatMap(word => [
          { name: { contains: word, mode: 'insensitive' } },
          { category: { contains: word, mode: 'insensitive' } },
          { brand: { contains: word, mode: 'insensitive' } },
          { description: { contains: word, mode: 'insensitive' } },
          { sku: { contains: word, mode: 'insensitive' } }
        ]);
      } else if (cleanQuery.length >= 3) {
        whereClause.OR = [
          { name: { contains: cleanQuery, mode: 'insensitive' } },
          { category: { contains: cleanQuery, mode: 'insensitive' } },
          { brand: { contains: cleanQuery, mode: 'insensitive' } },
          { description: { contains: cleanQuery, mode: 'insensitive' } },
          { sku: { contains: cleanQuery, mode: 'insensitive' } }
        ];
      }
    }
    
    if (maxPrice) {
      whereClause.price = { lte: maxPrice };
    }
    
    let results = await prisma.product.findMany({
      where: whereClause,
      take: limit ? parseInt(limit) : undefined
    });
    
    // Sort by relevance: count matching words
    if (cleanQuery) {
      const queryWords = cleanQuery.toLowerCase().split(/\s+/).filter(w => w.length >= 3);
      
      results = results.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        
        // Count how many query words match
        const aMatches = queryWords.filter(word => aName.includes(word)).length;
        const bMatches = queryWords.filter(word => bName.includes(word)).length;
        
        if (aMatches !== bMatches) return bMatches - aMatches;
        
        // Check exact phrase match
        const aExact = aName.includes(cleanQuery) ? 1 : 0;
        const bExact = bName.includes(cleanQuery) ? 1 : 0;
        if (aExact !== bExact) return bExact - aExact;
        
        return maxPrice ? a.price - b.price : 0;
      });
    } else if (maxPrice) {
      results = results.sort((a, b) => a.price - b.price);
    }
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json([]);
  }
}