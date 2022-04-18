import {
Home, Dashboard , ConnectWallet, NFTDetail, Logout
} from "../pages/index";

const routes = [
    { path: "/", exact: true, name: "Home", component: Home },
    { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
    { path: "/connectwallet", exact: true, name: "ConnectWallet", component: ConnectWallet },
    { path: "/NFTDetail", exact: true, name: "NFTDetail", component: NFTDetail },
    { path: "/Logout", exact: true, name: "Logout", component: Logout },
];

export default routes;
