import Header from "@/components/header/Header";
import React from "react";

const Layout = ({ children }: any) => {
    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    );
};

export default Layout;
