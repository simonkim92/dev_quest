import fs from "fs";
import path from "path";
import matter from "gray-matter";
import styled from "styled-components";
import "../style/globals.css";

const Container = styled.div`
  max-width: 800px;
  width: 90%;
  margin: 0 auto;
  padding: 30px 0;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 24px;
  color: #333;
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PostItem = styled.li`
  margin: 16px 0;
  padding: 12px 16px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  a {
    display: block;
    text-decoration: none;
    color: #333;
    font-size: 1.1rem;

    &:hover {
      color: #0070f3;
    }
  }
`;

const DateText = styled.span`
  color: #6b7280;
  font-size: 0.9rem;
  margin-left: 8px;
`;

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(".md", ""),
        title: data.title,
        date: data.date,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <Container>
      <Title>블로그</Title>
      <PostList>
        {posts.map((post) => (
          <PostItem key={post.slug}>
            <a href={`/posts/${post.slug}`}>
              {post.title} <DateText>{post.date}</DateText>
            </a>
          </PostItem>
        ))}
      </PostList>
    </Container>
  );
}
