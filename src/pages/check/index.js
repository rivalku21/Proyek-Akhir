import React, { useState } from 'react';
import './style.css'
import { Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import BaseService from '../../services/baseService';
import API from '../../config/rest';

const Check = () => {
    const location = useLocation();
    const data = location.state;
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();

    const dataCheck = {
        file: data.data,
        filename: data.path
    }

    const result = () => {

        setLoading(true);

        BaseService.post(API.CHECK, dataCheck).then((res) => {
            console.log(res);

            setLoading(false);

            history.push({
                pathname:'/result',
                state:{
                    filename: res.filename,
                    result: res.result,
                    data: data.data
                }
            })
        })
    }

    return(
        <div className="container checkPage">
            <h1>PLAGIARISM CHECKER</h1>
            <div className="row">
                <div className="col-sm-9">
                    <Card className="textWrapper">
                        <Card.Body className="scroll">
                            <p>{data.data}</p>
                        </Card.Body>
                    </Card>
                </div>
                <div className="buttonCheck">
                    <button className="btn btn-success" onClick={result} disabled={isLoading}>CHECK PLAGIARISME</button>
                    <br />
                    <Link to="/"><button className="btn btn-danger">CENCEL</button></Link>
                    <p>Note: This will only check into our database*</p>
                </div>
            </div>
        </div>
    )
}

export default Check;