import { Link } from "react-router";
import logo from "../assets/firebase-logo.png";
import MyContainer from "./MyContainer";
import MyLink from "./MyLink";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { FadeLoader } from "react-spinners";

const Navbar = () => {
  const { signOutUserFunc, user, setUser, loading } = useContext(AuthContext);

  const handleSignOut = () => {
    // sign out...
    signOutUserFunc()
      .then(() => {
        toast.success("Sign-out successful.");
        setUser(null);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="bg-slate-100f py-2 border-b border-b-slate-300 ">
      <MyContainer className="flex items-center justify-between">
        <figure>
          <img src={logo} className="w-13.75" />
        </figure>
        <ul className="flex items-center gap-2">
          <li>
            <MyLink to={"/"}>Home</MyLink>
          </li>
          <li>
            <MyLink to={"/about-us"}>About US</MyLink>
          </li>
          {user && (
            <li>
              <MyLink to={"/profile"}>Profile</MyLink>
            </li>
          )}
        </ul>

        {loading ? (
          <FadeLoader color="#FFF" />
        ) : user ? (
          <div className="text-center space-y-3">
            {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
            {/* For TSX uncomment the commented types below */}
            <button
              className="btn"
              popoverTarget="popover-1"
              style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
            >
              <img
                src={user?.photoURL || "https://via.placeholder.com//88"}
                className="h-10 w-10 rounded-full mx-auto"
                alt=""
              />
            </button>

            <div
              className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
              popover="auto"
              id="popover-1"
              style={
                { positionAnchor: "--anchor-1" } /* as React.CSSProperties */
              }
            >
              <h2 className="text-xl font-semibold">{user?.displayName}</h2>
              <p className="text-white/80">{user?.email}</p>
              <button onClick={handleSignOut} className="my-btn">
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
            <Link to={"/signin"}>Sign in</Link>
          </button>
        )}
      </MyContainer>
    </div>
  );
};

export default Navbar;
