import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import styled from "styled-components";
import "../../style/globals.css";

const Container = styled.div`
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f4f6;
  height: 80px;
  padding: 20px;
`;
const MDWrapper = styled.div`
  width: 800px;
`;
const Content = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
`;

const DateText = styled.div`
  position: absolute;
  right: 20px;
  color: #6b7280; // gray-500
`;

const ContentImage = styled.img`
  width: 100%; /* 이미지가 MDWrapper의 너비에 맞게 꽉 차도록 설정 */
  height: 400px; /* 비율을 유지하면서 높이를 자동으로 조정 */
`;

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
    <Container>
      <Header>
        <Title>{frontMatter.title}</Title>
        <DateText>{frontMatter.date}</DateText>
      </Header>
      <Content>
        <MDWrapper>
          <ContentImage src={frontMatter.imageSrc} />
          <MarkdownRenderer content={content} />
        </MDWrapper>
      </Content>
    </Container>
  );
}
