import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { appServices } from '../../services';
import './final_project.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { Button, FormGroup } from 'react-bootstrap';
import pdffile from '../../img/pdflogo.png'
import { Header } from '../../component';

const Final_Project = () => {
    const [modalDetail, setModalDetail] = useState(false);
    const [dataFinal, setData] = useState([]);

    useEffect(() => {
        appServices.getAllData().then((result) => {
            setData(result.data);
        });
    }, []);

    const [detail, setDetail] = useState([]);
    // useEffect((dataFinal, id) => {
    //     appServices.getDataId(id).then((result) => {
    //         setDetail(result.data);
    //     });
    // });

    const toggleDetail = (event) => {
        const id = event.target.id
        appServices.getDataId(id).then((result) => {
            // console.log(result.data[0]);
            setDetail(result.data[0]);
        })
        return setModalDetail(!modalDetail);
    }

    var inputSearch = (e) => {
        const value = e.target.value;
        if (e.keyCode === 13) {
            e.preventDefault();
            appServices.search(value).then((result) => {
                setData(result.data);
            });
        }
    }

    return (
        <>
        <Header />
        <div className="finalBody">
            <h1>OUR PROUD PROJECT</h1>
            <Container>
                <div>
                    <Input id="inputSearchId" className="search" type="text" placeholder="Search" style={{width:'40%', margin:'auto', display:'inline-block'}} onKeyUp={inputSearch} />
                    {/* <Button style={{marginLeft:'10px',display:'inline-block'}}>Search</Button> */}
                </div>
                <Card className="cardData" style={{width:'100%', height:'100%', color:'black', top:'20px'}}>
                    <Card.Body className="cardBody">
                        <div className="row" align="left">
                            <div className="col-sm-1" />
                            <div className="col-sm-10">
                                <table>
                                    <tr style={{ marginBottom: '10px'}}>
                                        <th width="50%">Title</th>
                                        <th width="35%">Author</th>
                                        <th width="15%">Year</th>
                                        <th></th>
                                    </tr>
                                    {dataFinal.map((data, key) => {
                                        return (
                                            // <p>{data}</p>
                                            <tr key={key}>
                                                <td><div style={{ width: '98%', marginBottom: '10px' }}>{data.title}</div></td>
                                                <td><div style={{ width: '98%' }}>{data.author}</div></td>
                                                <td>{data.year}</td>
                                                <td>
                                                    <Button className="btnDetail" id={data.id} variant="outline" onClick={toggleDetail}>Detail</Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <div>
                    <Modal isOpen={modalDetail} toggle={toggleDetail} className="modal-xl">
                        <ModalHeader toogle={toggleDetail}>
                            <b>Final Project Detail</b>
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <img className="pdflogo" alt="pdflogo" src={pdffile} style={{height:'300px', width:'300px'}}></img>
                                        </div>
                                        <div className="col-sm-8">
                                            {/* {detail.map((data) => {
                                                return( */}
                                                    <table className="detailBody">
                                                        <tr>
                                                            <td style={{width:'20%', height:'50px'}}><h6>Title</h6></td>
                                                            <td><h6>:</h6></td>
                                                            <td style={{width:'100%'}}>
                                                                <h6>{detail.title}</h6>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{height:'50px'}}><h6>Author</h6></td>
                                                            <td><h6>:</h6></td>
                                                            <td>
                                                                <h6>{detail.author}</h6>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{height:'50px'}}><h6>NIM</h6></td>
                                                            <td><h6>:</h6></td>
                                                            <td>
                                                                <h6>{detail.nim}</h6>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{height:'50px'}}><h6>Lecture 1</h6></td>
                                                            <td><h6>:</h6></td>
                                                            <td>
                                                                <h6>{detail.lecture1}</h6>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{height:'50px'}}><h6>Lecture 2</h6></td>
                                                            <td><h6>:</h6></td>
                                                            <td>
                                                                <h6>{detail.lecture2}</h6>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{height:'50px'}}><h6>Year</h6></td>
                                                            <td><h6>:</h6></td>
                                                            <td>
                                                                <h6>{detail.year}</h6>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                {/* )
                                            })} */}
                                        </div>
                                    </div>
                                </div>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter className="footer">
                            {/* <Button><a href={detail.path} target="_blank" style={{ textDecoration: 'none', color: 'white' }}>Download</a></Button> */}
                            <Button onClick={toggleDetail} variant="outline-secondary">
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Container>
        </div>
        </>
    )
}

export default Final_Project;
