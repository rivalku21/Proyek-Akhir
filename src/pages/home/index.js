import React, { useRef, useState } from 'react';
import BaseService from '../../services/baseService';
import API from '../../config/rest'
import './Home.css';
import { useHistory } from 'react-router';

const Home = () => {
    // window.location.reload();
    const [file, setFile] = useState('');
    // const [dataFile, setData] = useState({ path: '', data: '' });
    const [isLoading, setLoading] = useState(false);
    const el = useRef();
    const history = useHistory();

    const handleChange = (e) => {
        setLoading(false)
        const file = e.target.files[0];
        console.log(file);
        setFile(file);
    }

    const uploadFile = () => {
        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);

        BaseService.post(API.UPLOAD, formData).then((res) => {
            // res.JSON({
            //     path: res.data.path,
            //     data: res.data.data
            // })
            // setData({
            //     path: res.path,
            //     data: res.data
            // })
            // history.push({pathname:"/uploads", state: dataFile});
            // setLoading(false);
            // window.location.replace('/uploads');

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

    return (
        <div className="container">
            <div className="body-part">
                <h1>PLAGIARISM CHECKER</h1>
                <p>We are an Anti-Cheating Squad Diploma of Telecommunication Technology Be Aware!!</p>
                <div className="file-upload">
                    <input type="file" id="file" name="file" accept="application/pdf" ref={el} onChange={handleChange} required />
                </div>
                <button onClick={uploadFile} className="btn btn-success upbutton" disabled={isLoading}>UPLOAD</button>
            </div>
        </div>
    )
}

export default Home;
