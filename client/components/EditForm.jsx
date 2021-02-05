import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, FormGroup, Input, Label } from "reactstrap";
import PropTypes from "prop-types";

const EditForm = ({ setFile }) => {
  const { user } = useSelector((state) => state.auth);
  const [fullName, setFullName] = useState(user?.fullName);
  const [username, setUsername] = useState(user?.username);
  const [role, setRole] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setFile(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-row">
      <Form>
        <FormGroup>
          <Label>Full Name</Label>
          <Input
            value={fullName}
            placeholder="Full name"
            onChange={(e) => setFullName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Username</Label>
          <Input
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>What do you do</Label>
          <Input
            value={role}
            placeholder="What do you do"
            onChange={(e) => setRole(e.target.value)}
          />
        </FormGroup>
      </Form>
      <div className="ml-10">
        <img
          src={user?.avatar}
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
};

export default EditForm;
