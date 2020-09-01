import Layout from "../components/layout";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Link from "next/link";

const HomeContainer = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  background-image: url("/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Container = styled.div`
  padding: 20px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ButtonLink = styled.a`
  padding: 10px 20px;
  border-radius: 3px;
  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.secondary};
  color: #fff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    color: #fff;
    filter: brightness(90%);
  }
`;

export default function Home() {
  const { user, loading } = useSelector((state) => state.userReducer);

  const Button = !user ? (
    <ButtonLink href="/auth/google" color="#16a17f">
      LOGIN WITH GOOGLE
    </ButtonLink>
  ) : (
    <Link href={`portfolio/${user.handlePath}`}>
      <ButtonLink color="#ff3267">GO TO MY PORT</ButtonLink>
    </Link>
  );

  return (
    <Layout title="Home">
      <HomeContainer>
        <Container>
          {loading ? (
            <h5 style={{ color: "#fff", padding: "3px 10px 0 10px" }}>
              Loading...
            </h5>
          ) : (
            Button
          )}
        </Container>
      </HomeContainer>
    </Layout>
  );
}
