import styled from "styled-components";
import { Button } from "react-bootstrap";
import React from "react";
import EditPersonal from "../editPersonal";
import { FaGithub, FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";

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

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
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
            <a
              href={personal.social.githup || "#"}
              target={personal.social.githup && "_blank"}
              rel="noopener noreferrer"
              style={{ color: "inherit", cursor: "inherit" }}
            >
              <FaGithub style={{ width: "60%", height: "60%" }} />
            </a>
          </SocialButton>
          <SocialButton color="primary" disabled={!personal.social.twitter}>
            <a
              href={personal.social.twitter || "#"}
              target={personal.social.twitter && "_blank"}
              rel="noopener noreferrer"
              style={{ color: "inherit", cursor: "inherit" }}
            >
              <FaTwitter
                style={{
                  width: "50%",
                  height: "50%",
                }}
              />
            </a>
          </SocialButton>
          <SocialButton color="primary" disabled={!personal.social.linkedIn}>
            <a
              href={personal.social.linkedIn || "#"}
              target={personal.social.linkedIn && "_blank"}
              rel="noopener noreferrer"
              style={{ color: "inherit", cursor: "inherit" }}
            >
              <FaLinkedinIn
                style={{
                  width: "50%",
                  height: "50%",
                }}
              />
            </a>
          </SocialButton>
          <SocialButton color="primary" disabled={!personal.social.facebook}>
            <a
              href={personal.social.facebook || "#"}
              target={personal.social.facebook && "_blank"}
              rel="noopener noreferrer"
              style={{ color: "inherit", cursor: "inherit" }}
            >
              <FaFacebook
                style={{
                  width: "60%",
                  height: "60%",
                }}
              />
            </a>
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
