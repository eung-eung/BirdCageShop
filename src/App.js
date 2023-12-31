import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import CopyWriter from "./components/footer/CopyWriter";
import Footer from "./components/footer/Footer";
import { Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SearchPage from "./pages/SearchPage";
import { Products_Cage } from "./data/Cages";
import Adress from "./components/address/Address";
import UserProfile from "./components/userProfile/UserProfile";
import CustomCage from "./components/customCage/CustomCage";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
// import Login from "./components/login/Login";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import CreateAccount from "./components/createAccount/CreateAccount";
import LoginPage from "./pages/LoginPage";

import DetailOrder from "./components/detailOrder/DetailOrder";
import ManageOrder from "./components/manageOrder/ManageOrder";



import Payment from "./components/payment/Payment";
import Login from "./components/login/Login";
import CompareProductsPage from "./pages/CompareProductsPage";
import Address from "./components/address/Address";
import EditAddress from "./components/editAddress/EditAddress";
import AddNewAddress from "./components/addNewAddress/AddNewAddress";
import EditProfile from "./components/userProfile/editProfile/EditProfile";
function App() {
  // const regx = /:\[\d{3},\d{3}]/g
  // const [item, setItem] = useState('')
  // const regx = /(\"{|\\|}")/g
  // const regx = /(\{)/g
  // const regx2 = /(\})/g
  // const newPro = Products.map(product => {
  //   console.log(product.images)
  //   product.images = product.images.replace(regx, '[')
  //   product.images = product.images.replace(regx2, ']')
  //   console.log(product.images)
  //   return product.images
  // })
  // console.log(Products.length)

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="App" style={{ background: "#fff" }}>
      {/* render image of each cage */}
      {/* 
      {Products_Cage.map(pro =>
        <div>{JSON.parse(pro.images).map((img, index) => index == 0 && <img src={img} />)}</div>
      )} */}
      <Header></Header>
      <Routes>
        <Route path="/detail/:id" element={<ProductDetailPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/manageorder" element={<ManageOrder />}></Route>
        <Route path="/detailorder" element={<DetailOrder />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/user">
          <Route index={true} element={<UserProfile />}></Route>
          <Route index={false} path="manageorder" element={<ManageOrder />}></Route>
          <Route index={false} path="editprofile" element={<EditProfile />}></Route>


          <Route index={false} path="address">
            <Route index={true} element={<Address />}></Route>
            <Route index={false} path="editaddress" element={<EditAddress />}></Route>
            <Route index={false} path="addnewaddress" element={<AddNewAddress />}></Route>
          </Route>
        </Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/createaccount" element={<CreateAccount />}></Route>
        <Route path="compare/:cageId1/:cageId2" element={<CompareProductsPage />} />
        <Route path="/customcage" element={<CustomCage />} />
      </Routes>



      <Footer></Footer>
    </div>
  );
}

export default App;
