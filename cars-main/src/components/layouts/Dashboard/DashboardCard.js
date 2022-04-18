import image1 from "../../../assets/images/1.png";
import image2 from "../../../assets/images/2.png";
import { Button, Col, Container, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from "react";
import "../../../styles/dashboard.css"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function DashboardCard() {
    var address = sessionStorage.getItem("meta_address");

    const [allNftsByContract, setAllNftsByContract] = useState([]);
    const [partItems, setPartItems] = useState([]);
    const [garageItems, setGarageItems] = useState([]);

    const dummy = (acc) => {
        console.log("Garage")
        const contractAddr = "0x038F593536c1fD6b05b391F042635ba9F5Af5948"; // garage address
        const baseURL = `https://deep-index.moralis.io/api/v2/${acc}/nft/${contractAddr}?chain=mumbai&format=decimal`;


        fetch(baseURL, {
            "headers": {
                "accept": "application/json",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-api-key": "p72dE7dMzl0pEE8w7rDiXEpGULKHVL3qcyiUz8qSV5l7hv46kXt2GHIRdH7IPZUl"
            },
        }).then(res => {
            return res.json()
        }).then(res => {
            let data = []
            for (let r of res?.result) {
                let metadata = JSON.parse(r.metadata)
                data.push({
                    ...r,
                    metadata
                })
            }
            console.log(res, "ress----")
            console.log(data, "data ----> Garage")
            setGarageItems(data)
        })
    }
    useEffect(() => {
        // getNFTs()
        console.log(
            "getNFTs called"
        )

    }, [])
    window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => { dumy(res[0]); dumypart(res[0]); dumypart2(res[0]) })


    const dumy = (acc) => {
        console.log("car")
        const contractAddr = "0xD1aAf4AfbB287d4d0190848341ce39EF10c37d47"; // Car address
        const baseURL = `https://deep-index.moralis.io/api/v2/${acc}/nft/${contractAddr}?chain=mumbai&format=decimal`;


        fetch(baseURL, {
            "headers": {
                "accept": "application/json",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-api-key": "p72dE7dMzl0pEE8w7rDiXEpGULKHVL3qcyiUz8qSV5l7hv46kXt2GHIRdH7IPZUl"
            },
        }).then(res => {
            // setAllNftsByContract(res?.result)
            return res.json()
        }).then(res => {
            let data2 = []
            for (let r of res?.result) {
                let metadata = JSON.parse(r.metadata)
                data2.push({
                    ...r,
                    metadata
                })
            }
            console.log(res, "ress----")
            console.log(data2, "data ----> car")
            setAllNftsByContract(data2)
        })
    }

    const dumypart = (acc) => {
        console.log("part")
        const contractAddr = "0x038F593536c1fD6b05b391F042635ba9F5Af5948"; // Car address
        const baseURL = `https://deep-index.moralis.io/api/v2/${acc}/nft/${contractAddr}?chain=mumbai&format=decimal`;


        fetch(baseURL, {
            "headers": {
                "accept": "application/json",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-api-key": "p72dE7dMzl0pEE8w7rDiXEpGULKHVL3qcyiUz8qSV5l7hv46kXt2GHIRdH7IPZUl"
            },
        }).then(res => {
            // setAllNftsByContract(res?.result)
            return res.json()
        }).then(res => {
            let data2 = []
            for (let r of res?.result) {
                let metadata = JSON.parse(r.metadata)
                data2.push({
                    ...r,
                    metadata
                })
            }
            console.log(res, "ress----")
            console.log(data2[0], "data ----> parts")
            setPartItems(data2)
        })
    }
        const dumypart2 = (acc) => {
        console.log("parts")
        const contractAddr = "0x9250dc911d3fB29AFEFc93B4E6369BAaB1FcFd98"; // Car address
        const baseURL = `https://deep-index.moralis.io/api/v2/${acc}/nft/${contractAddr}?chain=mumbai&format=decimal`;


        fetch(baseURL, {
            "headers": {
                "accept": "application/json",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-api-key": "p72dE7dMzl0pEE8w7rDiXEpGULKHVL3qcyiUz8qSV5l7hv46kXt2GHIRdH7IPZUl"
            },
        }).then(res => {
            // setAllNftsByContract(res?.result)
            return res.json()
        }).then(res => {
            let data2 = []
            for (let r of res?.result) {
                let metadata = JSON.parse(r.metadata)
                data2.push({
                    ...r,
                    metadata
                })
            }
            console.log(res, "ress----")
            console.log(data2, "data ----> parts")
            setGarageItems(data2)
        })
    }

    const handleCar = (event, item) => {
        console.log(item);
        localStorage.setItem('currentAllNftsByContract', JSON.stringify(item));
        localStorage.removeItem("currentGarageitems");
        localStorage.removeItem("currentPartitems");
        window.location.href = '/NFTDetail';
    }

    const handleGarage = (event, item) => {
        console.log(item);
        localStorage.setItem('currentGarageitems', JSON.stringify(item));
        localStorage.removeItem("currentAllNftsByContract");
        localStorage.removeItem("currentPartitems");
        window.location.href = '/NFTDetail';
    }
    const handlePart = (event, item) => {
        console.log(item);
        localStorage.setItem('currentPartitems', JSON.stringify(item));
        localStorage.removeItem("currentGarageitems");
        localStorage.removeItem("currentAllNftsByContract");
        window.location.href = '/NFTDetail';
    }

    return (
        <div>
            <div className={address ? "dis-none" : ""}>
                <h1>Connect your wallet</h1>
            </div>
            <Container className={address ? "dash-main" : "dis-none"}>
                <div className="dash-head">
                    <img className="dash-Img" src={image1}></img>
                    <Card className="m-1">
                        <p className="p-2 m-0">{address}</p>
                    </Card>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Cars</Tab>
                        <Tab>Garage</Tab>
                        <Tab>Parts</Tab>
                    </TabList>

                    <TabPanel>
                        <Row> 
                            {
                                allNftsByContract?.map(ite => {
                                    return <>
                                        <Col lg={3} md={4} sm={6} xs={12}>
                                            <Card className="creators m-3"  onClick={(elem) => handleCar(elem, ite)}>
                                                <div className="creatorImg">
                                                    <img className="creatorImgImg" src={ite?.metadata?.image}></img>
                                                </div>
                                                <div className="creatorcheck mt-3">
                                                    <h3>Name : {ite?.metadata?.name}</h3>
                                                    <p>Token ID : {ite?.metadata?.tokenId}</p>
                                                </div>
                                            </Card>
                                        </Col>
                                    </>
                                })}
                        </Row>
                    </TabPanel>
                    <TabPanel>
                        <Row>
                            {
                                garageItems?.map(ite => {
                                    return <>
                                        <Col lg={3} md={4} sm={6} xs={12}>
                                            <Card className="creators m-3"  onClick={(elem) => handleGarage(elem, ite)}>
                                                <div className="creatorImg">
                                                    <img className="creatorImgImg" src={ite?.metadata?.image}></img>
                                                </div>
                                                <div className="creatorcheck mt-3">
                                                    <h3>Name : {ite?.metadata?.name}</h3>
                                                    <p>Token ID : {ite?.metadata?.tokenId}</p>
                                                </div>
                                            </Card>
                                        </Col>
                                    </>
                                })}
                        </Row>
                    </TabPanel>
                    <TabPanel>
                        <Row> 
                            {
                                partItems?.map(ite => {
                                    return <>
                                        <Col lg={3} md={4} sm={6} xs={12}>
                                            <Card className="creators m-3"  onClick={(elem) => handlePart(elem, ite)}>
                                                <div className="creatorImg">
                                                    <img className="creatorImgImg" src={ite?.metadata?.image}></img>
                                                </div>
                                                <div className="creatorcheck mt-3">
                                                    <h3>Name : {ite?.metadata?.name}</h3>
                                                    <p>Token ID : {ite?.metadata?.tokenId}</p>
                                                </div>
                                            </Card>
                                        </Col>
                                    </>
                                })}
                        </Row>
                    </TabPanel>
                </Tabs>
            </Container>
        </div>
    );
}

export default DashboardCard;