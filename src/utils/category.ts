export const getCategoryLabel = (type: string) => {
  switch (type) {
    case 'notice': return '📢 Notice';
    case 'resource': return '🎁 Resources';
    case 'work': return '📖 Works';
    case 'archive': return '🗃️ Archive';
    case 'ooc': return '🎲 OOC Playground';
    // For other archive types if needed:
    case 'image': return '🖼️ Image';
    case 'worldview': return '🌍 Worldview';
    case 'log': return '📝 Log';
    default: return type.toUpperCase();
  }
};
