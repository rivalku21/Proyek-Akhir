import React, { useRef, useState } from 'react';
import BaseService from '../../services/baseService';
import API from '../../config/rest';
import './style.css';
import { Link } from 'react-router-dom';

const UploadFile = () => {
    const [file, setFile] = useState('');
    const [dataFile, setData] = useState({ path: '', data: '' });
    const [isLoading, setLoading] = useState(false);
    const el = useRef();

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

        BaseService.post(API.UPLOAD, formData, (res) => {
            console.log(res.data);
            // res.JSON({
            //     path: res.data.path,
            //     data: res.data.data
            // })
            setData({
                path: res.data.path,
                data: res.data.data
            })
            // history.push({pathname:"/uploads", state: dataFile});
            // setLoading(false);
            // window.location.replace('/uploads');
        })
        // .finally(() => {
        //     setLoading(false);
        //     window.location.replace('/uploads');
        // }) 
    }

    return(
        <div>
            <div className="body-part">
                <h1>PLAGIARISM CHECKER</h1>
                <p>We are an Anti-Cheating Squad Diploma of Telecommunication Technology Be Aware!!</p>
                <div className="file-upload">
                    <input type="file" id="file" name="file" accept="application/pdf" ref={el} onChange={handleChange} required />
                </div>
                <Link onClick={uploadFile} to={{pathname:"/uploads", state: dataFile}} className="btn btn-success upbutton" disabled={isLoading}>UPLOAD</Link>
            </div>
        </div>
    );
}


export default UploadFile;