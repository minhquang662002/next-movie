import Navbar from "../navbar/Navbar";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const Layout = ({ children }) => {
  const { setUser } = useContext(GlobalContext);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
