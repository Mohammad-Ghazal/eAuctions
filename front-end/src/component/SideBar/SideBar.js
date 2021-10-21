//import useState hook to create menu collapse state
import React, { useState } from "react";
import PanelMenuDemo from "../panelMenu/PanelMenu";

// import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./SideBar.css";

import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
const SideBar = () => {
  const [visibleLeft, setVisibleLeft] = useState(false);

  return (
    <div>
      <div className="card1">
        <Sidebar
          style={{
            width: "385px",
            
             background: "linear-gradient(90deg, #efd5ff 0%, #515ada 100%)",
          }}
          visible={visibleLeft}
          onHide={() => setVisibleLeft(false)}
        >
          <PanelMenuDemo />
        </Sidebar>

        <Button
          style={{ backgroundColor: "transparent", border: "none" }}
          icon="pi pi-align-center"
          iconPos="right"
          onClick={() => setVisibleLeft(true)}
        />
      </div>
    </div>
  );
};

export default SideBar;
