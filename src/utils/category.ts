export const getCategoryLabel = (type: string) => {
  switch (type) {
    case 'notice': return '📢 공지';
    case 'resource': return '🎁 자료실';
    case 'work': return '📖 작품';
    case 'archive': return '🗃️ 아카이브';
    case 'ooc': return '🎲 OOC 놀이터';
    case 'devnote': return '📓 개발 기록';
    // For other archive types if needed:
    case 'image': return '🖼️ 이미지';
    case 'worldview': return '🌍 세계관';
    case 'log': return '📝 테스트 기록';
    default: return type.toUpperCase();
  }
};
