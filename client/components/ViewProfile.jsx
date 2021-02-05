import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ViewProfile = ({ user, setIsEdit }) => {
  const { user: auth } = useSelector((state) => state.auth);

  useEffect(() => {
    const element = document.getElementById("chat");
    console.log(element.scrollHeight);
    console.log(element.offsetHeight);
  }, []);
  return (
    <div
      className="absolute ml-10 z-10 border-2 w-64 rounded-md"
      id="hello"
      onMouseDown={(e) => e.preventDefault()}
    >
      <img
        className="h-64 w-full rounded-t-md"
        src={user.avatar}
        alt={`${user.username} avatar`}
      />
      <div className="p-2 bg-white">
        <h4 className="font-bold">{user.fullName}</h4>
        <h6 className="mt-1 text-sm">{user.role}</h6>
        {auth.username === user.username && (
          <button
            type="button"
            className="border-2 mt-4 border-gray-400 hover:bg-gray-100 p-1 w-full"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

ViewProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  setIsEdit: PropTypes.func.isRequired,
};

export default ViewProfile;
