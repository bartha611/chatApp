import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import PropTypes from "prop-types";
import "react-image-crop/dist/ReactCrop.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../state/ducks/members";

const CropPicture = ({ file, setFile }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.members);
  const {
    currentTeam: { shortid },
  } = useSelector((state) => state.teams);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [initialCrop, setInitialCrop] = useState({
    unit: "%",
    width: 100,
    aspect: 1,
  });

  const imageRef = useRef(null);

  const onLoad = useCallback((img) => {
    imageRef.current = img;
  });

  const DataUrlToFile = (url, filename) => {
    const arr = url.split(",");
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const croppedImageFile = new File([u8arr], filename, { type: "image/png" });
    return croppedImageFile;
  };

  useEffect(() => {
    if (!imageRef.current || !completedCrop) {
      return;
    }
    const canvas = document.createElement("canvas");
    const image = imageRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const crop = completedCrop;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      scaleX * crop.x,
      scaleY * crop.y,
      scaleX * crop.width,
      scaleY * crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    const reader = new FileReader();
    canvas.toBlob((blob) => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
    });
  }, [imageRef, completedCrop]);

  const handleSubmit = async () => {
    if (profilePhoto !== "") {
      const data = new FormData();
      const profileImage = DataUrlToFile(
        profilePhoto,
        `${encodeURI(profile.fullName)}_${new Date()
          .toISOString()
          .replace(/\./, "")}.png`
      );
      data.append("avatar", profileImage);
      await dispatch(
        fetchMembers(
          `/api/teams/${shortid}/profiles/${profile.shortid}/photo`,
          "POST",
          "UPDATE",
          data,
          null
        )
      );
      setFile(null);
    }
  };

  return (
    <div>
      <ReactCrop
        ruleOfThirds
        crop={initialCrop}
        src={file}
        onImageLoaded={onLoad}
        onChange={(c) => setInitialCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
        className="w-full"
      />
      <div
        className="text-center w-44 py-2 border-2 cursor-pointer mx-auto"
        onClick={handleSubmit}
      >
        <span>Upload Photo</span>
      </div>
    </div>
  );
};

CropPicture.propTypes = {
  file: PropTypes.string.isRequired,
  setFile: PropTypes.func.isRequired,
};

export default CropPicture;
