import React, { useEffect, useState, useRef } from "react";
import "./Header.css";
import NetflixLogo from "../../assets/images/NetflixLogo.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
      setIsScrolled(window.scrollY > headerHeight); // Change header after scrolling past its height
    };
      console.log(window)

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={headerRef} className={`header_outer_container ${isScrolled ? "nav__black" : ""}`}>
      <div className="header_container">
        <div className="header_left">
          <ul>
            <li>
              {" "}
              <img src={NetflixLogo} alt="Netflix Logo" width="100" />
            </li>
            <li>Netflix</li>
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>Latest</li>
            <li>MyList</li>
            <li>Browse by Languages</li>
          </ul>
        </div>
        <div className="header_right">
          <ul>
            <li>
              <SearchIcon />{" "}
            </li>
            <li>
              <NotificationsNoneIcon />
            </li>
            <li>
              <AccountBoxIcon />
            </li>
            <li>
              <ArrowDropDownIcon />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
