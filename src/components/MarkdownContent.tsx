import { Children, isValidElement, type ReactNode } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CopyTextButton from './CopyTextButton';

function isImage(child: ReactNode): boolean {
  if (!isValidElement<{ children?: ReactNode }>(child)) return false;
  if (child.type === 'img') return true;
  return child.type === 'a' && Children.toArray(child.props.children).every(isImage);
}

export default function MarkdownContent({ children, copyCodeBlocks = false }: { children: string; copyCodeBlocks?: boolean }) {
  return <div className="markdown-content">
    <Markdown remarkPlugins={[remarkGfm]} components={{
      pre: ({ children }) => {
        if (!copyCodeBlocks) return <pre>{children}</pre>;
        const code = Children.toArray(children).find(child => isValidElement(child) && child.type === 'code');
        const text = isValidElement<{ children?: ReactNode }>(code) ? Children.toArray(code.props.children).join('') : '';
        return <div className="not-prose my-6 rounded-xl border border-white/10 bg-[#12182B] overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
            <span className="text-xs text-slate-400">코드블록 안의 내용만 복사합니다.</span>
            <CopyTextButton text={text} label="이 블록 복사" />
          </div>
          <pre className="m-0 p-4 overflow-x-auto text-sm leading-relaxed text-slate-200"><code>{text}</code></pre>
        </div>;
      },
      p: ({ children }) => {
        const content = Children.toArray(children).filter(child => typeof child !== 'string' || child.trim());
        return content.length > 0 && content.every(isImage)
          ? <div className="markdown-images">{children}</div>
          : <p>{children}</p>;
      },
    }}>{children}</Markdown>
  </div>;
}
