import React, {useState} from 'react';
import {Menu, Switch, Divider, Row, Col, Button} from 'antd';
import {useHistory} from 'react-router-dom';

import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LinkOutlined,
} from '@ant-design/icons';

const {SubMenu} = Menu;

const UserDashBord = () => {
    const history = useHistory();
    const onShowUser = () =>{
        history.push("/user");
    }
    return (
        <>
            <div className="container-fluid">
                <Row>
                    <Col span={4}>
                        <Divider type="vertical"/>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                        >
                            <Menu.Item key="1" icon={<MailOutlined/>}>
                                Introduction
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<AppstoreOutlined/>} title="Functionality">
                                <Menu.Item key="generalFunctionality">General Functionality</Menu.Item>
                                <Menu.Item key="advancedFunctionality">Advanced Functionality</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<SettingOutlined/>} title="Settings">
                                <Menu.Item key="InstallSettings">Install Settings</Menu.Item>
                                <Menu.Item key="ImportSettings">Import Settings</Menu.Item>
                                <Menu.Item key="Default Settings">Default Settings</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="link" icon={<LinkOutlined/>}>
                                <a href="https://ant.design" target="_blank" rel="target">
                                    Ant Design
                                </a>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" className="mt-2">
                            <Menu.Item key="mail">
                                Dashboard
                            </Menu.Item>
                            <Menu.Item key="mail">
                                Users
                            </Menu.Item>
                            <Menu.Item key="app">
                                Settings
                            </Menu.Item>
                            <Menu.Item key="alipay">
                                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                    Navigation Four - Link
                                </a>
                            </Menu.Item>
                            <Menu.Item key="alipay">
                                <Button type="primary" htmlType="submit" onClick={onShowUser}>
                                    Show Data
                                </Button>
                            </Menu.Item>
                        </Menu>

                    </Col>
                </Row>
            </div>
        </>
    );
}
export default UserDashBord;