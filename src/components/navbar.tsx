import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

//It is a component
export const Navbar = () => {
  const [user] = useAuthState(auth); //changes the user if the login person changes
  const signUserOut = async () => {
    //implements the signout
    await signOut(auth);
  };
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Home</Link>
        {!user ? (
          <Link to="/login"> Login</Link>
        ) : (
          <Link to="/createpost"> Create Post</Link>
        )}
      </div>

      <div className="user">
        {user && ( //logic for not showing the picture when not logged in
          <>
            <p>{user?.displayName} </p>
            <img src={user?.photoURL || ""} width="20" height="20" />
            <button onClick={signUserOut}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};
