"use client";

import type { Message } from "@ai-sdk/react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function Message({ message }: { message: Message }) {
  const components: Partial<Components> = {
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={materialDark}
          language={match[1]}
          PreTag="div"
          className="not-prose"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div
      key={message.id}
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`prose dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 p-3 rounded-lg ${
          message.role === "user"
            ? "bg-secondary text-white"
            : "bg-none w-full min-w-full"
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export function LoadingMessage() {
  return <div>Loading</div>;
}
