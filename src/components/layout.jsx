/* eslint-disable react/prop-types */
// Layout.js

import Navbar from "./nav";


const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
