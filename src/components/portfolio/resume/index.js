import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPort } from "../../../redux/port/slice";

const ResumeContainer = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 50px 0;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: auto;
`;

const ResumeIframe = styled.iframe`
  margin: 20px 0;
  width: 100%;
  outline: none;
  border: none;
  height: 600px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const InputResume = styled.input`
  outline: none;
  border-radius: 3px;
  padding: 5px 10px;
  width: 100%;
  margin-right: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

function Resume({ resumeURL, allowEdit }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [resume, setResume] = useState(resumeURL);

  const handleEdit = async () => {
    if (edit) {
      const res = await axios.post("/api/portfolio/edit_port", { resume });
      dispatch(setPort(res.data));
    }
    setEdit(!edit);
  };
  return (
    <ResumeContainer>
      <Container>
        <h3 style={{ margin: 10 }} align="center">
          Resume
        </h3>
        {allowEdit && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {edit && (
              <InputResume
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
            )}
            <Button variant="outline-warning" size="sm" onClick={handleEdit}>
              {edit ? <span>✔</span> : <span>✏</span>}
            </Button>
          </div>
        )}

        <ResumeIframe src={resumeURL} frameborder="0" />
      </Container>
    </ResumeContainer>
  );
}

export default Resume;
