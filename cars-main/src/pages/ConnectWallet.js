import "../styles/Common-old.css"
import { Button, Container, Image, Col, Row, Card } from 'react-bootstrap';
import metalogo from "../assets/metamask-logo.webp";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import { ethers } from "ethers";
import React, { useState } from "react";

function ConnectWallet(){
    const [data, setdata] = useState({
	address: "",
	Balance: null,
});

// Button handler button for handling a
// request event for metamask
const btnhandler = () => {
    // alert(localStorage.getItem('garageitems'));

	// Asking if metamask is already present or not
	if (window.ethereum) {

	// res[0] for fetching a first wallet
	window.ethereum
		.request({ method: "eth_requestAccounts" })
		.then((res) => accountChangeHandler(res[0]));
	} else {
	alert("install metamask extension!!");
	}
};

// getbalance function for getting a balance in
// a right format with help of ethers
const getbalance = (address) => {

	// Requesting balance method
	window.ethereum
	.request({
		method: "eth_getBalance",
		params: [address, "latest"]
	})
	.then((balance) => {
		// Setting balance
        
		setdata({
		Balance: ethers.utils.formatEther(balance),
        address:address		});
        sessionStorage.setItem("meta_balance", balance);    
        window.location.href = '/dashboard';      
	});
};

// Function for getting handling all events
const accountChangeHandler = (account) => {
	
  
  // Setting an address data
	setdata({
	address: account,
	});
    sessionStorage.setItem("meta_address", account);         

	// Setting a balance
	getbalance(account);
};
    return(
        <div className="wallet-main"> 
        <Header />
            <h3 className="mt-3">Connect your wallet.</h3>
            <div className="d-flex m-auto justify-content-center wallet-cardlist">
            <Card className="wallet-card p-2 w-100" onClick={btnhandler}>
                <img src={metalogo} className="width50"></img>
                <p className="p-0 m-0 d-flex align-items-center"> MetaMask</p>
                
            </Card>
            </div>
            {/* <p>Address: {data.address}</p>
            <p>Balance: {data.Balance}</p> */}
        </div>
    );

}

export default ConnectWallet;

