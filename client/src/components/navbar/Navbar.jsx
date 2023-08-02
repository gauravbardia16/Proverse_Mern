import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Proverse</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
         {/* <span>Proverse Business</span>*/}
          <Link className="link" to="/gigs?all">
            <span>Explore</span>
          </Link>
          <span>English</span>
          {!currentUser?.isSeller /*&& <span>Become a Seller</span>*/}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/gigs?cat=graphic">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/gigs?cat=video">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/gigs?cat=writing">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/gigs?cat=aiservices">
              AI Services
            </Link>
            <Link className="link menuLink" to="/gigs?cat=digital">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/gigs?cat=music">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/gigs?cat=programming">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/gigs?cat=business">
              Business
            </Link>
            <Link className="link menuLink" to="/gigs?cat=lifestyle">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
