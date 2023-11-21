import React from "react";

import Logo from "./logo/Logo";
import Navbar from "./navbar/Navbar";

import style from "./Header.module.css";

export default function Header() {
    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.inner}>
                    <div className={style.item}>
                        <Logo />
                    </div>
                    <div className={style.item}>
                        <Navbar />
                    </div>
                </div>
            </div>
        </header>
    );
}