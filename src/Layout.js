import React from "react";

function Layout(props) {
  return (
    <div>
      <header
        style={{
          fontSize: "25px",
          padding: "10px",
          maxWidth: "1180px",
          minWidth: "780px",
          borderRadius: "5px",
          margin: "0 auto",
        }}
      >
        My TODO-List <div style={{ float: "right" }}>&nbsp;</div>
      </header>
      {props.children}
    </div>
  );
}
export default Layout;
