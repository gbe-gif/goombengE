import { Children, isValidElement, type ReactNode } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function isImage(child: ReactNode): boolean {
  if (!isValidElement<{ children?: ReactNode }>(child)) return false;
  if (child.type === 'img') return true;
  return child.type === 'a' && Children.toArray(child.props.children).every(isImage);
}

export default function MarkdownContent({ children }: { children: string }) {
  return <div className="markdown-content">
    <Markdown remarkPlugins={[remarkGfm]} components={{
      p: ({ children }) => {
        const content = Children.toArray(children).filter(child => typeof child !== 'string' || child.trim());
        return content.length > 0 && content.every(isImage)
          ? <div className="markdown-images">{children}</div>
          : <p>{children}</p>;
      },
    }}>{children}</Markdown>
  </div>;
}
