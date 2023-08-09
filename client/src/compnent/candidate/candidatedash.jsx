import React from "react";
import Candibar from "./Candibar";
import Candidate from "./Candidate";
import Savedtabs from  "./Savedtabs";
import Footer from "../home/Footer"

const candidatedash = () => {
  return (
    <div>
      <Candibar />
      <Candidate />
      <Savedtabs/>
      <Footer />
    </div>
  );
};

export default candidatedash;
