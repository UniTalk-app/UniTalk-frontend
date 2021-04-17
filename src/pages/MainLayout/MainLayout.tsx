import * as React from "react";
import Navbar from "./Navbar";

const MainLayout: React.FC = ({ children }) => (
    <>
        <Navbar />
        {children}
    </>
);

export default MainLayout;
