import type { Dict } from './types';

export const ko = {
  meta: {
    title: 'Omnifleet — 다중 로봇 관제 시스템',
    description:
      'ROS 2 로봇 플릿을 웹 브라우저 하나로. 실시간 지도 관제, 플릿 대시보드, 안전 제어, 녹화·리플레이까지 — Omnifleet 다중 로봇 관제 시스템.',
  },
  nav: { contact: '도입 문의', langToggle: 'EN', langLabel: 'Switch to English' },
  hero: {
    eyebrow: 'MULTI-ROBOT FLEET CONTROL',
    title1: '모든 로봇.',
    title2: '하나의 화면.',
    sub: 'Omnifleet은 ROS 2 로봇 플릿을 설치 없이 웹 브라우저 하나로 모니터링하고 제어하는 다중 로봇 관제 시스템입니다.',
    scrollHint: 'SCROLL',
  },
  showcase: {
    features: [
      {
        kicker: '실시간 지도 관제',
        title: '플릿 전체가 지도 위에. 실시간으로.',
        body: '점유 격자 지도 위에서 모든 로봇의 현재 위치, 계획 경로, 목표 지점이 실시간으로 갱신됩니다. 줌·팬·로봇 선택까지, 관제에 필요한 모든 시야를 한 화면에서.',
      },
      {
        kicker: '플릿 대시보드',
        title: '묻기 전에 먼저 보이는 상태.',
        body: '로봇별 배터리, 작업 할당, 위치추정 신뢰도를 카드와 KPI로 집계합니다. 플릿의 이상 징후가 숫자보다 빨리 눈에 들어옵니다.',
      },
      {
        kicker: '제어와 안전',
        title: '긴급정지까지, 한 번의 클릭.',
        body: '지도 클릭 또는 저장된 위치로 네비게이션 목표를 전송하고, 비상 상황에는 즉시 로봇을 정지시킵니다. 배터리·긴급정지·위치추정 이벤트는 실시간 알림으로.',
      },
      {
        kicker: '녹화와 리플레이',
        title: '지나간 운행을 다시 재생.',
        body: '운행 데이터를 녹화하고 타임라인으로 되감아 분석합니다. 이벤트 로그와 궤적을 지도 위에 다시 그려, 현장에서 일어난 일을 그대로 확인합니다.',
      },
    ],
  },
  stats: [
    { value: '4+', label: '동시 관제 로봇' },
    { value: '0', label: '설치 — 브라우저만으로' },
    { value: '60분', label: '연속 운행 녹화' },
    { value: '2', label: '지도 소스 모드' },
  ],
  grid: {
    eyebrow: 'AND MORE',
    title: '관제실에 필요한 나머지 전부.',
    items: [
      { title: 'AI 코파일럿', body: '플릿 상태를 자연어로 묻고 답을 받습니다. 관제 데이터를 읽는 가장 빠른 방법.' },
      { title: '실시간 이벤트 알림', body: '배터리 부족, 긴급정지, 위치추정 이상을 즉시 감지해 알립니다.' },
      { title: '관제 로그', body: '작업 진행과 이벤트를 로봇별로 기록하고 필터링합니다.' },
      { title: '운영자 계정', body: '운영자별 로그인과 계정 관리. 교대 근무에도 깔끔하게.' },
      { title: '한/영 운영 UI', body: '관제 화면 언어를 운영자가 직접 전환합니다.' },
      { title: '모바일·태블릿 대응', body: '데스크톱 관제실부터 현장의 태블릿까지 같은 화면으로.' },
    ],
  },
  env: {
    eyebrow: 'WORKS WITH YOUR ROBOTS',
    title: '로봇 코드 수정 없이, rosbridge 하나로.',
    body: 'ROS 2 로봇이라면 rosbridge WebSocket 하나만 띄우면 연결됩니다. 펌웨어·노드 수정 없이 LAN, VPN, Tailscale 어디서든.',
    diagram: { robots: 'ROS 2 로봇', bridge: 'rosbridge', browser: '웹 브라우저' },
    chips: ['ROS 2', 'rosbridge_suite', '토픽 구독 맵 모드', '로컬 이미지 맵 모드', 'LAN · VPN · Tailscale', 'Chrome · Edge · Safari'],
  },
  cta: {
    title: 'Omnifleet을 현장에서.',
    sub: '데모와 도입 상담을 도와드립니다.',
    button: '도입 문의하기',
    mailSubject: 'Omnifleet 도입 문의',
    copyright: '© 2026 Omnifleet. All rights reserved.',
  },
} satisfies Dict;
