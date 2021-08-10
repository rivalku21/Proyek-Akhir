import React, { useState, useEffect } from 'react';
import './style.css';
import { useLocation } from 'react-router';
import { Card, Button, FormGroup, Form } from 'react-bootstrap';
import { Modal, ModalBody, ModalFooter, Input } from 'reactstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import pdffile from '../../img/pdflogo.png'
import { appServices, uploads } from '../../services';

const ResultPage = () =>{
    const location = useLocation();
    const data = location.state;
    const checking = data.result <= 60;

    const word = data.data.split(" ");

    const objek = Object.entries(word);
    const arrayFormat = objek.map(entry => Object.assign({'word': entry[1]}));

    // const display = Array.prototype.map.call(data.data, function(item) {
    //     return item + ' ';
    // })

    const [lectureList, setLectureList] = useState([]);

    useEffect(() => {
        appServices.lectureList().then((result) => {
            setLectureList(result.data);
        });
    }, []);

    const [modalSave, setModalSave] = useState(false);
    const [dataPost, setDataPost] = useState({
        title: '',
        author: '',
        nim: '',
        lecture1: '',
        lecture2: '',
        year: '',
        filename: data.filename,
    });

    const changeHandler = (e) => {
        setDataPost({ ...dataPost, [e.target.id]: e.target.value });
    }

    const toggleSave = () => {
        return setModalSave(!modalSave);
    }

    const backHome = () => {
        window.location.replace('/');
    }

    const submitSave = () => {
        uploads(dataPost)
        // console.log(dataPost)
        .finally(() => {
            // toggleSave();
            window.location.replace('/');
        });
        setDataPost({});
    }

    if (checking) {
        return(
            <div className="container resultPage">
                <h1>PLAGIARISM CHECKER</h1>
                <div className="row">
                    <div className="col-sm-9">
                        <Card className="textWrapper">
                            <Card.Body className="scroll">
                                {arrayFormat.map((word) => {
                                    const y = data.doc.includes(word.word.toLowerCase().replace(/[^a-z0-9 ]/g,""))
                                    if (y) {
                                        return <span className={word.word} style={{backgroundColor: 'red', color: 'white'}}>{word.word} </span>
                                    } else {
                                        return <span className={word.word}>{word.word} </span>
                                    }
                                })}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="resultCheck col-sm-3">
                        <div className="percentResult">
                            <h1 style={{display:'inline-block'}}>{data.result}</h1><span> % Indicated</span>
                            <hr />
                        </div>
                        <Button className="btn btn-success" onClick={toggleSave}><b>Save</b></Button>
                        <div><p>You're safe, click the safe button to save the file to the database.</p></div>
                    </div>
                </div>
                <div>
                    <Modal isOpen={modalSave} toggle={toggleSave} className="modal-xl">
                        <ModalHeader toggle={toggleSave}>
                            <b>Save File</b>
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <img className="pdfLogo" alt="pdfLogo" src={pdffile} style={{height:'300px'}} />
                                        </div>
                                        <div className="col-sm-8">
                                            <table>
                                                <tr>
                                                    <td style={{width:'20%'}}>Title</td>
                                                    <td>:</td>
                                                    <td style={{width:'80%'}}>
                                                        <FormGroup>
                                                            <Input 
                                                                type="text"
                                                                name="title"
                                                                id="title"
                                                                placeholder="Insert your File Title"
                                                                onChange={changeHandler}
                                                            />
                                                        </FormGroup>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{width:'20%'}}>Author</td>
                                                    <td>:</td>
                                                    <td style={{width:'80%'}}>
                                                        <FormGroup>
                                                            <Input 
                                                                type="text"
                                                                name="author"
                                                                id="author"
                                                                placeholder="Insert your Name"
                                                                onChange={changeHandler}
                                                            />
                                                        </FormGroup>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{width:'20%'}}>Student's Number</td>
                                                    <td>:</td>
                                                    <td style={{width:'80%'}}>
                                                        <FormGroup>
                                                            <Input 
                                                                type="text"
                                                                name="nim"
                                                                id="nim"
                                                                placeholder="Insert your student’s number"
                                                                onChange={changeHandler}
                                                            />
                                                        </FormGroup>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{width:'20%'}}>Lecture 1</td>
                                                    <td>:</td>
                                                    <td style={{width:'80%'}}>
                                                        <FormGroup>
                                                            <Form.Control 
                                                                as="select"
                                                                id="lecture1"
                                                                onChange={changeHandler}
                                                            >
                                                                <option>Choose Lecture</option>
                                                                {lectureList.map((data, i) => {
                                                                    return(
                                                                        <option value={data[0]}>{data[0]} ({data[1]})</option>
                                                                    )
                                                                })}
                                                                <option>Other</option>
                                                            </Form.Control>
                                                        </FormGroup>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{width:'20%'}}>Lecture 2</td>
                                                    <td>:</td>
                                                    <td style={{width:'80%'}}>
                                                        <FormGroup>
                                                            <Form.Control
                                                                as="select"
                                                                id="lecture2"
                                                                onChange={changeHandler}
                                                            >
                                                                <option>Choose Lecture</option>
                                                                {lectureList.map((data) => {
                                                                    return(
                                                                        <option value={data[0]}>{data[0]} ({data[1]})</option>
                                                                    )
                                                                })}
                                                                <option>Other</option>
                                                            </Form.Control>
                                                        </FormGroup>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{width:'20%'}}>Year</td>
                                                    <td>:</td>
                                                    <td style={{width:'80%'}}>
                                                        <FormGroup>
                                                            <Input 
                                                                type="text"
                                                                name="year"
                                                                id="year"
                                                                placeholder="Insert year"
                                                                onChange={changeHandler}
                                                            />
                                                        </FormGroup>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter className="footer">
                            <Button
                                variant="success"
                                onClick={(e) => {
                                e.preventDefault();
                                submitSave();
                            }}>
                                Save
                            </Button>

                            <Button onClick={toggleSave} variant="outline-secondary">
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    } else {
        return(
            <div className="container resultPage">
                <h1>PLAGIARISM CHECKER</h1>
                <div className="row">
                    <div className="col-sm-9">
                        <Card className="textWrapper">
                            <Card.Body className="scroll">
                                {arrayFormat.map((word) => {
                                    const y = data.doc.includes(word.word.toLowerCase().replace(/[^a-z0-9 ]/g,""))
                                    if (y) {
                                        return <span className={word.word} style={{backgroundColor: 'red', color: 'white'}}>{word.word} </span>
                                    } else {
                                        return <span className={word.word}>{word.word} </span>
                                    }
                                })}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="resultCheck col-sm-3">
                        <div className="percentResult">
                            <h1 style={{display:'inline-block'}}>{data.result}</h1><span> % Indicated</span>
                            <hr />
                        </div>
                        <Button onClick={backHome} className="btn btn-danger"><b>Danger</b></Button>
                        <div><p>Sorry you're danger, we can't forward your files to our database</p></div>
                    </div>
                </div>
            </div>   
        )
    }
}

export default ResultPage;