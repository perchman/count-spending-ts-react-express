import React from "react";
import {NavLink, useLocation} from "react-router-dom";

import style from "./Navbar.module.css";

interface NavItem {
    name: string;
    text: string;
    path: string;
}

const items : NavItem[] = [
    {
        name: 'cost',
        text: 'Costs',
        path: ''
    },
    {
        name: 'category',
        text: 'Categories',
        path: 'category/index'
    },
    {
        name: 'balance',
        text: 'Balance',
        path: 'balance/index'
    }
]

export default function Navbar() {
    const location = useLocation();

    const setActive = (name: string) => {
        return isEntityActive(name) ? style.active + ' ' + style.link : style.link;
    }

    const isEntityActive = (name: string): boolean => {
        let entity: string = location.pathname.split('/')[1] || 'cost';

        return entity === name;
    };

    return (
        <nav>
            <ol className={style.ol}>
                { items.map(item => (
                    <li key={ item.name } className={style.item}>
                        <NavLink to={ item.path } className={setActive(item.name)}>
                            { item.text }
                        </NavLink>
                    </li>
                ))}
            </ol>
        </nav>
    );
}