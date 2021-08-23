import React, { useRef, useState } from 'react';
import BaseService from '../../services/baseService';
import API from '../../config/rest'
import './Home.css';
import { useHistory } from 'react-router';
import { Loading } from '../../component';
import { Button, Modal } from 'react-bootstrap';
import questionMark from '../../img/question-circle-regular.png';
import chooseFile from '../../img/choose_file.gif';
import checking from '../../img/checking.gif';
import saveData from '../../img/save_data.gif';

const Home = () => {
    // window.location.reload();
    const [file, setFile] = useState('');
    const [show, setShow] = useState(false);
    // const [dataFile, setData] = useState({ path: '', data: '' });
    const [isLoading, setLoading] = useState(false);
    const el = useRef();
    const history = useHistory();

    const handleChange = (e) => {
        setLoading(false)
        const file = e.target.files[0];
        setFile(file);
    }

    const uploadFile = () => {
        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);

        BaseService.post(API.UPLOAD, formData).then((res) => {
            setLoading(false);

            history.push({
                pathname:"/uploads",
                state: {
                    path: res.path,
                    data: res.data
                }
            })
        })
    }
    if (isLoading) {
        // setTimeout(() => {
        //     alert("your document is not supported by the system or has too many words, try the original document");
        //     window.location.replace('/');
        // }, 50000);

        return (
            <Loading />
        )
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="container">
            <div className="body-part">
                <h1>PLAGIARISM CHECKER</h1>
                <p>We are an Anti-Cheating Squad Diploma of Telecommunication Technology Be Aware!!</p>
                <Button className="howTo" variant="primary" onClick={handleShow} >
                    <img src={questionMark} width='40px'></img>
                </Button>
                <div className="file-upload">
                    <input type="file" id="file" name="file" accept="application/pdf" ref={el} onChange={handleChange} required />
                </div>
                <button onClick={uploadFile} className="btn btn-success upbutton" disabled={isLoading}>UPLOAD</button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <Modal.Title>
                        How To Use Kipcheck
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        1. Prepare the file you want to check
                        <br />
                        2. Make sure the file is in (dot)pdf format
                        <br />
                        3. Make sure the data in the file is not more than 14000 words
                        <br />
                        4. Select your file and click upload
                        <img src={chooseFile} width="100%" style={{border:'1px solid black'}}></img>
                        5. Check again if the file is correct
                        <br />
                        6. Click "Check Plagiarism" button and we'll calculate the similarity of the data for you
                        <img src={checking} width="100%" style={{border:'1px solid black'}}></img>
                        7. If you are safe click the safe button and fill in the data to save the file to the database
                        <img src={saveData} width="100%" style={{border:'1px solid black'}}></img>
                        8. Finish
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home;
