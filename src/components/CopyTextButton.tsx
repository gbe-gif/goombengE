import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CopyTextButton({ text, label = '복사하기' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);
  return <div className="not-prose flex flex-col items-end gap-2">
    <button type="button" disabled={pending} onClick={async () => {
      setPending(true);
      setCopied(false);
      setError('');
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
      } catch {
        setError('복사하지 못했어요. 텍스트를 선택해 복사해 주세요.');
      } finally {
        setPending(false);
      }
    }} className="min-h-11 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
      {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
      {pending ? '복사 중…' : copied ? '복사됨' : label}
    </button>
    {error && <p role="alert" className="text-sm text-amber-300">{error}</p>}
  </div>;
}
