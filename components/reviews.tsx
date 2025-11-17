import { Star } from 'lucide-react'
import Image from 'next/image'
import Script from 'next/script'
import { useScrollTracking } from '@/hooks/use-scroll-tracking'

const reviews = [
  {
    name: '김민지',
    role: '회사원',
    rating: 5,
    comment: '정말 친절하고 디자인도 최고에요! 새로운 헤어스타일로 자신감이 생겼어요.',
    image: '/profile-woman.png',
    source: '네이버',
    date: '2024.11.15',
  },
  {
    name: '이준호',
    role: '학생',
    rating: 5,
    comment: '상담부터 시술까지 전문적이었고 결과도 만족합니다. 계속 올 것 같아요!',
    image: '/profile-man.png',
    source: '카카오',
    date: '2024.11.10',
  },
  {
    name: '박소연',
    role: '프리랜서',
    rating: 5,
    comment: '매번 새로운 스타일로 변신하는데 항상 잘 나와요. UNIHAIR이 최고!',
    image: '/profile-woman.png',
    source: '구글',
    date: '2024.11.05',
  },
]

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://unihair.com'

// Review 스키마 생성 함수
function generateReviewSchema() {
  return reviews.map((review, index) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${siteUrl}#review-${index + 1}`,
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'UNIHAIR',
      '@id': `${siteUrl}#localbusiness`,
    },
    author: {
      '@type': 'Person',
      name: review.name,
    },
    datePublished: review.date ? new Date(review.date.replace(/\./g, '-')).toISOString() : new Date().toISOString(),
    reviewBody: review.comment,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
  }))
}

export default function Reviews() {
  const reviewSchemas = generateReviewSchema()
  const sectionRef = useScrollTracking('reviews')

  return (
    <section ref={sectionRef} id="reviews" className="py-16 sm:py-24 bg-secondary/10">
      {/* Review 스키마 JSON-LD */}
      {reviewSchemas.map((schema, index) => (
        <Script
          key={`review-schema-${index}`}
          id={`review-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            고객 후기
          </h2>
          <p className="text-lg text-muted-foreground">
            실제 고객님들의 만족한 모습을 보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={review.image || "/placeholder.svg"}
                    alt={review.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {Array(review.rating).fill(0).map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                {review.source && (
                  <span className="text-xs text-muted-foreground bg-secondary/30 px-2 py-1 rounded">
                    {review.source}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">{review.comment}</p>
              {review.date && (
                <p className="text-xs text-muted-foreground/70">{review.date}</p>
              )}
            </div>
          ))}
        </div>

        {/* SNS Links */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground mb-6">더 많은 후기와 스타일을 보세요</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://www.instagram.com/unihair" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition"
            >
              Instagram
            </a>
            <a 
              href="https://blog.naver.com/unihair" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition"
            >
              Naver Blog
            </a>
            <a 
              href="https://story.kakao.com/unihair" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition"
            >
              Kakao Story
            </a>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            * SNS 링크는 실제 계정으로 업데이트해주세요
          </p>
        </div>
      </div>
    </section>
  )
}
