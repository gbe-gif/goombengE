export default function OocContent({ text }: { text: string }) {
  return <pre className="not-prose m-0 rounded-xl border border-white/10 bg-[#12182B] p-4 sm:p-6 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-200 font-mono"><code>{text}</code></pre>;
}
