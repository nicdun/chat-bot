"use client";

import type { Message } from "@ai-sdk/react";
import { SparklesIcon } from "lucide-react";
import { motion } from "motion/react";
import ReactMarkdown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

export function Message({ message }: { message: Message }) {
  const components: Partial<Components> = {
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={materialDark}
          language={match[1]}
          PreTag="div"
          className="not-prose rounded-lg"
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
      className={`flex flex-row max-w-full gap-2 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.role === "assistant" && (
        <div className="pt-[5px]">
          <SparklesIcon className="h-4 w-4" />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`prose dark:prose-invert prose-pre:bg-transparent max-w-[calc(100%-24px)] prose-pre:p-0 rounded-lg ${
          message.role === "user" ? "bg-secondary px-3 py-1 " : "bg-none grow"
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {message.content}
        </ReactMarkdown>
      </motion.div>
    </div>
  );
}
