export const getCategoryLabel = (type: string) => {
  switch (type) {
    case 'notice': return '📢 Notice';
    case 'resource': return '🎁 Resources';
    case 'work': return '📖 Stories';
    case 'archive': return '🗃️ Archive';
    case 'ooc': return '🎲 OOC Playground';
    case 'devnote': return '📓 Dev Notes';
    // For other archive types if needed:
    case 'image': return '🖼️ Image';
    case 'worldview': return '🌍 Worldview';
    case 'log': return '📝 Log';
    default: return type.toUpperCase();
  }
};
