'use client'

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">UNIHAIR</h3>
            <p className="text-sm text-white/70">
              당신의 새로운 스타일을 완성하는 프리미엄 헤어살롱
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">빠른 메뉴</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-white/70 transition">서비스</a></li>
              <li><a href="#reviews" className="hover:text-white/70 transition">후기</a></li>
              <li><a href="#team" className="hover:text-white/70 transition">스타일리스트</a></li>
              <li><a href="#location" className="hover:text-white/70 transition">위치</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">SNS</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white/70 transition">Instagram</a></li>
              <li><a href="#" className="hover:text-white/70 transition">Naver Blog</a></li>
              <li><a href="#" className="hover:text-white/70 transition">Kakao Story</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">연락처</h4>
            <p className="text-sm">📞 02-1234-5678</p>
            <p className="text-sm">📍 서울시 강남구 테헤란로 123</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-sm text-white/50">
            © 2025 UNIHAIR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
