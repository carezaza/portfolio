import styled from "styled-components";
import LandingCard from "./landingCard";

const LandingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: ${({ bg }) =>
    bg ? `url(${bg})` : 'url("/background.jpg")'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 550px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: grid;
  place-items: center;
`;

function Landing({ port, allowEdit }) {
  return (
    <LandingContainer bg={port.background}>
      <LandingCard personal={port} allowEdit={allowEdit} />
    </LandingContainer>
  );
}

export default Landing;
