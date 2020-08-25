import Modal from "../../../components/modal";
import styled from "styled-components";
import { FormControl, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPort } from "../../../redux/port/slice";
import React from "react";

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

function EditPersonal({ open, handleClose, personal }) {
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      avatar: personal.avatar,
      background: personal.background,
      firstName: personal.name.firstName,
      lastName: personal.name.lastName,
      nickName: personal.name.nickName,
      githup: personal.social.githup,
      linkedIn: personal.social.linkedIn,
      twitter: personal.social.twitter,
      facebook: personal.social.facebook,
      email: personal.contact.email,
      phone: personal.contact.phone,
      handlePath: personal.handlePath,
    },
  });
  const [error, setError] = useState(null);
  const onSubmit = async (values) => {
    setError(null);
    const data = {
      avatar: values.avatar,
      background: values.background,
      handlePath: values.handlePath.trim().toLowerCase(),
      name: {
        firstName: values.firstName,
        lastName: values.lastName,
        nickName: values.nickName,
      },
      social: {
        githup: values.githup,
        linkedIn: values.linkedIn,
        twitter: values.twitter,
        facebook: values.facebook,
      },
      contact: {
        email: values.email,
        phone: values.phone,
      },
    };

    try {
      const res = await axios.post("/api/portfolio/edit_port", data);
      dispatch(setPort(res.data));
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
        <h5 style={{ margin: "10px 0" }}>Edit Personal</h5>
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
          HandlePath:
          <FormControl
            name="handlePath"
            placeholder="HandlePath"
            aria-label="HandlePath"
            ref={register}
            autoComplete="off"
            minLength="5"
          />
        </GroupContainer>
        <GroupContainer>
          Images:
          <FormControl
            name="avatar"
            placeholder="AvatarURL"
            aria-label="AvatarURL"
            ref={register}
            autoComplete="off"
          />
          <FormControl
            name="background"
            placeholder="BackgroundURL"
            aria-label="BackgroundURL"
            ref={register}
            autoComplete="off"
          />
        </GroupContainer>
        <GroupContainer>
          Name:
          <FormControl
            name="firstName"
            placeholder="FirstName"
            aria-label="FirstName"
            ref={register}
            autoComplete="off"
          />
          <FormControl
            name="lastName"
            placeholder="LastName"
            aria-label="LastName"
            ref={register}
            autoComplete="off"
          />
          <FormControl
            name="nickName"
            placeholder="NickName"
            aria-label="NickName"
            ref={register}
            autoComplete="off"
          />
        </GroupContainer>
        <GroupContainer>
          Social:
          <FormControl
            name="githup"
            placeholder="GitHupURL"
            aria-label="GitHupURL"
            ref={register}
            autoComplete="off"
          />
          <FormControl
            name="linkedIn"
            placeholder="LinkedInURL"
            aria-label="LinkedInURL"
            ref={register}
            autoComplete="off"
          />
          <FormControl
            name="twitter"
            placeholder="TwitterURL"
            aria-label="TwitterURL"
            ref={register}
            autoComplete="off"
          />
          <FormControl
            name="facebook"
            placeholder="FacebookURL"
            aria-label="FacebookURL"
            ref={register}
            autoComplete="off"
          />
        </GroupContainer>
        <GroupContainer>
          Contact:
          <FormControl
            name="email"
            placeholder="Email"
            aria-label="Email"
            ref={register}
            autoComplete="off"
          />
          <FormControl
            name="phone"
            placeholder="Phone"
            aria-label="Phone"
            ref={register}
            autoComplete="off"
          />
        </GroupContainer>
        <Button
          type="submit"
          variant="primary"
          style={{ width: "100%", marginTop: 10 }}
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

export default EditPersonal;
