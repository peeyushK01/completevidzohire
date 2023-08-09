import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import Sample from './compnent/candidate/Sample';
// import Sample from './compnent/candidate/Sample';

import Home from "../src/compnent/home/Home";
// import Form from "../src/compnent/form/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Candidate from './compnent/candidate/Candidate';
// import Gethr from './compnent/hr/Hrfetch'
import Hrproflie from "./compnent/hr/Hrproflie";
import Hrfetch from "./compnent/hr/Hrfetch";
import Candidate from "./compnent/candidate/Candidate";
import Profile from "./compnent/candidate/Profile";
import Upcandidate from "./compnent/candidate/Upcandidate";
import Login from "./compnent/form/Login";
import Signup from "./compnent/form/Signup";
import Updatehr from "./compnent/hr/Updatehr";
import Getall from "./compnent/candidate/Getall";
import Appbar from "./pages/Appbar";
import Hrform from "./compnent/hr/Hrform";
import Hrdashboard from "./compnent/hr/Hrdashboard";
import Hrupdate from "./compnent/hr/Hrupdate";
import Question from "./compnent/hr/Question";
import Jobs from "./compnent/candidate/Jobs";
// import Jdcompany from "./pages/Jdcompany";
import Takequiz from "./pages/jdcompany/Takequiz";
import Video from "./compnent/video_test/Video";
// import Loggoogle from "./compnent/form/Loggoogle";
import Newvideo from "./compnent/video_test/Newvideo";
import Aboutus from "./pages/about/Aboutus";
import Foremail from "./pages/resetpassword/Foremail";
import Fornew from "./pages/resetpassword/Fornew";
import Privacy from "./pages/privacypolicy/Privacy";
import { Google } from "@mui/icons-material";
import Pricingdash from "./pages/pricing/Pricingdash";
import Applicate from "./pages/applicant/Applicate";
import Questiondash from "./compnent/hr/Questiondash";
import Applitable from "./pages/applicant/Applitable";
import Tabsmi from "./pages/Tabsmi";

// import Country1 from "./compnent/country/country1";
import Answer from "./pages/answer/Answer";
import Qavideo from "./pages/answer/Qavideo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Upcandidate/:id" element={<Upcandidate />} />
        <Route path="/hrdata" element={<Hrdashboard />} />
        <Route path="/hrprofile" element={<Hrform />} />
        <Route path="/updatehr/:id" element={<Hrupdate />} />
        <Route path="/alljobs" element={<Jobs />} />
        <Route path="/question/:id" element={<Questiondash />} />
        <Route path="/appbar" element={<Appbar />} />
        <Route path="/jd/:id" element={<Takequiz />} />
        <Route path="/video" element={<Video />} />
        <Route path="/newvideo" element={<Newvideo />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/forget" element={<Foremail />} />
        <Route path="/newpass/:resetToken" element={<Fornew />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/google" element={<Google />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/pricing" element={<Pricingdash />} />
        <Route path="/applicate/:id" element={<Applicate />} />
        <Route path="applitable" element={<Applitable />} />
        <Route path="tabsmi" element={<Tabsmi />} />
        {/* <Route path="/country" element={<Country1 />} /> */}

        <Route path="/qavideo/:id/:applicantId" element={<Qavideo />} />
        {/* <Route path="qavideo" element={<Qavideo />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;