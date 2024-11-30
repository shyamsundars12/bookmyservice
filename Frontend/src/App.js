import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Customer-dashboard/Home';
import Contact from './Components/Customer-dashboard/Contact';
import CustAddser from './Components/Customer-dashboard/CustAddser';
import CustEditProfile from './Components/Customer-dashboard/CustEditProfile';
import CustOrder from './Components/Customer-dashboard/CustOrder';
import Cart from './Components/Customer-dashboard/Cart';
import CustomerCart from './Components/Customer-dashboard/CustomerCart';
import CustProfile from './Components/Customer-dashboard/CustProfile';
import Feedback from './Components/Customer-dashboard/Feedback';
import Failed from './Components/Customer-dashboard/Failed';
import Success from './Components/Customer-dashboard/Success';
import HomeSerDetails from './Components/Customer-dashboard/HomeSerDetails';
import Sample from './Components/Customer-dashboard/Sample';
import Sample2 from './Components/Customer-dashboard/Sample2';
import Place from './Components/Customer-dashboard/Place';
import OrderCart from './Components/Customer-dashboard/OrderCart';
import SetTime from './Components/Customer-dashboard/SetTime';
import Dashboard from './Components/Admin-dashboard/Dashboard';
import ServiceCreationForm from './Components/Admin-dashboard/Services/AddServices';
import Logout from './Components/Admin-dashboard/Logout';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Customer Dashboard */}
          <Route path="/" element={<Home />} />
         
            <Route path="/Customer/CustAddser" element={<CustAddser />} />
            {/* <Route path="/Customer/EditProfile/:id" element={<CustEditProfile />} /> */}
            <Route path="/Customer/Order" element={<CustOrder />} />
            <Route path="/Customer/Cart" element={<Cart />} />
            <Route path="/Customer/CustomerCart" element={<CustomerCart />} />
            <Route path="/Customer/Profile/:id" element={<CustProfile />} />
            <Route path="/Customer/Feedback" element={<Feedback />} />
            <Route path="/Customer/Checkout/failed" element={<Failed />} />
            <Route path="/Customer/Checkout/success" element={<Success />} />
           <Route path="/Customer/DetailsServices/:id" element={<HomeSerDetails />} />
            <Route path="/Customer/Sample" element={<Sample />} />
             <Route path="/Customer/Sample2" element={<Sample2 />} />
            <Route path="/Customer/Place" element={<Place />} />
            <Route path="/Customer/OrderCart/:id" element={<OrderCart />} />
            <Route path="/Customer/SetTime/:id" element={<SetTime />} />
            <Route path="/Customer/Contact" element={<Contact />} />

          {/* Admin Dashboard */}
          <Route path="/Admin/" element={<Dashboard />} />
          <Route path="/Admin-dashboard/Services/AddServices" element={<ServiceCreationForm />} />
          <Route path="/Admin/Logout" element={<Logout />} />

          {/* Fallback */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
