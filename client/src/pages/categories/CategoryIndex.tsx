// import React from "react";
// import {Link} from "react-router-dom";
// import {Category} from "../../types/types";
//
// import Grid from "../../components/grid/Grid";
// // import GridDeleteButton from "../../framework/components/grid/buttons/delete/GridDeleteButton.jsx";
// // import GridUpdateButton from "../../framework/components/grid/buttons/update/GridUpdateButton.jsx";
//
// const config = {
//     requestEndpoint: 'http://localhost:5000/categories',
//     fields: {
//         name: {
//             text: 'Name',
//             sort: true,
//             value: (category: Category) => {
//                 return category.name;
//             }
//         }
//     },
//     options: {
//         sort: {
//             default: {key: 'name', direction: 'asc'}
//         },
//         pageSize: 5
//     },
//     buttons: [
//         // {
//         //     key: 'update',
//         //     component: GridUpdateButton,
//         //     createUrl: (uuid: string): string => {
//         //         return `/category/update/${uuid}`
//         //     }
//         // },
//         // {
//         //     key: 'delete',
//         //     component: GridDeleteButton,
//         //     createUrl: (uuid: string): string => {
//         //         return `/category/delete/${uuid}`;
//         //     }
//         // }
//     ]
// }
//
// export default function CategoryIndex() {
//     return (
//         <>
//             <h1>Categories</h1>
//             <Link to="/category/create">Add</Link>
//             {/*<Grid*/}
//             {/*    requestEndpoint={config.requestEndpoint}*/}
//             {/*    fields={config.fields}*/}
//             {/*    options={config.options}*/}
//             {/*    buttons={config.buttons}*/}
//             {/*/>*/}
//         </>
//     );
// }