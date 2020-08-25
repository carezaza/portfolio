import Modal from "../../../components/modal";
import styled from "styled-components";
import { FormControl, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPort } from "../../../redux/port/slice";
import { useState } from "react";

const FormEdit = styled.form`
  padding: 20px;
  background-color: white;
  max-height: 500px;
  overflow-y: auto;
  width: 100%;
  max-width: 500px;
  border-radius: 3px;
`;

const GroupContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 3px;
  margin: 10px 0;
`;

function EditProject({ open, handleClose, project }) {
  const dispatch = useDispatch();
  const { port } = useSelector((state) => state.portReducer);
  const [error, setError] = useState(null);
  const title = project ? "Edit Project" : "Create Project";
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: project && project.name ? project.name : "",
      description: project && project.description ? project.description : "",
      previewImage: project && project.previewImage ? project.previewImage : "",
      liveDemo: project && project.liveDemo ? project.liveDemo : "",
      githup: project && project.githup ? project.githup : "",
    },
  });
  const onSubmit = async (values) => {
    setError(null);
    try {
      let data = null;
      if (!project) {
        const res = await axios.post("/api/portfolio/edit_port", {
          projects: [...port.projects, values],
        });
        data = res.data;
      } else {
        const newProjects = port.projects.map((p) => {
          if (p._id === project._id) {
            return { _id: project._id, ...values };
          }
          return p;
        });
        const res = await axios.post("/api/portfolio/edit_port", {
          projects: newProjects,
        });
        data = res.data;
      }

      dispatch(setPort(data));
      handleClose();
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  if (!open) return null;
  return (
    <Modal handleClose={handleClose}>
      <FormEdit
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <h5 style={{ margin: "10px 0" }}>{title}</h5>
        {error && (
          <p
            style={{
              color: "red",
              border: "1px solid red",
              borderRadius: 3,
              wordBreak: "break-word",
              padding: 5,
            }}
            align="center"
          >
            {error}
          </p>
        )}
        <GroupContainer>
          Name:
          <FormControl
            name="name"
            placeholder="Name"
            aria-label="Name"
            ref={register}
            autoComplete="off"
            required
          />
        </GroupContainer>
        <GroupContainer>
          Description:
          <FormControl
            name="description"
            placeholder="Description"
            aria-label="Description"
            ref={register}
            autoComplete="off"
          />
        </GroupContainer>
        <GroupContainer>
          PreviewImage:
          <FormControl
            name="previewImage"
            placeholder="Preview Image"
            aria-label="Preview Image"
            ref={register}
            autoComplete="off"
          />
        </GroupContainer>
        <GroupContainer>
          Views:
          <FormControl
            name="liveDemo"
            placeholder="LiveDemo URL"
            aria-label="LiveDemo URL"
            ref={register}
            autoComplete="off"
          />
          <FormControl
            name="githup"
            placeholder="ViewGitHup URL"
            aria-label="ViewGitHup URL"
            ref={register}
            autoComplete="off"
          />
        </GroupContainer>

        <Button
          type="submit"
          variant="primary"
          style={{ width: "100%", marginTop: 5 }}
        >
          Submit
        </Button>
        <Button
          variant="secondary"
          onClick={handleClose}
          style={{ width: "100%", marginTop: 5 }}
        >
          Cancel
        </Button>
      </FormEdit>
    </Modal>
  );
}

export default EditProject;
