import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Slider from "react-slick";
import Select from 'react-select';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import "../styles/home.css"
import "react-multi-carousel/lib/styles.css";
import DashboardCard from "../components/layouts/Dashboard/DashboardCard"
import ConnectWallet from "./ConnectWallet";
import axios from 'axios';


function Dashboard() {
    return (
        <div className="home-main">
            <Header
                active="dashboard"
            />
            <DashboardCard />
            <Footer />
        </div>
    )
}
export default Dashboard;
