import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import React from "react";
import EditProject from "../editProject";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPort } from "../../../redux/port/slice";

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  margin-top: auto;
  width: 100%;
`;

const Image = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 200px;
  padding: 10px;
  background-image: ${({ bg }) =>
    bg ? `url(${bg})` : 'url("/background.jpg")'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  outline: none;
  border: none;
`;

const CardItem = styled(Card)`
  width: 250px;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

function ProjectItem({ project, allowEdit }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = React.useState(false);
  const { port } = useSelector((state) => state.portReducer);

  const handleDelete = async () => {
    const newProjects = port.projects.filter((p) => p._id !== project._id);
    try {
      const res = await axios.post("/api/portfolio/edit_port", {
        projects: newProjects,
      });
      dispatch(setPort(res.data));
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <CardItem>
        <Image bg={project.previewImage}>
          {allowEdit && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button
                variant="outline-warning"
                size="sm"
                onClick={() => setEdit(true)}
                style={{ marginRight: 3 }}
              >
                {edit ? <span>✔</span> : <span>✏</span>}
              </Button>
              <Button variant="outline-danger" size="sm" onClick={handleDelete}>
                <span>🗑</span>
              </Button>
            </div>
          )}

          <ButtonContainer>
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  variant="outline-primary"
                  style={{ background: "rgba(0,0,0,.7)", width: "100%" }}
                >
                  Demo
                </Button>{" "}
              </a>
            )}
            {project.githup && (
              <a
                href={project.githup}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  variant="outline-info"
                  style={{ background: "rgba(0,0,0,.7)", width: "100%" }}
                >
                  GitHup
                </Button>{" "}
              </a>
            )}
          </ButtonContainer>
        </Image>
        <Card.Body>
          <Card.Title>{project.name ? project.name : "???"}</Card.Title>

          <Card.Text>
            {project.description ? project.description : "??????"}
          </Card.Text>
        </Card.Body>
      </CardItem>
      {edit && (
        <EditProject
          open={edit}
          handleClose={() => setEdit(false)}
          project={project}
        />
      )}
    </React.Fragment>
  );
}

export default ProjectItem;
