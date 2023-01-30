import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Sidebar = ({ roomList }) => {
  return (
    <div className="outline-dashed flex flex-col w-1/5 h-screen p-2 items-center">
      {roomList}
      <AddCircleOutlineIcon />
    </div>
  );
};

export default Sidebar;
