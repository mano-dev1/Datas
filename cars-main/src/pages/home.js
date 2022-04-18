import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Card } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import "../styles/home.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';


// const appId = "pChcqlQydBKVaB6azuPEZhqrq2UXe6tELzQnKwXn";
// const serverURL = "https://jdn1cylofwue.usemoralis.com:2053/server";
// Moralis.start({ serverURL, appId });


function Home() {
    const [selectedOption, setSelectedOption] = useState();
    const [data, setdata] = useState({
        address: "",
        balance: null,
    });
    const [images, setImages] = useState({

    });


    const [nftList, setNftList] = useState([])

    useEffect(() => {
        // getNFTs()
        console.log(
            "getNFTs called"
        )
        getAllTokenIdsBasedOnCollectionCars()
        getAllNftsBasedOnCollectionGarage()
    }, [])


    const getAllNftsBasedOnUser = (address) => {
        const apiKey = "pmlRXn3MjCRPW3RMAZp-CVB_6soqFEtB";
        const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}/getNFTs/`;
        const ownerAddr = address
        // || "0xA7b0A836DE227e48B7b1dCfDE69b4683Fa56EC43";
        var config = {
            method: 'get',
            url: `${baseURL}?owner=${ownerAddr}`
        };

        let nftsList = []
        axios(config)
            .then(response => {
                console.log(response.data)

                let ownedNfts = response.data.ownedNfts

                ownedNfts.map(ite => {

                    if (ite.contract.address == "0xD1aAf4AfbB287d4d0190848341ce39EF10c37d47") {
                        nftsList.push({
                            title: ite.metadata.name,
                            image: ite.metadata.image,
                            attributes: ite.metadata.attributes,
                            tokenId: ite.metadata.tokenId,
                        })
                    }
                })

                setNftList(nftsList)
            })
            .catch(error => console.log(error));

    }

    const [allNftsByContract, setAllNftsByContract] = useState([])

    const getAllTokenIdsBasedOnCollectionCars = () => {
        // replace with your Alchemy api key
        const contractAddr = "0xA7b0A836DE227e48B7b1dCfDE69b4683Fa56EC43";
        const baseURL = `https://deep-index.moralis.io/api/v2/nft/${contractAddr}?chain=mumbai&format=decimal&limit=10`;


        fetch("https://deep-index.moralis.io/api/v2/nft/0xD1aAf4AfbB287d4d0190848341ce39EF10c37d47?chain=mumbai&format=decimal&limit=10", {
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
            let data = []
            for (let r of res?.result) {
                console.log(JSON.parse(r.metadata))
                let metadata = JSON.parse(r.metadata)
                data.push({
                    ...r,
                    metadata
                })
            }
            console.log(res, "ress----")
            console.log(data, "data ----> data new")
            setAllNftsByContract(data)
        })
    }
    const [garageItems, setGarageItems] = useState([])

    const getAllNftsBasedOnCollectionGarage = () => {
        const contractAddr = "0x038F593536c1fD6b05b391F042635ba9F5Af5948";
        const baseURL = `https://deep-index.moralis.io/api/v2/nft/${contractAddr}?chain=mumbai&format=decimal&limit=10`;


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
            let data = []
            for (let r of res?.result) {
                console.log(JSON.parse(r.metadata))
                let metadata = JSON.parse(r.metadata)
                data.push({
                    ...r,
                    metadata
                })
            }
            console.log(res, "ress----")
            console.log(data, "data ----> garage")
            setGarageItems(data)

        })

    }
    // Moralis.initialize("pChcqlQydBKVaB6azuPEZhqrq2UXe6tELzQnKwXn");
    // Moralis.serverURL = "https://jdn1cylofwue.usemoralis.com:2053/server";


    async function getNFTs() {

        try {
            const options = {
                chain: 'mumbai',
                address: '0xA7b0A836DE227e48B7b1dCfDE69b4683Fa56EC43' //metamask integration
                // replace this address with ([account]) react
            }

            // const nfts = await Moralis.Web3.getNFTs(options);
            // console.log(nfts, "nft lIst");
            // setNftList(nfts)
            let nftList = []
            // nfts.forEach(function (nft) {
            //     let url = fixURL(nft.token_uri);
            //     let imageUrl = ""
            //     fetch(url)
            //         .then(response => response.json())
            //         .then(data => {
            //             console.log("data");
            //             nftList.push({
            //                 ...nft,
            //                 image: data.image
            //             })
            //         });
            // })
            setNftList(nftList)
        } catch (err) {
            {
                console.log(err)
            }
        }


    }

    // const handleChange = (selectedOption) => {
    //     setSelectedOption(selectedOption);
    //     console.log(selectedOption);
    // };

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const handleCar = (event, item) => {
        console.log(item);
        localStorage.setItem('currentAllNftsByContract', JSON.stringify(item));
        localStorage.removeItem("currentGarageitems");
        window.location.href = '/NFTDetail';
    }

    const handleGarage = (event, item) => {
        console.log(item);
        localStorage.setItem('currentGarageitems', JSON.stringify(item));
        localStorage.removeItem("currentAllNftsByContract");
        window.location.href = '/NFTDetail';
    }

    return (
        <div className="home-main">
            <Header
                active="home"
            />
            <Container>
                <h3>Garage</h3>
                <Row>
                    <Col >
                        <Carousel responsive={responsive}>
                            {
                                // nftList?.map(ite => {
                                garageItems?.map(ite => {
                                    localStorage.setItem('garageitems', JSON.stringify(garageItems));
                                    return <>
                                        <Card className="creators m-3" onClick={(elem) => handleGarage(elem, ite)}>
                                            <div className="creatorImg">
                                                <img className="creatorImgImg" src={ite?.metadata?.image}></img>
                                            </div><hr />
                                            <div className="creatorcheck mt-3">
                                                <h3>Name : {ite?.metadata?.name}</h3>
                                                <p>Token ID : {ite?.metadata?.tokenId}</p>
                                            </div>
                                        </Card>

                                    </>
                                })
                            }

                        </Carousel>
                    </Col>
                </Row>
            </Container>

            <Container>
                <h3>Cars</h3>
                <Row>
                    <Col >
                        <Carousel responsive={responsive}>
                            {
                                allNftsByContract?.map((ite, elem) => {
                                    localStorage.setItem('allNftsByContract', JSON.stringify(allNftsByContract));
                                    return <>
                                        <Card className="creators m-3" onClick={(elem) => handleCar(elem, ite)}>
                                            <div className="creatorImg">
                                                <img className="creatorImgImg" src={ite?.metadata?.image}></img>
                                            </div><hr />
                                            <Row className="creatorcheck mt-3 text-left m-2 text-dark">
                                                <Row>
                                                    <Col lg={8}>
                                                        {ite.name}
                                                    </Col>
                                                    <Col lg={4} className="text-right">
                                                        {ite.amount}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={8}>
                                                        {ite.token_id}
                                                    </Col>
                                                    <Col lg={4} className="text-right">
                                                        0, 006
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={12} className="text-right">
                                                        56
                                                    </Col>
                                                </Row>

                                            </Row>
                                        </Card>
                                    </>
                                })
                            }
                        </Carousel>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Home;