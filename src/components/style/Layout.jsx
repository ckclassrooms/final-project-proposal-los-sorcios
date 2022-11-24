import React, { Fragment, useState } from "react";
import Sidebar from "react-sidebar";
import Header from "./Header";
import SideMenu from "./Sidemenu";
import Searchbar from "./SearchBar";

const mql = window.matchMedia(`(min-width: 800px)`);

export default ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarDocked, setSidebarDocked] = useState(mql.matches);

  mql.addListener(() => {
    setSidebarDocked(mql.matches);
  });

  return (
    <Fragment>
      <Sidebar
        sidebar={<SideMenu toggleMenu={() => setSidebarOpen(false)} />}
        open={sidebarOpen}
        onSetOpen={setSidebarOpen}
        docked={sidebarDocked}
      >
        <Header
          toggleMenu={() => setSidebarOpen(true)}
          toggleSearch={() => setSearchOpen(true)}
        />
        <div className="container-fluid">{children}</div>
      </Sidebar>
    </Fragment>
  );
};
