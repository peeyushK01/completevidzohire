import React from "react";
import Navbars from "./Navbar";
import Banner from "./Banner";
// import Jobscards from "./Jobscards";
// import Jobs from "./Jobs";
import Footer from "./Footer";
import Jobstype from "./Jobstype";
import Whyus from "./Whyus";
import Unique from "./Unique";
import Step from "./Step";

const Home = () => {
  return (
    <>
      <Navbars />
      <Banner />
      <Jobstype />
      <Unique />
      <Whyus />
      <Step />
      <Footer />
    </>
  );
};

export default Home;
