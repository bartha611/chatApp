import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import EditForm from "./EditForm";
import CropPicture from "./CropPicture";

const EditProfile = ({ isOpen, setIsOpen }) => {
  const [file, setFile] = useState(null);

  const CropPictureHeader = (
    <div className="flex flex-row">
      <span className="cursor-pointer h-7 w-7 flex items-center justify-center hover:bg-gray-100">
        <FontAwesomeIcon icon={faArrowLeft} onClick={() => setFile(null)} />
      </span>
      <span className="ml-2">Crop Picture</span>
    </div>
  );

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader
        toggle={() => setIsOpen(false)}
        className="border-none font-bold px-4"
      >
        {!file ? `Edit Profile` : CropPictureHeader}
      </ModalHeader>
      {!file && (
        <ModalBody className="px-4 py-2">
          <EditForm setFile={setFile} setIsOpen={setIsOpen} />
        </ModalBody>
      )}
      {file && (
        <ModalBody className="px-4 py-2">
          <CropPicture file={file} setFile={setFile} />
        </ModalBody>
      )}
    </Modal>
  );
};

EditProfile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default EditProfile;
