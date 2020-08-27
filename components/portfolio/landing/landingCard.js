import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";
import React from "react";
import EditPersonal from "../editPersonal";
import { FaGithub, FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const SpinExpandAnimation = css`
  animation: spin 1s ease-out;
  @keyframes spin {
    from {
      transform: scale(0) rotate(1440deg);
    }
  }
`;

const ExpandAnimation = css`
  animation: expand 1s ease-out;
  @keyframes expand {
    from {
      transform: scale(0);
    }
  }
`;

const CardContainer = styled.div`
  margin-top: 55px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 30px;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  ${ExpandAnimation}
`;

const Avatar = styled.div`
  height: 130px;
  width: 130px;
  border-radius: 50%;
  border: 2px solid #ccc;
  margin: 10px;
  background-image: ${({ bg }) =>
    bg ? `url(${bg})` : 'url("/background.jpg")'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Text = styled.p`
  margin: 5px;
  font-size: 16px;
  font-weight: 600;
`;

const LinkA = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: inherit;
  cursor: inherit;

  &:hover {
    color: inherit;
  }
`;
const SocialButton = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  cursor: pointer;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.8);
  color: ${({ color, theme }) => {
    if (color === "primary") {
      return theme.colors.primary;
    }

    if (color === "secondary") {
      return theme.colors.secondary;
    }

    return "inherit";
  }};
  padding: 0;
  outline: none;
  border: none;
  transition: all 1s ease-out;

  &:disabled {
    cursor: default;
    color: grey;
    background-color: rgba(0, 0, 0, 0.3);
    &:hover {
      transform: unset;
    }
  }

  &:hover {
    transform: rotate(720deg);
  }

  ${SpinExpandAnimation}
`;

const SocialContainer = styled.div`
  margin: 10px;
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 10px;
`;

function LandingCard({ personal, allowEdit }) {
  const [edit, setEdit] = React.useState(false);

  return (
    <React.Fragment>
      <CardContainer>
        {allowEdit && (
          <Button
            variant="outline-warning"
            size="sm"
            style={{ marginLeft: "auto" }}
            onClick={() => setEdit(true)}
          >
            {edit ? <span>✔</span> : <span>✏</span>}
          </Button>
        )}

        <Avatar bg={personal.avatar} />
        <h5 style={{ margin: 10 }}>
          {personal.name.firstName} {personal.name.lastName} (
          {personal.name.nickName})
        </h5>
        <SocialContainer>
          <SocialButton color="secondary" disabled={!personal.social.githup}>
            <LinkA
              href={personal.social.githup || "#"}
              target={personal.social.githup && "_blank"}
              rel="noopener noreferrer"
            >
              <FaGithub style={{ width: "60%", height: "60%" }} />
            </LinkA>
          </SocialButton>
          <SocialButton color="primary" disabled={!personal.social.twitter}>
            <LinkA
              href={personal.social.twitter || "#"}
              target={personal.social.twitter && "_blank"}
              rel="noopener noreferrer"
            >
              <FaTwitter
                style={{
                  width: "50%",
                  height: "50%",
                }}
              />
            </LinkA>
          </SocialButton>
          <SocialButton color="primary" disabled={!personal.social.linkedIn}>
            <LinkA
              href={personal.social.linkedIn || "#"}
              target={personal.social.linkedIn && "_blank"}
              rel="noopener noreferrer"
            >
              <FaLinkedinIn
                style={{
                  width: "50%",
                  height: "50%",
                }}
              />
            </LinkA>
          </SocialButton>
          <SocialButton color="primary" disabled={!personal.social.facebook}>
            <LinkA
              href={personal.social.facebook || "#"}
              target={personal.social.facebook && "_blank"}
              rel="noopener noreferrer"
            >
              <FaFacebook
                style={{
                  width: "60%",
                  height: "60%",
                }}
              />
            </LinkA>
          </SocialButton>
        </SocialContainer>
        <Text>Email: {personal.contact.email}</Text>
        <Text>Phone: {personal.contact.phone}</Text>
      </CardContainer>
      {edit && (
        <EditPersonal
          open={edit}
          handleClose={() => setEdit(false)}
          personal={personal}
        />
      )}
    </React.Fragment>
  );
}

export default LandingCard;
