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
    { value: '10+', label: '동시 관제 로봇' },
    { value: '0', label: '설치 — 브라우저만으로' },
    { value: '60분', label: '연속 운행 녹화' },
    { value: '12종', label: '실시간 이상 신호 감지' },
  ],
  intel: {
    eyebrow: 'INTELLIGENT OPERATIONS',
    title: '지켜보는 건 시스템. 결정하는 건 운영자.',
    anomaly: {
      kicker: '실시간 이상 신호 감지',
      title: '이상 신호는 숨지 못합니다.',
      body: '배터리 부족, 긴급 정지, 위치 추정 실패부터 정체와 작업 지연까지 — 12종의 이상 신호를 실시간으로 감지해 즉시 알립니다. 운영자가 화면을 보고 있지 않아도.',
      alerts: [
        { level: 'critical', title: '긴급 정지 — robot_0', meta: '12초 전 · emg_state = 1' },
        { level: 'warning', title: '배터리 부족 — robot_2', meta: '배터리 18% · 임계값 20%' },
        { level: 'warning', title: '위치추정 신뢰도 저하 — robot_3', meta: 'converged = false' },
      ],
    },
    copilot: {
      kicker: '관제 파일럿',
      title: '플릿에게 직접 물어보세요.',
      body: '관제 파일럿이 실시간 플릿 데이터를 읽고 자연어로 답합니다. 로봇 상태, 작업 진행, 이상 징후까지 — 대시보드를 뒤지는 대신 한 줄로 질문하세요.',
      chat: [
        { role: 'user', text: 'robot_2 지금 상태 어때?' },
        { role: 'bot', text: 'robot_2는 픽업-4 → 배달-21 작업을 운행 중입니다. 배터리 71%, 위치추정 정상, 최근 5분간 이상 신호 없음.' },
        { role: 'user', text: '배터리 가장 낮은 로봇은?' },
        { role: 'bot', text: 'robot_0이 23%로 가장 낮습니다. 약 40분 운행 가능 — 충전 스테이션 복귀를 권장합니다.' },
      ],
      hint: 'Ctrl + / 로 어디서든 호출',
    },
  },
  grid: {
    eyebrow: 'AND MORE',
    title: '관제실에 필요한 나머지 전부.',
    items: [
      { title: '실시간 카메라', body: '로봇 탑재 카메라 영상을 카드와 지도에서 바로 스트리밍합니다.' },
      { title: '작업 모니터링', body: '로봇별 작업 할당과 진행률, 수행 이력을 실시간으로 추적합니다.' },
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
