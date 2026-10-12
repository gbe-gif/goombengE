import { useState } from 'react';
export const DEFAULT_THUMBNAIL = 'https://gbe88.uk/zzz/b1.webp';
export default function Thumbnail({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const source = src?.trim();
  const image = !source || source.includes('dummyimage.com') || failedSource === source ? DEFAULT_THUMBNAIL : source;
  return <img src={image} alt={alt} loading="lazy" decoding="async" referrerPolicy="no-referrer"
    className={`h-full w-full object-contain ${className}`}
    onError={() => { if (image !== DEFAULT_THUMBNAIL) setFailedSource(image); }} />;
}
