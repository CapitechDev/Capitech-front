import clsx from "clsx";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

interface SafeMarkdownProps {
  markdown: string;
}

export function SafeMarkdown({ markdown }: SafeMarkdownProps) {
  return (
    <div
      className={clsx(
        "prose prose-slate",
        "w-full max-w-none",
        "overflow-hidden",
        "prose-a:transition prose-a:no-underline",
        "prose-a:text-blue-500 prose-a:hover:text-blue-700",
        "prose-img:mx-auto",
        "md:prose-lg",
        "mb-5"
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return null;
            return (
              <div className="overflow-x-auto my-6">
                <table className="w-full min-w-[600px]" {...props} />
              </div>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
