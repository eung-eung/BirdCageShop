import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import CopyWriter from "./components/footer/CopyWriter";
import Footer from "./components/footer/Footer";
import { Route, Routes } from "react-router-dom"
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage"
import SearchPage from "./pages/SearchPage";
import { Products } from "./data/Products";


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
  // console.log(Products)
  return (

    <div className="App" style={{ background: "#fff" }}>
      {/* render image of each cage */}

      {/* {Products.map(pro =>
        <div>{JSON.parse(pro.images).map(img => <img src={img} />)}</div>
      )} */}
      <Header></Header>
      <Routes>
        <Route path="/detail" element={<ProductDetailPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
