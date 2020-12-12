import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Popconfirm, Button, message, Row, Col, Input} from 'antd';
import {DeleteOutlined, EditOutlined, SearchOutlined} from '@ant-design/icons';
import Table from "antd/lib/table";
import {useHistory} from 'react-router-dom';

// const {Column, ColumnGroup} = Table;
const {Search} = Input;

const User = (props) => {
    const [searchDetails, setSearchDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        gender: ""
    });
    const [list, setList] = useState([]);
    const history = useHistory();
    const [searchDuplicate, setSearchDuplicate] = useState([]);

    useEffect(() => {
        initial();
    }, []);
    const initial = () => {
        axios.get('http://localhost:8080/users')
            .then(res => {
                setList(res.data);
                setSearchDuplicate(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onEdit = (id) => {
        history.push(`/edit/${id}`);
        initial();
    }

    const onDelete = (id) => {
        axios.put(`http://localhost:8080/users/activeUsers/${id}`, {isActive: false})
        // axios.delete(`http://localhost:8080/users/${id}`)
            .then((req) => {
                message.success("Successfully Deleted")
                initial();
            })
            .catch(err => {
                console.log(err)
            })

    }

    const onLogOut = () => {
        history.push("/login");
        localStorage.setItem("token", "");
    }
    const onNewData = () => {
        history.push("/signup");
    }

    const onChange = e => {
        const {name, value} = e.target;
        setSearchDetails({...searchDetails, [name]: value});
    }
    const onSearch = () => {
        let searchValue = searchDetails;
        let row = searchDuplicate || [];
        if (searchValue.firstName) {
            row = row.filter(value => value.firstName.toLowerCase().includes(searchValue.firstName.toLowerCase()));
        }
        if (searchValue.lastName) {
            row = row.filter(value => value.lastName.toLowerCase().includes(searchValue.lastName.toLowerCase()));
        }
        if (searchValue.email) {
            row = row.filter(value => value.email.toLowerCase().includes(searchValue.email.toLowerCase()));
        }
        if (searchValue.age) {
            row = row.filter(value => value.age.toString().toLowerCase().includes(searchValue.age.toLowerCase()));
        }
        if (searchValue.gender) {
            row = row.filter(value => value.gender.toLowerCase() === searchValue.gender.toLowerCase());
        }
        setList(row);
    }

    const columns = [
        {
            title: 'First Name',
            width: 120,
            dataIndex: 'firstName',
            key: 'firstName',
            fixed: 'left',
        },
        {
            title: 'Last Name',
            width: 100,
            dataIndex: 'lastName',
            key: 'lastName',
            fixed: 'left',
        },
        {
            title: 'Email',
            width: 100,
            dataIndex: 'email',
            key: 'email',
            fixed: 'left',
        },
        {
            title: 'Age',
            width: 100,
            dataIndex: 'age',
            key: 'age',
            fixed: 'left',
        },
        {
            title: 'Gender',
            width: 100,
            dataIndex: 'gender',
            key: 'gender',
            fixed: 'left',
        },
        {
            title: 'Country',
            width: 100,
            dataIndex: 'country',
            key: 'country',
            fixed: 'left',
        },
        {
            title: 'Status',
            width: 100,
            dataIndex: 'isActive',
            key: 'isActive',
            fixed: 'left',
            render: (text, record) => {
                return (
                    <span>{record.isActive ? "true" : "false"}</span>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (text, record) => {
                return (
                    <div>
                        <Button primary onClick={() => {
                            onEdit(record._id)
                        }}><EditOutlined/></Button>
                        &nbsp;&nbsp;
                        <Popconfirm placement="bottom" title="Are you sure to delete this record?" onConfirm={() => {
                            onDelete(record._id)
                        }} okText="Yes" cancelText="No">
                            <Button danger><DeleteOutlined/></Button>
                        </Popconfirm>
                    </div>
                )
            }
        },

    ];

    return (
        <>

            <Row>
                <Col span={6}/>
                <Col span={12} className="mt-3">

                    <div className="header-data">
                        <h1>Users</h1>
                        <Button type="primary" htmlType="submit" onClick={onNewData}>
                            Add New
                        </Button>&nbsp;&nbsp;
                        <Button type="primary" htmlType="submit" onClick={onLogOut}>
                            Log Out
                        </Button>
                    </div>
                    <br/><br/>
                    <Row>
                        <Col span={4}>
                            <label>FirstName</label>
                            <Search placeholder="input search text" name="firstName" value={searchDetails.firstName}
                                    onChange={onChange}/>
                        </Col>&nbsp;&nbsp;
                        <Col span={4}>
                            <label>LastName</label>
                            <Search placeholder="input search text" name="lastName" value={searchDetails.lastName}
                                    onChange={onChange}/>
                        </Col>&nbsp;&nbsp;
                        <Col span={4}>
                            <label>Email</label>
                            <Search placeholder="input search text" name="email" value={searchDetails.email}
                                    onChange={onChange}/>
                        </Col>&nbsp;&nbsp;
                        <Col span={4}>
                            <label>Age</label>
                            <Search placeholder="input search text" name="age" value={searchDetails.age}
                                    onChange={onChange}/>
                        </Col>&nbsp;&nbsp;
                        <Col span={4}>
                            <label>Gender</label>
                            <Search placeholder="input search text" name="gender" value={searchDetails.gender}
                                    onChange={onChange}/>
                        </Col>&nbsp;&nbsp;
                        <Col span={2}>
                            <Button type="primary" icon={<SearchOutlined/>} className="btn-search" onClick={onSearch}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                    <Table
                        columns={columns}
                        dataSource={list || []}
                        pagination={{pageSize: 10}}
                        rowKey={'key'}
                    >
                    </Table>
                </Col>
            </Row>
        </>
    );
}
export default User;