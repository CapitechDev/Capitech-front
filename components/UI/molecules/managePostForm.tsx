"use client";

// import dynamic from "next/dynamic";
import { useId } from "react";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import MDEditor from '@uiw/react-md-editor';

// const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
//   ssr: false,
// });

type MarkdownEditorProps = {
  labelText?: string;
  value: string;
  setValue: (value: string) => void;
  textAreaName: string;
  disabled?: boolean;
  errorMessage?: string;
  isInvalid?: boolean;
};

export function MarkdownEditor({
  labelText = "",
  value,
  setValue,
  textAreaName,
  disabled = false,
  errorMessage,
  isInvalid = false,
}: MarkdownEditorProps) {
  const id = useId();

  return (
    <div className="w-full flex flex-col gap-2">
      {labelText && (
        <label 
          className={`text-sm ${isInvalid ? 'text-danger' : ''}`} 
          htmlFor={id}
        >
          {labelText}
        </label>
      )}

      <div className={isInvalid ? 'border border-danger rounded-md' : ''}>
        <MDEditor
          className="whitespace-pre-wrap"
          value={value}
          onChange={value => {
            if (value === undefined) return;
            setValue(value);
          }}
          height={400}
          // extraCommands={[]}
          preview="edit"
          hideToolbar={disabled}
          textareaProps={{
            id,
            name: textAreaName,
            disabled: disabled,
          }}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
            remarkPlugins: [[remarkGfm]],
          }}
        />
      </div>

      {isInvalid && errorMessage && (
        <span className="text-xs text-danger">{errorMessage}</span>
      )}
    </div>
  );
}
