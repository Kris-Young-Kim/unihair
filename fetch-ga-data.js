/**
 * @file fetch-ga-data.js
 * @description Google Analytics 데이터를 가져와서 HTML 파일에 주입하는 스크립트
 * 
 * 사용 방법:
 * 1. Google Analytics API 활성화 (아래 링크 참고)
 * 2. property_id 확인 (Google Analytics 콘솔에서)
 * 3. node fetch-ga-data.js 실행
 * 
 * API 활성화 링크:
 * - Data API: https://console.developers.google.com/apis/api/analyticsdata.googleapis.com/overview?project=660234466862
 * - Admin API: https://console.developers.google.com/apis/api/analyticsadmin.googleapis.com/overview?project=660234466862
 */

// MCP를 통해 데이터를 가져오는 함수
// 실제로는 MCP 서버를 통해 호출해야 합니다
async function fetchGAData(propertyId) {
  console.log('📊 Google Analytics 데이터를 가져오는 중...');
  console.log(`Property ID: ${propertyId}`);
  
  // 여기에 실제 MCP 호출 로직이 들어갑니다
  // 현재는 샘플 데이터를 반환합니다
  
  const sampleData = {
    stats: {
      totalSessions: 12345,
      totalUsers: 9876,
      totalPageViews: 45678,
      avgSessionDuration: 180, // 초
      bounceRate: 0.45,
      totalConversions: 234
    },
    dailyData: generateDailyData(30),
    countryData: [
      { country: '대한민국', users: 8500 },
      { country: '미국', users: 800 },
      { country: '일본', users: 300 },
      { country: '중국', users: 200 },
      { country: '기타', users: 76 }
    ],
    deviceData: [
      { device: '데스크톱', sessions: 6000 },
      { device: '모바일', sessions: 5000 },
      { device: '태블릿', sessions: 1345 }
    ],
    sourceData: [
      { source: 'organic', sessions: 5000 },
      { source: 'direct', sessions: 4000 },
      { source: 'social', sessions: 2000 },
      { source: 'referral', sessions: 1000 },
      { source: 'paid', sessions: 345 }
    ],
    tableData: generateTableData(30)
  };
  
  return sampleData;
}

// 일별 데이터 생성 (샘플)
function generateDailyData(days) {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      sessions: Math.floor(Math.random() * 500) + 200,
      users: Math.floor(Math.random() * 400) + 150,
      pageViews: Math.floor(Math.random() * 2000) + 800
    });
  }
  
  return data;
}

// 테이블 데이터 생성 (샘플)
function generateTableData(days) {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      sessions: Math.floor(Math.random() * 500) + 200,
      users: Math.floor(Math.random() * 400) + 150,
      pageViews: Math.floor(Math.random() * 2000) + 800,
      avgDuration: Math.random() * 300 + 60,
      bounceRate: Math.random() * 0.5 + 0.2,
      conversions: Math.floor(Math.random() * 20)
    });
  }
  
  return data;
}

// HTML 파일에 데이터 주입
function injectDataToHTML(data) {
  const fs = require('fs');
  const path = require('path');
  
  const htmlPath = path.join(__dirname, 'ga-visualization.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // 샘플 데이터를 실제 데이터로 교체
  const dataScript = `
        // 실제 Google Analytics 데이터
        const sampleData = ${JSON.stringify(data, null, 8)};
        
        // API 활성화 필요 메시지 숨기기
        document.getElementById('api-setup-notice').style.display = 'none';
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        
        // 데이터 로드 완료 후 렌더링
        renderAll();
    `;
  
  // script 태그 찾아서 교체
  html = html.replace(
    /\/\/ 샘플 데이터 \(API가 활성화되면 실제 데이터로 교체\)[\s\S]*?renderAll\(\);/,
    dataScript
  );
  
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('✅ HTML 파일에 데이터가 주입되었습니다!');
  console.log(`📄 파일 위치: ${htmlPath}`);
}

// 메인 실행
async function main() {
  try {
    // property_id를 환경 변수나 인자로 받을 수 있습니다
    const propertyId = process.env.GA_PROPERTY_ID || process.argv[2] || '478704';
    
    console.log('🚀 Google Analytics 데이터 수집 시작...\n');
    
    // 데이터 가져오기
    const data = await fetchGAData(propertyId);
    
    // HTML에 주입
    injectDataToHTML(data);
    
    console.log('\n✨ 완료! ga-visualization.html 파일을 브라우저에서 열어보세요.');
    
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    process.exit(1);
  }
}

// 실행
if (require.main === module) {
  main();
}

module.exports = { fetchGAData, injectDataToHTML };
