import React from "react";
import {Outlet} from "react-router-dom";

import Header from "./common/header/Header";

import "./style.css";

export default function Layout() {
    return (
        <>
            <Header />
            <main className="container">
                <Outlet />
            </main>
        </>
    );
}