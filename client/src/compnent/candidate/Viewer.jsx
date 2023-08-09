import React from 'react';

const Viewer = ({ fileUrl }) => {

  const renderFile = () => {
    if (fileUrl.includes('.jpg') || fileUrl.includes('.png')) {
      // display image
      return <img src={fileUrl} alt="candidate document" />;
    } else {
      // display document
      return <embed src={fileUrl} type="application/pdf" width="10%" height="10%" />;
    }
  };

  return (
    <div>
      {renderFile()}
    </div>
  );
};

export default Viewer;