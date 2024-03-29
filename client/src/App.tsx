import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import CostIndex from "./pages/costs/CostIndex";
import CostCreate from "./pages/costs/CostCreate";
import CostUpdate from "./pages/costs/CostUpdate";
import CostDelete from "./pages/costs/CostDelete";
//
import CategoryIndex from "./pages/categories/CategoryIndex";
import CategoryCreate from "./pages/categories/CategoryCreate";
import CategoryUpdate from "./pages/categories/CategoryUpdate";
import CategoryDelete from "./pages/categories/CategoryDelete";
//
import BalanceIndex from "./pages/balance/BalanceIndex";
import BalanceReplenish from "./pages/balance/BalanceReplinish";
import BalanceHistory from "./pages/balance/BalanceHistory";
// import HistoryBalanceChangeDelete from "./view/balance/HistoryBalanceChangeDelete.jsx";
//
// import "./framework/components/style.css";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="?" element={ <Layout /> }>
                    <Route index element={ <CostIndex /> }/>
                    <Route path="cost/create" element={ <CostCreate /> }/>
                    <Route path="cost/update/:uuid" element={ <CostUpdate /> }/>
                    <Route path="cost/delete/:uuid" element={ <CostDelete />}/>

                    <Route path="category/index" element={ <CategoryIndex /> }/>
                    <Route path="category/create" element={ <CategoryCreate /> }/>
                    <Route path="category/update/:uuid" element={ <CategoryUpdate /> }/>
                    <Route path="category/delete/:uuid" element={ <CategoryDelete />}/>

                    <Route path="balance/index" element={ <BalanceIndex /> }/>
                    <Route path="balance/replenish" element={ <BalanceReplenish /> }/>
                    <Route path="balance/history" element={ <BalanceHistory /> }/>
                {/*    <Route path="balance/history/delete/:uuid" element={ <HistoryBalanceChangeDelete /> }/>*/}
                </Route>
            </Routes>
        </>
    );
}