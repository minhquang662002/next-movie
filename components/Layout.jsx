import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-black min-h-screen text-white flex flex-col">
        <ToastContainer />
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
