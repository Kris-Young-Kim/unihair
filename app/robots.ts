import { MetadataRoute } from 'next'

/**
 * @file app/robots.txt
 * @description Next.js 15 동적 robots.txt 생성
 *
 * 검색 엔진 크롤러가 사이트를 크롤링하는 방법을 지시합니다.
 * Next.js 15의 MetadataRoute를 사용하여 동적으로 생성됩니다.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unihair.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', // API 라우트는 크롤링 제외
          '/admin/', // 관리자 페이지가 있다면 제외
        ],
      },
      // Googlebot에 대한 특별 규칙 (필요시)
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    // host: siteUrl, // 선택적: 호스트 정보
  }
}

