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
import { setCookie } from '../../utils/cookie';
import { authService } from '../../services';
import { Link } from 'react-router-dom';

const Login = () => {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginLoading, setLoginLoading] = useState(false);

  const onSubmit = async() => {
      setLoginLoading(true);
      const auth = await authService.login(nim, password);
      try {
        const cookieToken = auth.token;
        if (auth.statusCode == 200) {
            setLoginLoading(false);
            setCookie('token', JSON.stringify(cookieToken), 1000);
            window.location.replace('/');
        } else {
            alert("Student's Number or Password is incorrect!");
            setLoginLoading(false);
        }
      } catch (err) {
          console.log(err);
      }
  };

  

  return (
      <div>
        <Card className="text-center" border="dark" style={{width:'24rem', margin:'auto', marginTop:'5%'}}>
            <CardTitle>
                Login
            </CardTitle>
            <CardBody>
                <Form>
                    <FormGroup>
                        <h5 className="data">Student's Number</h5>
                        <Input
                            name="nim"
                            id="nim"
                            placeholder="Student's Number"
                            onChange={(e) => {
                                setNim(e.target.value);
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <h5 className="data">Password</h5>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </FormGroup>
                    <div className="buttonLogin">
                        <Button
                            color="primary"
                            onClick={(e) => {
                                e.preventDefault();
                                onSubmit();
                            }}
                            disabled={isLoginLoading}
                        >
                            Login
                        </Button>
                    </div>
                </Form>
            </CardBody>
            <CardFooter>
                <div className="footer">
                    <Link to="/register">or sign up here</Link>
                </div>
            </CardFooter>
        </Card>
      </div>
  )
};

export default Login;
