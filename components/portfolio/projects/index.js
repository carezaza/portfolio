import styled from "styled-components";
import ProjectItem from "./projectItem";
import { Button } from "react-bootstrap";
import EditProject from "../editProject";
import React from "react";

const ProjectsContainer = styled.div`
  margin-top: 600px !important;
  border-bottom: 1px solid #ccc;
  padding: 50px 0;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: auto;
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px 10px;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 20px 0;
  place-items: center;
`;

function Projects({ projects, allowEdit }) {
  const [create, setCreate] = React.useState(false);
  return (
    <React.Fragment>
      <ProjectsContainer>
        <Container>
          <h3 style={{ margin: 10 }} align="center">
            Projects
          </h3>
          <ItemContainer>
            {projects.length > 0
              ? projects.map((p) => (
                  <ProjectItem key={p._id} project={p} allowEdit={allowEdit} />
                ))
              : !allowEdit && (
                  <p style={{ fontSize: 16, marginTop: 10 }}>
                    Projects is empty.
                  </p>
                )}

            {allowEdit && (
              <Button
                variant="outline-secondary"
                onClick={() => setCreate(true)}
              >
                <span>➕</span>
              </Button>
            )}
          </ItemContainer>
        </Container>
      </ProjectsContainer>
      <EditProject open={create} handleClose={() => setCreate(false)} />
    </React.Fragment>
  );
}

export default Projects;
