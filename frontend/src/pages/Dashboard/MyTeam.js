
// import {
//     Button,
//     Card,
//     Form,
//     Input,
//     Radio,
//     Select,
//     Modal
// } from "antd";
// import { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from '../../config/config'


// const MyTeam = ({ message }) => {

//     return (
//         <div>
//             <h1>MyTeam Comming Soon...!!!</h1>

//         </div >
//     );
// };
// export default MyTeam;

// import  from 'react';
import { useState, React, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from '../../config/config'
import { Table, Tooltip, Card, Popover } from 'antd';

import moment from 'moment'
// const dataArray = [
//     {
//         "_id": "64cab8ad083f8fc7c5d5c086",
//         "my_sponcer_id": "AD123",
//         "refer_sponcer_id": "AD123",
//         "position": "MAIN",
//         "name": "Ramesh",
//         "phone": "7830360293",
//         "email": "yuvapragati.pvt@gmail.com",
//         "gender": "MALE",
//         "country": "India",
//         "state": "UP",
//         "city": "Gonda",
//         "pincode": "271002",
//         "date_of_birth": "03-07-2000",
//         "password": "12345",
//         "is_deleted": false,
//         "createdAt": "2023-08-02T20:12:29.764Z",
//         "updatedAt": "2023-08-22T17:14:49.453Z",
//         "__v": 0,
//         "parent_refer_sponcer_id": "AD123",
//         "father_name": "Jamuna",
//         "address": ""
//     },
//     {
//         "_id": "64dbbf36c6c38caf37f8176b",
//         "my_sponcer_id": "PZ223",
//         "refer_sponcer_id": "AD123",
//         "parent_refer_sponcer_id": "AD123",
//         "position": "RIGHT",
//         "name": "Sonu",
//         "father_name": "RR",
//         "phone": "7845673475",
//         "email": "a@gma.co",
//         "gender": "MALE",
//         "country": "IN",
//         "state": "UP",
//         "city": "GD",
//         "pincode": "334555",
//         "date_of_birth": "2023-08-06",
//         "password": "!!!",
//         "is_deleted": false,
//         "createdAt": "2023-08-15T18:08:54.761Z",
//         "updatedAt": "2023-08-15T18:08:54.761Z",
//         "__v": 0
//     },
//     {
//         "_id": "64dbbff7c6c38caf37f81774",
//         "my_sponcer_id": "GT992",
//         "refer_sponcer_id": "PZ223",
//         "parent_refer_sponcer_id": "AD123",
//         "position": "RIGHT",
//         "name": "Sonu",
//         "father_name": "RR",
//         "phone": "7845673475",
//         "email": "a@gma.co",
//         "gender": "MALE",
//         "country": "IN",
//         "state": "UP",
//         "city": "GD",
//         "pincode": "334555",
//         "date_of_birth": "2023-08-07",
//         "password": "@@@",
//         "is_deleted": false,
//         "createdAt": "2023-08-15T18:12:07.486Z",
//         "updatedAt": "2023-08-15T18:12:07.486Z",
//         "__v": 0
//     },
//     {
//         "_id": "64dbc054c6c38caf37f8177c",
//         "my_sponcer_id": "ZV519",
//         "refer_sponcer_id": "AD123",
//         "parent_refer_sponcer_id": "AD123",
//         "position": "LEFT",
//         "name": "Sonu",
//         "father_name": "RR",
//         "phone": "7845673475",
//         "email": "a@gma.co",
//         "gender": "MALE",
//         "country": "IN",
//         "state": "UP",
//         "city": "GD",
//         "pincode": "334555",
//         "date_of_birth": "2023-08-01",
//         "password": "###",
//         "is_deleted": false,
//         "createdAt": "2023-08-15T18:13:40.856Z",
//         "updatedAt": "2023-08-15T18:13:40.856Z",
//         "__v": 0
//     }
// ]



const MyTeam = ({ message }) => {
    const [dataArray, setResHandler] = useState([]);


    const generatePopoverContent = (id, arr) => {
        let record = {}

        let fil = arr.filter(obj => obj.my_sponcer_id == id)

        if (fil.length > 0) {
            record = fil[0]
        }

        return (
            <div>
                <p><strong>Name:</strong> {record.name}</p>
                <p><strong>Father Name:</strong> {record.father_name}</p>
                <p><strong>Phone:</strong> {record.phone}</p>
                <p><strong>Email:</strong> {record.email}</p>
                <p><strong>Gender:</strong> {record.gender}</p>
                <p><strong>Country:</strong> {record.country}</p>
                <p><strong>State:</strong> {record.state}</p>
                <p><strong>City:</strong> {record.city}</p>
                <p><strong>Pincode:</strong> {record.pincode}</p>
                <p><strong>Date of Birth:</strong>  {record.date_of_birth && moment(record.date_of_birth).format('D MMM YYYY')}</p>
            </div>
        )
    }


    useEffect(() => {
        axios.get(
            `${BASE_URL}/api/user/my-team/table/${message?.my_sponcer_id || 0}`,
        )
            .then((result) => {
                setResHandler(result.data.result || []);
            })
            .catch((error) => {
            });
    }, []);



    const columns = [
        {
            title: 'Sponcer Id',
            dataIndex: 'my_sponcer_id',
            key: 'my_sponcer_id',
            render: (text, record) => (
                <Popover
                    content={generatePopoverContent(text, dataArray)}
                    trigger="hover"
                >
                    <span className="bold-title">{text}</span>
                </Popover>
            )
        },
        {
            title: <span className="bold-title">Name</span>,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <span className="bold-title">Phone</span>,
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Position At',
            dataIndex: 'refer_sponcer_id',
            key: 'refer_sponcer_id',
            render: (text, record) => (
                <Popover
                    content={generatePopoverContent(text, dataArray)}
                    trigger="hover"
                >
                    <span className="bold-title">{text}</span>
                </Popover>
            )
        },
        {
            title: 'Direct',
            dataIndex: 'parent_refer_sponcer_id',
            key: 'parent_refer_sponcer_id',
            render: (text, record) => (
                <Popover
                    content={generatePopoverContent(text, dataArray)}
                    trigger="hover"
                >
                    <span className="bold-title">{text}</span>
                </Popover>
            )
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => moment(date).format('D MMM YYYY HH:mm:ss')
        },
    ];



    return (
        <div>
            <Table dataSource={dataArray} columns={columns} />
        </div>
    );
};

export default MyTeam;
