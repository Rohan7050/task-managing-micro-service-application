import { Outlet } from "react-router-dom";
import NavBar from "@/components/nav-bar/NavBar";
import Footer from "@/components/footer/Footer";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main className="relative bg-gray-900 isolate min-h-screen pt-12">
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;