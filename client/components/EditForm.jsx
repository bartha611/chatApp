import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import PropTypes from "prop-types";
import { fetchAuth } from "../state/ducks/auth";

const EditForm = ({ setFile, setIsOpen }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.members);
  const {
    currentTeam: { shortid },
  } = useSelector((state) => state.teams);
  const [fullName, setFullName] = useState(profile?.fullName);
  const [displayName, setDisplayName] = useState(profile?.displayName);
  const [role, setRole] = useState(profile?.role);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setFile(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleClick = async () => {
    await dispatch(
      fetchAuth(
        `/api/teams/${shortid}/profiles/${profile.id}`,
        "PUT",
        "UPDATE",
        {
          displayName,
          fullName,
          role,
        }
      )
    );
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  });

  return (
    <div className="flex flex-row">
      <Form>
        <FormGroup>
          <Label>Full Name</Label>
          <Input
            value={fullName}
            type="text"
            placeholder="Full name"
            onChange={(e) => setFullName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Display Name</Label>
          <Input
            value={displayName}
            type="text"
            placeholder="Username"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>What do you do</Label>
          <Input
            value={role}
            type="text"
            placeholder="What do you do"
            onChange={(e) => setRole(e.target.value)}
          />
        </FormGroup>
        <Button onClick={handleClick}>Submit</Button>
      </Form>
      <div className="ml-10">
        <img
          src={profile?.avatar}
          alt="User avatar"
          className="w-44 h-44 rounded-md"
        />
        <div className="mt-4 border-2 rounder-sm py-1 cursor-pointer flex items-center justify-center hover:bg-gray-100">
          <Label className="m-0 cursor-pointer" for="file-upload">
            Upload
          </Label>
          <Input
            className="hidden"
            id="file-upload"
            type="file"
            onChange={(e) => handleFileChange(e)}
          />
        </div>
      </div>
    </div>
  );
};

EditForm.propTypes = {
  setFile: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default EditForm;
