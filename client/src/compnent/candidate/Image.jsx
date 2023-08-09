import React from "react";

const Image = ({ imageName }) => {
  return (
    <div>
      <img
        src={`http://localhost:8080/public/uploads/pimage/${imageName}`}
        alt="uploaded image"
      />
    </div>
  );
};

export default Image;
