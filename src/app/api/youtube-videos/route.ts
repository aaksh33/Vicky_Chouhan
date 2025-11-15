import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.setting.findUnique({ where: { tag: 'youtubeVideos' } })
    const videoLinks = settings?.data || []
    
    if (!Array.isArray(videoLinks) || videoLinks.length === 0) {
      return NextResponse.json({ videos: [] })
    }

    const videos = videoLinks.map((link: any) => {
      const videoId = extractVideoId(link.url)
      return {
        id: videoId || link.id,
        title: '',
        thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '',
        url: link.url
      }
    }).filter((v: any) => v.id)

    return NextResponse.json({ videos })
  } catch (error) {
    console.error('YouTube videos error:', error)
    return NextResponse.json({ videos: [] })
  }
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  
  return null
}
