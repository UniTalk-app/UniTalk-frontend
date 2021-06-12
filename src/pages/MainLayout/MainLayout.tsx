import * as React from "react";
import Navbar from "./Navbar";

const MainLayout: React.FC = ({ children }) => (
    <>
        <Navbar notifications={[{name:"Sorry, notifications aren't working yet :(", comments:""}]}/>
        {children}
    </>
);

export default MainLayout;
