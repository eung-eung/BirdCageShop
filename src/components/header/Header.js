import React, { useEffect, useState } from "react";
import "./Header.css";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Routes, Route, Link, useNavigate, NavLink } from "react-router-dom"
import { Container } from '@mui/material'
import { useStore } from "../cart/store/hooks";
import SearchResults from "../search/searchResult/SearchResult";
import { Products_Cage } from "../../data/CagesNewest";
import UseToken from "../handleToken/UseToken";
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
const Header = () => {
  const [Mobile, setMobile] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [state, dispatch] = useStore();
  const { getToken, setToken, removeToken } = UseToken()
  // handle search input
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    const url = `/search?query=${encodeURIComponent(trimmedQuery)}`;
    navigate(url);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" ) {
      setShowSearchInput(false)
      handleSearch();
      clearSearch();
    }
  };
  const handleLogout = () => {
    removeToken()
  }


  useEffect(() => {
    fetch("http://localhost:5000/api/v1/cage/searchTopCageCheap", {
      method: "POST",
      body: JSON.stringify({
        name: searchQuery.toLowerCase()
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.data.component.lenght == 0) {
          setSearchResults([]);
        } else {
          setSearchResults(res.data.component);
        }

      })
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="navbar">
      <div>
        <Container
          style={showSearchInput ? { display: "flex" } : { display: "none" }}
          className="input-search-container"
          maxWidth={"md"}>

          <input
            className="input"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          {searchQuery && (
            <SearchResults results={searchResults}
            input={searchQuery}
            clearSearch={clearSearch} />
          )}
          <button onClick={handleSearch}>
            <i className="fa fa-search"></i>
          </button>
        </Container>

      </div>

      <header className="header">

        {/* <h3 className="logo">Bird Cage Shop</h3> */}
        <img src="//dt-pet-care.myshopify.com/cdn/shop/files/logo_300x300.png?v=1625137186" />
        <div className="info">
          <ul className={Mobile ? "nav-links-mobile" : "nav-links"}>
            <li>
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : 'nav-link'} to="/">Home</NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : 'nav-link'} to="/customcage">Create your own cage</NavLink>
            </li>
          </ul>
        </div>
        <div className="right-icons">

          <a className="nav-link" onClick={() => setShowSearchInput(!showSearchInput)}>
            <SearchIcon />
          </a>
          {
            getToken() == null ?
              <Link className="nav-link" to="/login">
                <LoginIcon />
              </Link>
              : <>
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : 'nav-link'} to="/user">
                  <PersonIcon />
                </NavLink>
                <div className="nav-link" onClick={handleLogout}>
                  <LogoutIcon />
                </div>
              </>
          }

          <NavLink className={({ isActive }) => isActive ? "nav-link active" : 'nav-link'} to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <span
              id="cartCount"
            >
              {
                state.reduce((acc, curr) =>
                  acc + curr.cartQuantity
                  , 0
                )
              }
            </span>
          </NavLink>


        </div>
        <div className="nav-bar">
          <button
            className="mobile-menu-icon"
            onClick={() => setMobile(!Mobile)}
          >
            {Mobile ? <ImCross /> : <FaBars />}
          </button>
        </div>
      </header>

    </div>
  );
};

export default Header;
