import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Text = () => {
  const [content, setContent] = useState("");

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <div className="text-editor-container">
      <ReactQuill value={content} onChange={handleChange} />
    </div>
  );
};

export default Text;
