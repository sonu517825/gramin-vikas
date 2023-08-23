// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Header from "./components/Header";
// import Footer from "./pages/Footer";
// import Layout from './components/Layout'
// import ContactUs from './pages/ContactUs'
// import AboutUs from './pages/About'
// import Login from "./pages/Login";
// import RegisterVerification from './pages/RegisterVerification'
// import Register from './pages/Register'
// import Dashboard from "./pages/Dashboard/Home";
// import SuccessRegister from "./pages/SuccessRegister";
// import MyProfile from './pages/Dashboard/MyProfile'
// import EditProfile from './pages/Dashboard/EditProfile';
// function App() {
//   return (
//     <>
//       <BrowserRouter>


//         <Routes>
//           <Route path="/" exact element={<Layout />}></Route>
//           <Route path="/home" exact element={<Layout />} />
//           <Route path="/conatctus" element={<ContactUs />} />
//           <Route path="/aboutus" element={<AboutUs />} />
//           <Route path="/verify" element={<RegisterVerification />} />
//           <Route path="/register" element={<Register />} />

//           <Route path="/login" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard></Dashboard> } />
//           <Route path="/dashboard/team/view" element={<Dashboard><div className="text-black" >mt</div></Dashboard> } />
//           <Route path="/dashboard/kyc/view" element={<div>kv</div> } />
//           <Route path="/dashboard/kyc/edit" element={<div>ke</div> } />
//           <Route path="/dashboard/bank/view" element={<div>bv</div> } />
//           <Route path="/dashboard/bank/edit" element={<div>be</div> } />
//           {/* <Route path="/login" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/dashboard/my-team" element={<Dashboard />} />
//           <Route path="/dashboard/kyc/view" element={<Dashboard />} />
//           <Route path="/dashboard/kyc/edit" element={<Dashboard />} />
//           <Route path="/dashboard/bank/view" element={<Dashboard />} />
//           <Route path="/dashboard/bank/edit" element={<Dashboard />} /> */}
//           <Route path="/dashboard/profile/welcome" element={<Dashboard />} />
//           <Route path="/dashboard/profile/welcome" element={<Dashboard />} />
//           <Route path="/dashboard/profile/welcome" element={<Dashboard />} />
//           <Route path="/dashboard/profile/welcome" element={<Dashboard />} />
//           <Route path="/dashboard/profile/welcome" element={<Dashboard />} />
//           <Route path="/dashboard/profile/welcome" element={<Dashboard />} />
//           <Route path="/dashboard/profile/welcome" element={<Dashboard />} />
//           <Route path="/dashboard/profile/welcome" element={<Dashboard />} />

//           <Route path="/dashboard/profile" element={<MyProfile />} />
//           <Route path="/dashboard/profile/edit" element={<EditProfile />} />
//           <Route path="/dashboard/password/edit" element={<Dashboard />} />
//           <Route path="/dashboard/profile/welcome" element={<Dashboard />} />
//         </Routes>


//       </BrowserRouter>
//     </>
//   );
// }

// export default App;







import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
import Header from "./components/Header";
import Footer from "./pages/Footer";
import Layout from './components/Layout'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/About'
import Login from "./pages/Login";
import RegisterVerification from './pages/RegisterVerification'
import Register from './pages/Register'
import Home from "./pages/Dashboard/Home";



function App() {
  return (
    <>
      <BrowserRouter>


        <Routes>
          <Route path="/" exact element={<Layout />}></Route>
          <Route path="/home" exact element={<Layout />} />
          <Route path="/conatctus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/verify" element={<RegisterVerification />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/team/tree" element={<Home />} />
          <Route path="/dashboard/team/table" element={<Home />} />
          <Route path="/dashboard/kyc/view" element={<Home />} />
          <Route path="/dashboard/kyc/edit" element={<Home />} />
          <Route path="/dashboard/bank/view" element={<Home />} />
          <Route path="/dashboard/bank/edit" element={<Home />} />
          <Route path="/dashboard/payout/view" element={<Home />} />
          <Route path="/dashboard/profile/view" element={<Home />} />
          <Route path="/dashboard/profile/edit" element={<Home />} />
          <Route path="/dashboard/profile/welcome" element={<Home />} />
          <Route path="/dashboard/profile/password/change" element={<Home />} />

        </Routes>


      </BrowserRouter>
    </>
  );
}

export default App;
