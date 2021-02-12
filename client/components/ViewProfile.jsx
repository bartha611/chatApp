import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ViewProfile = ({ profile, setIsEdit, scrollHeight }) => {
  const { profile: auth } = useSelector((state) => state.members);
  const [marginTop, setMarginTop] = useState(0);
  useEffect(() => {
    const { scrollHeight: newScroll } = document.getElementById("chat");
    setMarginTop(newScroll > scrollHeight ? scrollHeight - newScroll : 0);
  }, []);
  return (
    <div
      className="absolute ml-10 z-10 border-2 w-64 rounded-md"
      id="view"
      style={{ marginTop }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <img
        className="h-64 w-full rounded-t-md"
        src={profile.avatar}
        alt={`${profile.fullName} avatar`}
      />
      <div className="p-2 bg-white">
        <h4 className="font-bold">{profile.fullName}</h4>
        <h6 className="mt-1 text-sm">{profile.role}</h6>
        {auth.id === profile.id && (
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
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullName: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    role: PropTypes.string.isRequired,
  }).isRequired,
  setIsEdit: PropTypes.func.isRequired,
  scrollHeight: PropTypes.number.isRequired,
};

export default ViewProfile;
