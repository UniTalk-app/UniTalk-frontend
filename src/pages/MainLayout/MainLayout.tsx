import * as React from "react";
import Navbar from "./Navbar";

const MainLayout: React.FC = ({ children }) => (
    <>
        <Navbar notifications={[{name:"How to die succesfully", comments:"User1 and 8 more"}, {name:"Juwenalia",comments:"User2 and 3 more"}]}/>
        {children}
    </>
);

export default MainLayout;
