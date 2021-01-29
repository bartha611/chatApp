import React, { useState } from "react";
import { Input, Container } from "reactstrap";
import api from "../state/utils/api";

const AddTeamMembers = () => {
  const [result, setResult] = useState(null);

  const handleKeyup = async (search) => {
    const response = await api.get(`/api/user?search=${search}`);
    setResult(response.data.user);
  };

  return (
    <div>
      <Container>
        <Input
          id="email1"
          type="text"
          placeholder="username"
          onKeyUp={(event) => handleKeyup(event.target.value)}
          name="email1"
        />
        {result && (
          <div className="border-2 text-left p-2">{result.username}</div>
        )}
      </Container>
    </div>
  );
};

export default AddTeamMembers;
