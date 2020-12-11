import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Checkbox, Row, Col, Card, Icon, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import axios from "axios";

const Login = (props) => {

    const [loginData, setLoginData] = useState({});
    const [list, setList] = useState([]);
    const history = useHistory();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setLoginData({...loginData, [name]: value});
    }

    const onLogin = () => {
        axios.post('http://localhost:8080/users/login', loginData)
            .then(res => {
                if (res && res.data && res.data._id) {
                    message.success("Login Successfully");
                    localStorage.setItem("token", res.data.email);
                    history.push("/userDashBord");
                }else{
                    message.error("Please Enter Valid Data..");
                }
            })
            .catch(err => {
                message.error("Please Enter Valid Data..");
            })
    }

    const onRegister = () => {
        history.push("/signup");
    }
    return (
        <>
            <Row style={{marginTop: 250}}>
                <Col span={8}/>
                <Col span={4}>
                    <Card bordered={false} className="login_card">
                        <h2>Login</h2>
                        <Form>
                            <Form.Item>
                                <Input name="email" placeholder="Please Input Your Username!" autoSave="false"
                                       value={loginData.email || ""} onChange={handleChange}
                                       addonBefore={<UserOutlined/>}/>
                            </Form.Item>

                            <Form.Item name="passWord">
                                <Input.Password name="password" placeholder="Please Input Your Password!"
                                                autoSave="false" value={loginData.password || ""}
                                                onChange={handleChange} addonBefore={<LockOutlined/>}/>
                            </Form.Item>
                            <Button type="primary" onClick={onLogin}>Login</Button>
                        </Form>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={false} className="register_card">
                        <h2 className="heading2">Sign Up</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.</p><br/>
                        <Button type="primary" onClick={onRegister}>
                            Register Now!
                        </Button>
                    </Card>
                </Col>
                <Col span={8}></Col>
            </Row>
        </>
    );
}
export default Login;