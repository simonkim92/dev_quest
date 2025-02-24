import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "posts", `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    props: {
      title: data.title,
      date: data.date,
      content: marked(content),
    },
  };
}

export default function Post({ title, date, content }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-gray-500">{date}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
