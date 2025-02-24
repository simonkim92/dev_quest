import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const MarkdownRenderer = ({ content }) => {
  return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>;
};

export default MarkdownRenderer;
