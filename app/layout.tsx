import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import Script from 'next/script'
import './globals.css'

// 사이트 기본 URL (환경 변수 또는 실제 도메인으로 교체 필요)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unihair.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'UNIHAIR - 프리미엄 헤어살롱',
    template: '%s | UNIHAIR',
  },
  description: 'UNIHAIR에서 당신의 새로운 헤어스타일을 완성하세요. 트렌디한 헤어컷, 컬러, 펌 서비스. 1:1 맞춤상담과 온라인 예약',
  keywords: ['미용실', '헤어살롱', '헤어컷', '컬러', '펌', '예약', '강남 미용실', '프리미엄 헤어살롱', 'UNIHAIR'],
  authors: [{ name: 'UNIHAIR' }],
  creator: 'UNIHAIR',
  publisher: 'UNIHAIR',
  generator: 'Next.js',
  applicationName: 'UNIHAIR',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: 'UNIHAIR',
    title: 'UNIHAIR - 프리미엄 헤어살롱',
    description: 'UNIHAIR에서 당신의 새로운 헤어스타일을 완성하세요. 트렌디한 헤어컷, 컬러, 펌 서비스. 1:1 맞춤상담과 온라인 예약',
    images: [
      {
        url: '/og-image.jpg', // 1200x630px 권장
        width: 1200,
        height: 630,
        alt: 'UNIHAIR 프리미엄 헤어살롱',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNIHAIR - 프리미엄 헤어살롱',
    description: 'UNIHAIR에서 당신의 새로운 헤어스타일을 완성하세요. 트렌디한 헤어컷, 컬러, 펌 서비스.',
    images: ['/og-image.jpg'],
    creator: '@unihair', // 실제 트위터 계정으로 교체
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Google Search Console, Naver Search Advisor 등 검증 코드 추가 가능
    // google: 'your-google-verification-code',
    // other: {
    //   'naver-site-verification': 'your-naver-verification-code',
    // },
  },
}

// JSON-LD 스키마 데이터
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UNIHAIR',
  description: '프리미엄 헤어살롱 - 트렌디한 헤어컷, 컬러, 펌 서비스',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-image.jpg`,
  telephone: '02-1234-5678',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '테헤란로 123',
    addressLocality: '강남구',
    addressRegion: '서울특별시',
    addressCountry: 'KR',
  },
  sameAs: [
    // 실제 SNS 링크로 교체 필요
    // 'https://www.instagram.com/unihair',
    // 'https://www.facebook.com/unihair',
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}#localbusiness`,
  name: 'UNIHAIR',
  image: `${siteUrl}/og-image.jpg`,
  description: '프리미엄 헤어살롱 - 트렌디한 헤어컷, 컬러, 펌 서비스',
  url: siteUrl,
  telephone: '02-1234-5678',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '테헤란로 123',
    addressLocality: '강남구',
    addressRegion: '서울특별시',
    postalCode: '06142',
    addressCountry: 'KR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.4979, // 실제 좌표로 교체 필요
    longitude: 127.0276, // 실제 좌표로 교체 필요
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '19:00',
    },
  ],
  servesCuisine: false, // 미용실이므로 false
  acceptsReservations: true,
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'UNIHAIR',
  url: siteUrl,
  description: 'UNIHAIR 프리미엄 헤어살롱 공식 웹사이트',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        {/* JSON-LD 스키마 */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="localbusiness-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
