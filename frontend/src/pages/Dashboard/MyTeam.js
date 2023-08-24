import { useState, React, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from '../../config/config'
import { Table, Tooltip, Typography, Card, Popover } from 'antd';


import moment from 'moment'

const { Text } = Typography;

const MyTeam = ({ message }) => {
    const [dataArray, setResHandler] = useState([]);
    const [detailsArray, setDetailsArray] = useState([]);


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
                setDetailsArray(result.data.details || []);
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
                    content={generatePopoverContent(text, detailsArray)}
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
                    content={generatePopoverContent(text, detailsArray)}
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
                    content={generatePopoverContent(text, detailsArray)}
                    trigger="hover"
                >
                    <span className="bold-title">{text}</span>
                </Popover>
            )
        },
        {
            title: 'Joining Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => moment(date).format('D MMM YYYY HH:mm:ss')
        },
    ];

    const countDetails = {
        direct: 10,
        refer: 5,
        paired: 8,
        total: 15,
    };

    // return (
    //     <div>
    //         <Table dataSource={dataArray} columns={columns} />
    //     </div>
    // );

    return (
        <div>
            <Card style={{ marginBottom: 20, backgroundColor: '#10B981', }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                    <Card style={{
                        backgroundColor: '#F59E0B',
                        width: '210px',
                        height: '150px',
                        textAlign: 'center',
                        padding: '0.625rem 0.75rem',
                        borderRadius: '0.375rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div >
                            <Text style={{ color: 'white', fontSize: "3rem" }} >Total</Text>
                            <br />
                            <Text style={{ color: 'white', fontSize: "3rem" }} >{countDetails.direct}</Text>
                        </div>
                    </Card>
                    <Card style={{
                        backgroundColor: '#F59E0B',
                        width: '210px',
                        height: '150px',
                        textAlign: 'center',
                        padding: '0.625rem 0.75rem',
                        borderRadius: '0.375rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div >
                            <Text style={{ color: 'white', fontSize: "3rem" }} >Direct</Text>
                            <br />
                            <Text style={{ color: 'white', fontSize: "3rem" }} >{countDetails.direct}</Text>
                        </div>
                    </Card>
                    <Card style={{
                        backgroundColor: '#F59E0B',
                        width: '210px',
                        height: '150px',
                        textAlign: 'center',
                        padding: '0.625rem 0.75rem',
                        borderRadius: '0.375rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div >
                            <Text style={{ color: 'white', fontSize: "3rem" }} >Refer</Text>
                            <br />
                            <Text style={{ color: 'white', fontSize: "3rem" }} >{countDetails.direct}</Text>
                        </div>
                    </Card>
                    <Card style={{
                        backgroundColor: '#F59E0B',
                        width: '210px',
                        height: '150px',
                        textAlign: 'center',
                        padding: '0.625rem 0.75rem',
                        borderRadius: '0.375rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div >
                            <Text style={{ color: 'white', fontSize: "3rem" }} >Paired</Text>
                            <br />
                            <Text style={{ color: 'white', fontSize: "3rem" }} >{countDetails.direct}</Text>
                        </div>
                    </Card>
                </div>
                {/* <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                    <Card style={{
                        backgroundColor: '#F59E0B',
                        minWidth: '65px',
                        maxWidth: 'fit-content',
                        textAlign: 'center',
                        padding: '0.625rem 0.75rem',
                        borderRadius: '0.375rem'
                    }}>
                        <div >
                            <Text style={{ color: 'white', fontSize: "3rem" }} >Total</Text>
                            <br />
                            <Text style={{ color: 'white', fontSize: "3rem" }} >{countDetails.direct}</Text>
                        </div>
                    </Card>
                    <Card style={{
                        backgroundColor: '#F59E0B',
                        minWidth: '65px',
                        maxWidth: 'fit-content',
                        textAlign: 'center',
                        padding: '0.625rem 0.75rem',
                        borderRadius: '0.375rem'
                    }}>
                        <div >
                            <Text style={{ color: 'white', fontSize: "3rem" }} >Direct</Text>
                            <br />
                            <Text style={{ color: 'white', fontSize: "3rem" }} >{countDetails.direct}</Text>
                        </div>
                    </Card>
                    <Card style={{
                        backgroundColor: '#F59E0B',
                        minWidth: '65px',
                        maxWidth: 'fit-content',
                        textAlign: 'center',
                        padding: '0.625rem 0.75rem',
                        borderRadius: '0.375rem'
                    }}>
                        <div >
                            <Text style={{ color: 'white', fontSize: "3rem" }} >Refer</Text>
                            <br />
                            <Text style={{ color: 'white', fontSize: "3rem" }} >{countDetails.direct}</Text>
                        </div>
                    </Card>
                    <Card style={{
                        backgroundColor: '#F59E0B',
                        minWidth: '65px',
                        maxWidth: 'fit-content',
                        textAlign: 'center',
                        padding: '0.625rem 0.75rem',
                        borderRadius: '0.375rem'
                    }}>
                        <div >
                            <Text style={{ color: 'white', fontSize: "3rem" }} >Paired</Text>
                            <br />
                            <Text style={{ color: 'white', fontSize: "3rem" }} >{countDetails.direct}</Text>
                        </div>
                    </Card>
                </div> */}

            </Card >
            <div>
                <Table dataSource={dataArray} columns={columns} />
            </div>
        </div >
    );
};

export default MyTeam;
