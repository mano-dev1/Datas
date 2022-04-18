import "../styles/Common-old.css"
import { Button, Container, Image, Col, Row, Card } from 'react-bootstrap';
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import image1 from "../assets/images/1.png";
import "../styles/detail.css"
import { useState } from "react";

function NFTDetail() {
    const [property, setProperty] = useState(false);
    const [about, setAbout] = useState(false);
    const [detail, setDetail] = useState(false);
    // const [detail, setDetail] = useState(false);
    var item;
    if (localStorage.getItem('currentAllNftsByContract')) {
        console.log("currentAllNftsByContract");
        item = JSON.parse(localStorage.getItem('currentAllNftsByContract'));
        console.log(item);
    }
    else if (localStorage.getItem('currentGarageitems')) {
        item = JSON.parse(localStorage.getItem('currentGarageitems'));
        // alert(item.token_address)
        console.log(item);

    }
    else if (localStorage.getItem('currentPartitems')) {
        item = JSON.parse(localStorage.getItem('currentGarageitems'));
        // alert(item.token_address)
        console.log(item);

    }

    return (
        <div className="detail-main">
            <Header />
            <Container>
                <Row>
                    <Col lg={5} lg={5} lg={5}>
                        <Card className="d-flex justify-content-center align-items-center my-3">
                            <img src={item?.metadata?.image} className="p-4 width400 mob-width400"></img>
                        </Card>
                        <Container className="detail-list">
                            <div onClick={() => { setProperty(!property) }}>
                                <label className="d-flex bold">Properties</label>
                            </div>
                            <div className={property ? "dis-block" : "dis-none"}><hr />
                                {
                                    item?.metadata?.attributes?.map(ite => {
                                        return (
                                            <div className="property-card">
                                                <h3>trait type : {ite.trait_type}</h3>
                                                <p>value : {ite.value}</p>
                                            </div>

                                        )
                                    })

                                }
                            </div>
                        </Container>
                        <Container className="detail-list">
                            <div onClick={() => { setAbout(!about) }}>
                                <label className="d-flex bold">About</label>
                            </div>
                            <div className={about ? "dis-block" : "dis-none"}>
                                <hr />
                                Just
                            </div>
                        </Container>
                        <Container className="detail-list mb-3">
                            <div onClick={() => { setDetail(!detail) }}>
                                <label className="d-flex bold">Detail</label>
                            </div>
                            <div className={detail ? "dis-block" : "dis-none"}><hr />
                                Just
                            </div>
                        </Container>
                    </Col>
                    <Col lg={7}>
                        <Container>
                            <h2 className="d-flex bold mt-3">{item.name}</h2>
                            <p className="d-flex bold mt-3">Token Address: {item.token_address}</p>
                            <p className="d-flex bold mt-3">Price: {item.amount}</p>

                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default NFTDetail;