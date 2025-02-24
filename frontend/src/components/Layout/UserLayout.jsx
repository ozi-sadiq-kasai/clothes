import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Topbar */}
      {/* Footer */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
