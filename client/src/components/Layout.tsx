import React from "react";
import {Outlet} from "react-router-dom";

import Header from "./header/Header";

import "./style.css";
import style from "./container.module.css";

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