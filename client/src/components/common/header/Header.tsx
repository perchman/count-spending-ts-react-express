import React from "react";

import Logo from "./logo/Logo";
import Navbar from "./navbar/Navbar";

import style from "./Header.module.scss";

export default function Header() {
    return (
        <header className="container">
            <div className={style.inner}>
                <div className={style.item}>
                    <Logo />
                </div>
                <div className={style.item}>
                    <Navbar />
                </div>
            </div>
        </header>
    );
}