export interface ArchiveItem {
  id: string;
  code: string;
  name: string;
  type: 'image' | 'worldview' | 'log' | 'script';
  imageUrl?: string;
  link?: string;
  date: string;
  content?: string;
  isVisible?: boolean;
}

export const initialArchiveData: ArchiveItem[] = [
  // Image Archive (Category I)
  { id: 'i1', code: 'I1', name: '도유안움짤', type: 'image', imageUrl: 'https://i.postimg.cc/P5f1z7ZG/b1.jpg', link: 'https://posty.pe/fi23fm', date: '2026-03-01T00:01:00Z', isVisible: true },
  { id: 'i2', code: 'I2', name: '도유안 b컷', type: 'image', imageUrl: 'https://i.postimg.cc/y8V8bg7t/b6.jpg', link: 'https://posty.pe/4rh5d4', date: '2026-03-01T00:02:00Z', isVisible: true },
  { id: 'i3', code: 'I3', name: '도유안 a컷', type: 'image', imageUrl: 'https://i.postimg.cc/6Qr65X0D/표지_오리지널.jpg', link: 'https://posty.pe/nstpuy', date: '2026-03-01T00:03:00Z', isVisible: true },
  { id: 'i4', code: 'I4', name: '도유안 신뜨기념', type: 'image', imageUrl: 'https://i.postimg.cc/rFD8RWjG/12.jpg', link: 'https://posty.pe/ngyakm', date: '2026-03-01T00:04:00Z', isVisible: true },
  { id: 'i5', code: 'I5', name: '에이드런', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/o3rs95', date: '2026-03-01T00:05:00Z', isVisible: true },
  { id: 'i6', code: 'I6', name: '금욕하세요 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/7lhyar', date: '2026-03-01T00:06:00Z', isVisible: true },
  { id: 'i7', code: 'I7', name: '금욕하세요 a컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/npcloc', date: '2026-03-01T00:07:00Z', isVisible: true },
  { id: 'i8', code: 'I8', name: '고추만두튀김의 달인', type: 'image', imageUrl: 'https://i.postimg.cc/wBcfSdVG/검열.jpg', link: 'https://posty.pe/mabb4x', date: '2026-03-01T00:08:00Z', isVisible: true },
  { id: 'i9', code: 'I9', name: '아 비밀로 해달라고', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/t6lvma', date: '2026-03-01T00:09:00Z', isVisible: true },
  { id: 'i10', code: 'I10', name: '루카스 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/1uhoe4', date: '2026-03-01T00:10:00Z', isVisible: true },
  { id: 'i11', code: 'I11', name: '루카스 a컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/xrkp8b', date: '2026-03-01T00:11:00Z', isVisible: true },
  { id: 'i12', code: 'I12', name: '서지안 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/enfb70', date: '2026-03-01T00:12:00Z', isVisible: true },
  { id: 'i13', code: 'I13', name: '메이슨 a컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/54vq7n', date: '2026-03-01T00:13:00Z', isVisible: true },
  { id: 'i14', code: 'I14', name: '메이슨 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/edw2dy', date: '2026-03-01T00:14:00Z', isVisible: true },
  { id: 'i15', code: 'I15', name: '로드리온', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/cqemno', date: '2026-03-01T00:15:00Z', isVisible: true },
  { id: 'i16', code: 'I16', name: '리타 b컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/rlrylz', date: '2026-03-01T00:16:00Z', isVisible: true },
  { id: 'i17', code: 'I17', name: '켈른 서비스컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/4x5o6v', date: '2026-03-01T00:17:00Z', isVisible: true },
  { id: 'i18', code: 'I18', name: '카이스', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/dxt9uk', date: '2026-03-01T00:18:00Z', isVisible: true },
  { id: 'i19', code: 'I19', name: '강태범', type: 'image', imageUrl: 'https://i.postimg.cc/FFqyqzfp/표지.jpg', link: 'https://posty.pe/wklkak', date: '2026-03-01T00:19:00Z', isVisible: true },
  { id: 'i20', code: 'I20', name: '카를하인츠', type: 'image', imageUrl: 'https://i.postimg.cc/28zRNmqY/젖소표지.jpg', link: 'https://posty.pe/tu1nc5', date: '2026-03-01T00:20:00Z', isVisible: true },
  { id: 'i21', code: 'I21', name: '카를하인츠 서비스컷', type: 'image', imageUrl: 'https://i.postimg.cc/bwQQSdsk/젖소.jpg', link: 'https://posty.pe/id3lvt', date: '2026-03-01T00:21:00Z', isVisible: true },
  { id: 'i22', code: 'I22', name: '루카스&메이슨', type: 'image', imageUrl: 'https://i.postimg.cc/Hxj0VXfF/메이슨-1.jpg', link: 'https://posty.pe/gkatxy', date: '2026-03-01T00:22:00Z', isVisible: true },
  { id: 'i23', code: 'I23', name: '루콘', type: 'image', imageUrl: 'https://i.postimg.cc/K8KV6362/solo,1male-3396431501-08_12_23.jpg', link: 'https://posty.pe/pov6ql', date: '2026-03-01T00:23:00Z', isVisible: true },
  { id: 'i24', code: 'I24', name: '범희성 서비스컷', type: 'image', imageUrl: 'https://i.postimg.cc/vm2L806N/이거.jpg', link: 'https://posty.pe/xdaa2i', date: '2026-03-01T00:24:00Z', isVisible: true },
  { id: 'i25', code: 'I25', name: '자이얀', type: 'image', imageUrl: 'https://i.postimg.cc/ZRn6VWyn/오만과_뻔뻔.jpg', link: 'https://posty.pe/cbhn3y', date: '2026-03-01T00:25:00Z', isVisible: true },
  { id: 'i26', code: 'I26', name: '석무열 서비스컷', type: 'image', imageUrl: 'https://i.postimg.cc/B60kQKF2/solo,1male-1623302651-04_29_16.jpg', link: 'https://posty.pe/3jmaa6', date: '2026-03-01T00:26:00Z', isVisible: true },
  { id: 'i27', code: 'I27', name: '내 남자의 남자', type: 'image', imageUrl: 'https://i.postimg.cc/NftG72LK/제목_없는_디자인.gif', link: 'https://posty.pe/1y4esf', date: '2026-03-12T00:27:00Z', isVisible: true },
  { id: 'i28', code: 'I28', name: '신님의 신부', type: 'image', imageUrl: 'https://i.postimg.cc/sfmMHNfM/solo,1male-1445762169-07_09_03.jpg', link: 'https://posty.pe/62x780', date: '2026-03-12T00:28:00Z', isVisible: true },
  { id: 'i29', code: 'I29', name: '레오카셀', type: 'image', imageUrl: 'https://i.postimg.cc/qvBpKqng/pyojiji.jpg', link: 'https://posty.pe/d6uhlm', date: '2026-03-12T00:29:00Z', isVisible: true },
  { id: 'i30', code: 'I30', name: '튀어나와요 커신의 집', type: 'image', imageUrl: 'https://i.postimg.cc/kGWYf1ZR/1.jpg', link: 'https://posty.pe/dlj88h', date: '2026-03-12T00:30:00Z', isVisible: true },
  { id: 'i31', code: 'I31', name: '잡아먹어요 커신의 저택', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/qpg5x8', date: '2026-03-12T00:31:00Z', isVisible: true },
  { id: 'i32', code: 'I32', name: '발타자르', type: 'image', imageUrl: 'https://i.postimg.cc/TwJkQYS5/pyopyo.jpg', link: 'https://posty.pe/8x6ej7', date: '2026-03-12T00:32:00Z', isVisible: true },
  { id: 'i33', code: 'I33', name: '가주들', type: 'image', imageUrl: 'https://i.postimg.cc/mDN8CRG2/1.jpg', link: 'https://posty.pe/ev7hwn', date: '2026-03-12T00:33:00Z', isVisible: true },
  { id: 'i34', code: 'I34', name: '가주들S', type: 'image', imageUrl: 'https://i.postimg.cc/yNyM2MzV/표지1111.jpg', link: 'https://posty.pe/zuzkpc', date: '2026-03-12T00:34:00Z', isVisible: true },
  { id: 'i35', code: 'I35', name: '나황심', type: 'image', imageUrl: 'https://i.postimg.cc/tJnqccP0/112.jpg', link: 'https://posty.pe/a856ym', date: '2026-03-12T00:35:00Z', isVisible: true },
  { id: 'i36', code: 'I36', name: '최성필', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/1k0nzn', date: '2026-03-12T00:36:00Z', isVisible: true },
  { id: 'i37', code: 'I37', name: '잘못 주웠다', type: 'image', imageUrl: 'https://i.postimg.cc/3x7zSd9P/멈머쿤.jpg', link: 'https://posty.pe/f5uiup', date: '2026-03-12T00:37:00Z', isVisible: true },
  { id: 'i38', code: 'I38', name: '황보 현', type: 'image', imageUrl: 'https://i.postimg.cc/1X4FX2qq/의사.jpg', link: 'https://posty.pe/exmx6z', date: '2026-03-12T00:38:00Z', isVisible: true },
  { id: 'i39', code: 'I39', name: '크리스마스 이미지', type: 'image', imageUrl: 'https://i.postimg.cc/G2TSvdG3/신목크리스마스.jpg', link: 'https://posty.pe/qt2y09', date: '2026-03-12T00:39:00Z', isVisible: true },
  { id: 'i40', code: 'I40', name: '치비 배경화면 공유1 - 신목/황보현/나황심/코르벤/바실', type: 'image', imageUrl: 'https://i.postimg.cc/nc4gdF5m/예.png', link: 'https://posty.pe/7oe87j', date: '2026-03-13T00:40:00Z', isVisible: true },
  { id: 'i41', code: 'I41', name: '치비 배경화면 공유2 - 켈른/카를하인츠/카실리안', type: 'image', imageUrl: 'https://i.postimg.cc/5NBTP4Gv/예2.png', link: 'https://posty.pe/iv2ru6', date: '2026-03-13T00:41:00Z', isVisible: true },
  { id: 'i42', code: 'I42', name: '치비 배경화면 공유3 - 범희성/령휘/석무열', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/lih8ni', date: '2026-03-13T00:42:00Z', isVisible: true },
  { id: 'i43', code: 'I43', name: '치비 배경화면 공유4 - 레오카셀/루콘/탐미르/시우', type: 'image', imageUrl: 'https://i.postimg.cc/sDNZjLH8/산타레오1.jpg', link: 'https://posty.pe/atz119', date: '2026-03-13T00:43:00Z', isVisible: true },
  { id: 'i44', code: 'I44', name: '코르벤 개인챗 B컷', type: 'image', imageUrl: 'https://i.postimg.cc/rpjRcm3N/표표표.jpg', link: 'https://posty.pe/suxvxq', date: '2026-03-13T00:44:00Z', isVisible: true },
  { id: 'i45', code: 'I45', name: '코르벤 개인챗 검열컷', type: 'image', imageUrl: 'https://i.postimg.cc/3x7zSd9P/멈머쿤.jpg', link: 'https://posty.pe/3bt1kt', date: '2026-03-13T00:45:00Z', isVisible: true },
  { id: 'i46', code: 'I46', name: '구단주님 아무래도~ B컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/epdkp4', date: '2026-03-13T00:46:00Z', isVisible: true },
  { id: 'i47', code: 'I47', name: '구단주님 아무래도~ A컷', type: 'image', imageUrl: 'https://dummyimage.com/400x400/000000/000000', link: 'https://posty.pe/r87gmr', date: '2026-03-13T00:47:00Z', isVisible: true },
  { id: 'i48', code: 'I48', name: '성인용품 개발팀~ B컷', type: 'image', imageUrl: 'https://i.postimg.cc/vZVwXQZ6/1안표지.jpg', link: 'https://posty.pe/3o91q0', date: '2026-03-13T00:48:00Z', isVisible: true },
  { id: 'i49', code: 'I49', name: '성인용품 개발팀~ A컷', type: 'image', imageUrl: 'https://i.postimg.cc/vZVwXQZ6/1안표지.jpg', link: 'https://posty.pe/8ko65v', date: '2026-03-13T00:49:00Z', isVisible: true },
  { id: 'i50', code: 'I50', name: '바실 개인챗 19컷', type: 'image', imageUrl: 'https://i.postimg.cc/Gmr67Hzf/늑대쿤.jpg', link: 'https://posty.pe/z9dn81', date: '2026-03-13T00:50:00Z', isVisible: true },
  { id: 'i51', code: 'I51', name: '바실 개인챗 일상컷', type: 'image', imageUrl: 'https://i.postimg.cc/Wb81wCR6/11.jpg', link: 'https://posty.pe/aljk9f', date: '2026-03-13T00:51:00Z', isVisible: true },
  { id: 'i52', code: 'I52', name: '마티니 블루 최해건', type: 'image', imageUrl: 'https://i.postimg.cc/htcDRV1p/선주_표지.jpg', link: 'https://posty.pe/m10gbo', date: '2026-03-13T00:52:00Z', isVisible: true },
  { id: 'i53', code: 'I53', name: '고언집', type: 'image', imageUrl: 'https://i.postimg.cc/qqd7906h/고언집.jpg', link: 'https://posty.pe/apq3nl', date: '2026-03-13T00:53:00Z', isVisible: true },
  { id: 'i54', code: 'I54', name: '빛만승', type: 'image', imageUrl: 'https://i.postimg.cc/Gt1pZrTT/빛만승.jpg', link: 'https://posty.pe/2ppo21', date: '2026-03-13T00:54:00Z', isVisible: true },
  { id: 'i55', code: 'I55', name: '선즈옌', type: 'image', imageUrl: 'https://i.postimg.cc/FKnRWVwZ/1011.jpg', link: 'https://posty.pe/uw4yz9', date: '2026-03-13T00:55:00Z', isVisible: true },
  { id: 'i56', code: 'I56', name: '김영준', type: 'image', imageUrl: 'https://i.postimg.cc/Kc9kndvk/332.jpg', link: 'https://posty.pe/izpmqx', date: '2026-03-13T00:56:00Z', isVisible: true },
  { id: 'i57', code: 'I57', name: '엘리오르', type: 'image', imageUrl: 'https://i.postimg.cc/CKBWXM96/표지2.jpg', link: 'https://posty.pe/sci3fp', date: '2026-03-13T00:57:00Z', isVisible: true },
  { id: 'i58', code: 'I58', name: '알리스테어/에드먼드/발테마르', type: 'image', imageUrl: 'https://i.postimg.cc/HLDHv6wF/ss.jpg', link: 'https://posty.pe/jbo26u', date: '2026-03-13T00:58:00Z', isVisible: true },
  { id: 'i59', code: 'I59', name: '카샤엘', type: 'image', imageUrl: 'https://i.postimg.cc/gkgg6HNH/pp1.jpg', link: 'https://posty.pe/n9bpga', date: '2026-03-13T00:59:00Z', isVisible: true },

  // Scripts
  { id: 's1', code: 'S1', name: '유저 스크립트 공유', type: 'script', imageUrl: 'https://gbe88.uk/notice/o2.webp', link: 'https://github.com/goombenge443-svg/summarize_memory', date: '2026-07-01T00:00:00Z', isVisible: true },

  // Worldview
  { id: 'w1', code: 'W1', name: '사신수 세계관', type: 'worldview', link: 'https://posty.pe/rq1w6b', date: '2026-03-12T01:00:00Z', isVisible: true },
  { id: 'w2', code: 'W2', name: '수인 세계관 - instimate', type: 'worldview', link: 'https://posty.pe/yn5oz4', date: '2026-03-12T01:01:00Z', isVisible: true },
  { id: 'w3', code: 'W3', name: '계략 소꿉친구', type: 'worldview', link: 'https://posty.pe/zks0y2', date: '2026-03-12T01:02:00Z', isVisible: true },
  { id: 'w4', code: 'W4', name: '루콘 스포일러 인적사항', type: 'worldview', link: 'https://posty.pe/jod7ki', date: '2026-03-12T01:03:00Z', isVisible: true },
  { id: 'w5', code: 'W5', name: '나황심 스포 정보', type: 'worldview', link: 'https://posty.pe/7dxqbl', date: '2026-03-12T01:04:00Z', isVisible: true },
  { id: 'w6', code: 'W6', name: '보호라는 이름아래 - 리의중', type: 'worldview', link: 'https://posty.pe/o5iqhi', date: '2026-03-12T01:05:00Z', isVisible: true },

  // Logs
  { id: 'l1', code: 'L1', name: '강태범 프로챗', type: 'log', imageUrl: 'https://dummyimage.com/400x400/0B1021/10B981&text=LOG', link: 'https://posty.pe/377cgz', date: '2026-03-12T01:06:00Z', isVisible: true },
  { id: 'l2', code: 'L2', name: '범희성 서방님', type: 'log', imageUrl: 'https://dummyimage.com/400x400/0B1021/10B981&text=LOG', link: 'https://posty.pe/z1m3hl', date: '2026-03-12T01:07:00Z', isVisible: true },
  { id: 'l3', code: 'L3', name: '범희성 제미나이3.1 문체 개편', type: 'log', imageUrl: 'https://dummyimage.com/400x400/0B1021/10B981&text=LOG', link: 'https://posty.pe/hc39qo', date: '2026-03-12T01:08:00Z', isVisible: true },
  { id: 'l4', code: 'L4', name: '내 남자의 남자', type: 'log', imageUrl: 'https://dummyimage.com/400x400/0B1021/10B981&text=LOG', link: 'https://posty.pe/667gjq', date: '2026-03-12T01:09:00Z', isVisible: true },
];
