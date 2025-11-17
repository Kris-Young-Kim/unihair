'use client'

import Image from 'next/image'

const team = [
  {
    name: '이상미',
    position: '원장 / 수석 스타일리스트',
    specialty: '헤어컷, 컬러, 펌 전문',
    experience: '15년 경력',
    image: '/professional-hairstylist-woman.jpg',
  },
  {
    name: '박진호',
    position: '스타일리스트',
    specialty: '남성 헤어스타일, 펌 전문',
    experience: '8년 경력',
    image: '/professional-hairstylist-man.jpg',
  },
  {
    name: '정하늘',
    position: '컬러 스페셜리스트',
    specialty: '헤어 컬러, 케어 전문',
    experience: '6년 경력',
    image: '/professional-hairstylist-woman.jpg',
  },
]

export default function Team() {
  return (
    <section id="team" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            전문가 팀
          </h2>
          <p className="text-lg text-muted-foreground">
            UNIHAIR의 숙련된 스타일리스트들
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-64 rounded-xl overflow-hidden mb-4 shadow-md">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-primary font-semibold mb-2">{member.position}</p>
              <p className="text-sm text-muted-foreground mb-1">{member.specialty}</p>
              <p className="text-sm text-muted-foreground">{member.experience}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
