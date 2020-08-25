import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPort } from "../../../redux/port/slice";

const AboutContainer = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 50px 0;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: auto;
`;

const DescriptionContainer = styled.div`
  margin: 20px 0;
  padding: 40px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  word-break: break-word;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px;
  resize: none;
`;

function About({ about, allowEdit }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [ab, setAb] = useState(about);

  const aboutMe = about ? about : "Description about your self...";
  const content = edit ? (
    <TextArea
      cols="40"
      rows="5"
      value={ab}
      onChange={(e) => setAb(e.target.value)}
    />
  ) : (
    aboutMe
  );

  const handleEdit = async () => {
    if (edit) {
      const res = await axios.post("/api/portfolio/edit_port", { about: ab });
      dispatch(setPort(res.data));
    }
    setEdit(!edit);
  };
  return (
    <AboutContainer>
      <Container>
        <h3 style={{ margin: 10 }} align="center">
          About
        </h3>
        {allowEdit && (
          <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <Button
              variant="outline-warning"
              size="sm"
              style={{ marginLeft: "auto" }}
              onClick={handleEdit}
            >
              {edit ? <span>✔</span> : <span>✏</span>}
            </Button>
          </div>
        )}

        <DescriptionContainer>{content}</DescriptionContainer>
      </Container>
    </AboutContainer>
  );
}

export default About;
