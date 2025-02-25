import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import styled from "styled-components";
import "../style/globals.css"; // 글로벌 CSS 파일 임포트

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 16px;
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PostItem = styled.li`
  margin: 8px 0;
`;

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
    };
  });

  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <Container>
      <Title>블로그</Title>
      <PostList>
        {posts.map((post) => (
          <PostItem key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              {post.title} - {post.date}
            </Link>
          </PostItem>
        ))}
      </PostList>
    </Container>
  );
}
