import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), "posts"));

  const paths = files.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "posts", `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    props: {
      frontMatter: data,
      content,
    },
  };
}

export default function PostPage({ frontMatter, content }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-2xl w-full p-4">
        <h1 className="text-2xl font-bold">{frontMatter.title}</h1>
        <p className="text-gray-500">{frontMatter.date}</p>
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
