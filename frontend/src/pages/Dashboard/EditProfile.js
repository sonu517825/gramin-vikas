
import {
    Button,
    Card,
    Form,
    Input,
    Radio,
    Select,
    Modal
} from "antd";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from '../../config/config'



const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};



const EditProfile = ({ message }) => {
    const [registerObj, setRegisterObj] = useState({});
    const [resHandler, setResHandler] = useState(false);
    const [color, setColor] = useState('red');
    const [resMsg, setResMsg] = useState('Something went wrong !');
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Success:", values);
        setRegisterObj(values);
        update()
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };


    const update = () => {
        registerObj.my_sponcer_id = message.my_sponcer_id
        axios.put(
            `${BASE_URL}/api/user/update`,
            registerObj
        )
            .then((result) => {
                setColor('green')
                setResHandler(true);
                setResMsg('Record Updated Successfully')
            })
            .catch((error) => {
                setResHandler(true);
                setResMsg('Something went wrong !')
            });
    };

    return (
        <div className="w-full flex justify-center items-center  min-h-[80vh] ">
            <Card style={{ boxShadow: "20px", width: "110vh" }}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="edit"
                    initialValues={{
                        residence: ["zhejiang", "hangzhou", "xihu"],
                        prefix: "86",
                    }}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                    scrollToFirstError
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <div className=" w-[100%]  flex justify-between items-center ">
                        <Form.Item
                            className="w-[190px]"
                            name="name"
                            label="Name"
                            initialValue={message?.name}
                            rules={[
                                {
                                    type: 'name',
                                    message: 'The input is not a valid Name!',
                                },
                                {
                                    required: true,
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '52px', display: 'flex' }}>
                                            Please fill in your Name!
                                        </p>
                                    ),
                                },
                            ]}
                        >
                            <Input style={{ width: '230px', marginLeft: '3px', justifyContent: 'space-between', alignItems: 'center' }} />
                        </Form.Item>
                        <Form.Item
                            name="father_name"
                            label="Father Name"
                            className="w-[380px] "
                            initialValue={message?.father_name}
                            rules={[
                                {
                                    type: 'name',
                                    message: 'The input is not a valid Father Name!',
                                },
                                {
                                    required: true,
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '28px', display: 'flex' }}>
                                            Please fill in your Father Name!
                                        </p>
                                    ),
                                },
                            ]}
                        >
                            <Input className="w-[230px] ml-2 justify-between items-center" />
                        </Form.Item>
                    </div>

                    <div className=" w-[100%]  flex justify-between items-center ">



                        <Form.Item
                            name="gender"
                            className="w-[220px] "
                            label="Gender"
                            initialValue={message?.gender?.toLowerCase()}
                            rules={[
                                {
                                    type: 'radio',
                                    message: 'The input is not a valid Gender!',
                                },
                                {
                                    required: true,
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '22px', display: 'flex' }}>
                                            Please choose your Gender!
                                        </p>
                                    ),
                                },
                            ]}
                        >
                            <Radio.Group className="w-[230px] ml-1 justify-between items-center">
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                                <Radio value="other">Other</Radio>
                            </Radio.Group>
                        </Form.Item>



                        <Form.Item
                            name="email"
                            label="Email"
                            type="email"
                            className="w-[440px] "
                            initialValue={message?.email}
                            rules={[
                                {
                                    type: 'email',
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '65px', display: 'flex' }}>
                                            The input is not a valid Email!
                                        </p>
                                    ),
                                },
                                {
                                    required: true,
                                    message: (
                                        <p style={{ width: '250px', marginLeft: '90px', display: 'flex' }}>
                                            Please fill in your Email!
                                        </p>
                                    ),
                                },
                            ]}
                        >
                            <Input className="w-[235px] ml-10 justify-between items-center" />
                        </Form.Item>
                    </div>

                    <div className=" w-[100%]  flex justify-between items-center ">
                        <Form.Item
                            name="phone"
                            label="Contact"
                            className="w-[220px] "
                            initialValue={message?.phone}
                            rules={[
                                {
                                    type: 'contact',
                                    message: 'The input is not a valid Contact No!',
                                },
                                {
                                    required: true,
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '32px', display: 'flex' }}>
                                            Please fill in your Contact No!
                                        </p>
                                    ),
                                },
                                {
                                    pattern: new RegExp(/^(0|91)?[6-9][0-9]{9}$/),
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '52px', display: 'flex' }}>
                                            Invalid Contact No!
                                        </p>
                                    ),
                                },
                            ]}
                        // hasFeedback
                        >
                            <Input style={{ width: '222px', marginLeft: '3px', justifyContent: 'space-between', alignItems: 'center' }} />
                        </Form.Item>

                        <Form.Item
                            name="country"
                            label="Country"
                            className="w-[420px] "
                            initialValue={message?.country}
                            rules={[
                                {
                                    type: 'name',
                                    message: 'The input is not a valid Country!',
                                },
                                {
                                    required: true,
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '60px', display: 'flex' }}>
                                            Please fill in your Country!
                                        </p>
                                    ),
                                },
                            ]}
                        >
                            <Input className="w-[235px] ml-6 justify-between items-center" />
                        </Form.Item>
                    </div>

                    <div className=" w-[100%]  flex justify-between items-center ">
                        <Form.Item
                            name="state"
                            label="State"
                            className="w-[170px] "
                            initialValue={message?.state}
                            rules={[
                                {
                                    type: 'name',
                                    message: 'The input is not a valid State!',
                                },
                                {
                                    required: true,
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '60px', display: 'flex' }}>
                                            Please fill in your State!
                                        </p>
                                    ),
                                },
                            ]}
                        >
                            <Input style={{ width: '240px', marginLeft: '3px', justifyContent: 'space-between', alignItems: 'center' }} />
                        </Form.Item>
                        <Form.Item
                            name="city"
                            label="City"
                            className="w-[460px] "
                            initialValue={message?.city}
                            rules={[
                                {
                                    type: 'name',
                                    message: 'The input is not a valid City!',
                                },
                                {
                                    required: true,
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '90px', display: 'flex' }}>
                                            Please fill in your City!
                                        </p>
                                    ),
                                },
                            ]}
                        >
                            <Input className="w-[235px] ml-12 justify-between items-center" />
                        </Form.Item>
                    </div>

                    <div className=" w-[100%]  flex justify-between items-center ">
                        <Form.Item
                            name="address"
                            label="Address"
                            className="w-[220px] "
                            initialValue={message?.address}
                            rules={[
                                {
                                    type: 'address',
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '60px', display: 'flex' }}>
                                            The input is not a valid Address!
                                        </p>
                                    ),
                                },
                            ]}
                        >
                            <Input style={{ width: '220px', marginLeft: '3px', justifyContent: 'space-between', alignItems: 'center' }} />
                        </Form.Item>
                        <Form.Item
                            name="pincode"
                            label="Pincode"
                            className="w-[430px] "
                            initialValue={message?.pincode}
                            rules={[
                                {
                                    pattern: new RegExp(/^\d{6}$/),
                                    message: 'Please enter a valid 6-digit Pincode!',
                                },
                                {
                                    required: true,
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '50px', display: 'flex' }}>
                                            Please fill in your Pincode!
                                        </p>
                                    ),
                                },
                            ]}
                        >
                            <Input className="w-[240px] ml-6 justify-between items-center" />
                        </Form.Item>
                    </div>

                    <Button
                        htmlType="submit"
                        style={{
                            Item: 'center',
                            backgroundColor: 'blue',
                            color: 'white',
                        }}
                        type="primary"
                    >
                        Update
                    </Button>
                    {resHandler && (
                        <h5 style={{ color: color, fontWeight: 'bold', marginTop: "20px", fontSize: "20px" }}>{resMsg}</h5>

                    )}
                </Form>



            </Card>

        </div >
    );
};
export default EditProfile;

//5.4.2