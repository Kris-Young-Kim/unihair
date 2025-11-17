import { MetadataRoute } from 'next'

/**
 * @file app/sitemap.ts
 * @description Next.js 15 동적 사이트맵 생성
 *
 * 검색 엔진이 사이트의 모든 페이지를 크롤링할 수 있도록 사이트맵을 제공합니다.
 * Next.js 15의 MetadataRoute를 사용하여 동적으로 생성됩니다.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unihair.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl

  // 정적 페이지 목록
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    // 향후 추가 페이지가 있다면 여기에 추가
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.8,
    // },
  ]

  return routes
}

