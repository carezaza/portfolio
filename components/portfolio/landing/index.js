import styled from "styled-components";
import LandingCard from "./landingCard";
import usePageYOffset from "../../pageYOffset";

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
  height: 600px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  display: grid;
  place-items: center;
`;

function Landing({ port, allowEdit }) {
  const YOffset = usePageYOffset();
  if (YOffset >= 600) return null;
  return (
    <LandingContainer bg={port.background}>
      <LandingCard personal={port} allowEdit={allowEdit} />
    </LandingContainer>
  );
}

export default Landing;
