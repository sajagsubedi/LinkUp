import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <div className="grid-background"></div>
      <main className="min-h-screen conainer">
        <Navbar />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
