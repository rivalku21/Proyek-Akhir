import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import './style.css';
import { Link } from 'react-router-dom';
import { uploads } from '../../services';

const Register = () => {
  const [isLoginLoading, setLoginLoading] = useState(false);
  const [userPost, setUserPost] = useState({
    name: '',
    nim: '',
    password: '',
    password2: '',
  });

  const changeHandler = (e) => {
    setUserPost({ ...userPost, [e.target.id]: e.target.value });
  }

  const submitUser = async() => {
    setLoginLoading(true);
    const register = await uploads.register(userPost);
    console.log(register.statusCode);
    if (register.statusCode == 201) {
        setLoginLoading(false);
        alert(register.message);
        window.location.replace('/login');
    } else {
        setLoginLoading(false);
        alert(register.message);
    }
  }

  return (
      <div>
        <Card className="text-center" border="dark" style={{width:'24rem', margin:'auto', marginTop:'5%'}}>
            <CardTitle>
                Register
            </CardTitle>
            <CardBody>
                <Form>
                    <FormGroup>
                        <h5 className="data">Name</h5>
                        <Input 
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Insert your Name"
                            onChange={changeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <h5 className="data">Student’s Number</h5>
                        <Input 
                            type="number"
                            name="nim"
                            id="nim"
                            placeholder="Insert your Student's Number"
                            onChange={changeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <h5 className="data">Password</h5>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Insert Your Password"
                            onChange={changeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <h5 className="data">Confirmation Password</h5>
                        <Input
                            type="password"
                            name="password2"
                            id="password2"
                            placeholder="Confirm Your Password"
                            onChange={changeHandler}
                        />
                    </FormGroup>
                    <div className="buttonRegister">
                        <Button
                            color="primary"
                            onClick={(e) => {
                                e.preventDefault();
                                submitUser();
                            }}
                            disabled={isLoginLoading}
                        >
                            Register
                        </Button>
                    </div>
                </Form>
            </CardBody>
            <CardFooter>
                <div className="footer">
                    <Link to="/login">already have an account</Link>
                </div>
            </CardFooter>
        </Card>
      </div>
  )
};

export default Register;
