import React from "react";

function Layout(props) {
  return (
    <div>
      <header
        style={{
          padding: "10px",
          maxWidth: "1180px",
          minWidth: "780px",
          border: "1px solid rgba(128, 128, 128, 0.3)",
          borderRadius: "5px",
          margin: "0 auto",
        }}
      >
        My Todo List <div style={{ float: "right" }}>React&nbsp;</div>
      </header>
      {props.children}
    </div>
  );
}
export default Layout;
