
import {
    Button,
    Card,
    Form,
    Input,
    Radio,
    Modal
} from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useLocation, useNavigate } from 'react-router-dom';
import Timer from "../components/Timer";
import axios from "axios";
import { BASE_URL } from '../config/config'
import SuccessRegister from "./SuccessRegister";


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

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default function Register() {
    const location = useLocation();
    const refer_sponcer_id = location?.state?.refer_sponcer_id;

    const [otpMobNo, setOtpMobNo] = useState("");
    const [sponcerId, setSponcerId] = useState("");
    const [errorHandle, setErrorHandle] = useState(false);
    const [otpErrorMsg, setOtpErrorMsg] = useState("Enter Varifaction Code");
    const [otp, setOtp] = useState("");
    const [varifaction_code_id, setVarifaction_code_id] = useState("");
    const [otpToggle, setOtpToggle] = useState(false);
    const [registerObj, setRegisterObj] = useState({});
    const [timer, setTimer] = useState(90);
    const [seconds, setSeconds] = useState(90);
    const [form] = Form.useForm();
    const [registerApiResponse, setRegisterApiResponse] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [pageCardStyle, setpageCardStyle] = useState(JSON.stringify({ boxShadow: "20px", marginBottom: "10px", marginTop: "10px", minHeight: "10vh" }))
    const cardStyle = JSON.parse(pageCardStyle)

    const onFinish = (values) => {
        values.refer_sponcer_id = refer_sponcer_id
        console.log("Success:", values);
        setRegisterObj(values);
    };


    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const getVarifactionCode = () => {
        console.log(registerObj.phone, registerObj);
        if (registerObj?.phone) {
            console.log(registerObj.phone);
            setOtpMobNo(registerObj.phone);
            axios.post(
                `${BASE_URL}/api/user/get_varifaction_code`,
                {
                    // phone: registerObj.phone ,
                    phone: '6387465973',
                }
            )
                .then((result) => {
                    console.log(result.data);
                    setVarifaction_code_id(result.data?.varifaction_code_id);
                    setpageCardStyle(JSON.stringify({ boxShadow: "20px", minHeight: "105vh", marginTop: "8px", marginBottom: "10px", }))
                    setOtpToggle(true);
                })
                .catch((error) => {
                    console.log(error.response.data);
                    setErrorHandle(true);
                });
        }
    };
    const resendOtp = () => {
        setSeconds(90);
        getVarifactionCode();
    };
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const handleRegister = () => {
        axios.post(
            `${BASE_URL}/api/user/verify_varifaction_code`,
            {
                varifaction_code: Number(otp),
                varifaction_code_id: varifaction_code_id,
            }
        )
            .then((result) => {
                console.log(registerObj, "{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{");
                axios.post(`${BASE_URL}/api/user/register`, registerObj
                ).then((result) => {
                    console.log(result)
                    setRegisterApiResponse(result.data.result)
                    setShowSuccess(true)
                    showModal()
                }).catch((error) => {
                    console.log(error.response.data?.message)
                })
            })
            .catch((error) => {
                console.log(error.response.data);
                setOtpErrorMsg(error.response.data?.message);
            });
    };

    return (
        <div className="w-full over-flow-[auto] flex justify-center items-center min-h-[100vh] bg-[#ffd6e7]">
            <Card style={cardStyle} className="over-flow-[auto]">
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
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
                    <h1 className="text-center  text-3xl font-bold mb-4 text-[green] bg-[white]">
                        Fill  Your  Details
                    </h1>


                    <div className=" w-[100%]  flex justify-between items-center ">
                        <Form.Item
                            style={{ width: '190px' }}
                            name="name"
                            label="Name"
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
                            hasFeedback
                        >
                            <Input style={{ width: '230px', marginLeft: '3px', justifyContent: 'space-between', alignItems: 'center' }} />
                        </Form.Item>

                        <Form.Item
                            name="father_name"
                            label="Father Name"
                            style={{ width: '380px' }}
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
                            hasFeedback
                        >
                            <Input style={{ width: '230px', marginLeft: '2px', justifyContent: 'space-between', alignItems: 'center' }} />
                        </Form.Item>

                    </div>


                    <div className=" w-[100%]  flex justify-between items-center ">
                        <Form.Item
                            style={{ width: '220px' }}
                            name="position"
                            label="Position"
                            rules={[
                                {
                                    type: 'radio',
                                    message: 'The input is not a valid Position!',
                                },
                                {
                                    required: true,
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '10px', display: 'flex' }}>
                                            Please choose your Position!
                                        </p>
                                    ),
                                },
                            ]}
                            hasFeedback
                        >
                            <Radio.Group style={{ width: '230px', marginLeft: '1px', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Radio value="Left">Left</Radio>
                                <Radio value="Right">Right</Radio>
                            </Radio.Group>
                        </Form.Item>


                        <Form.Item
                            name="date_of_birth"
                            label="DOB"
                            style={{ width: '450px' }}
                            rules={[
                                {
                                    type: 'date',
                                    message: 'The input is not a valid DOB!',
                                },
                                {
                                    required: true,
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '100px', display: 'flex' }}>
                                            Please fill in your DOB!
                                        </p>
                                    ),
                                },
                            ]}
                            hasFeedback
                        >
                            <Input
                                type="date"
                                style={{ width: '265px', marginLeft: '12px', justifyContent: 'space-between', alignItems: 'center' }}
                            />
                        </Form.Item>

                    </div>


                    <div className=" w-[100%]  flex justify-between items-center ">
                        <Form.Item
                            name="gender"
                            style={{ width: '220px' }}
                            label="Gender"
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
                            <Radio.Group style={{ width: '230px', marginLeft: '1px', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                                <Radio value="other">Other</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            type="email"
                            style={{ width: '440px' }}
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
                            hasFeedback
                        >
                            <Input style={{ width: '260px', marginLeft: '10px', justifyContent: 'space-between', alignItems: 'center' }} />
                        </Form.Item>

                    </div>


                    <div className=" w-[100%]  flex justify-between items-center ">
                        <Form.Item
                            name="phone"
                            label="Contact"
                            style={{ width: '220px' }}
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
                            hasFeedback
                        >
                            <Input style={{ width: '230px', marginLeft: '2px', justifyContent: 'space-between', alignItems: 'center' }} />
                        </Form.Item>

                        <Form.Item
                            name="country"
                            label="Country"
                            style={{ width: '420px' }}
                            hasFeedback
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
                            <Input style={{ width: '250px', marginLeft: '6px', justifyContent: 'space-between', alignItems: 'center' }} />
                        </Form.Item>

                    </div>


                    <div className=" w-[100%]  flex justify-between items-center ">
                        <Form.Item
                            name="state"
                            label="State"
                            style={{ width: '170px' }}
                            hasFeedback
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
                            <Input style={{ width: '245px', marginLeft: '5px', justifyContent: 'space-between', alignItems: 'center' }} />
                        </Form.Item>

                        <Form.Item
                            name="city"
                            label="City"
                            style={{ width: '460px' }}
                            hasFeedback
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
                            <Input style={{ width: '270px', marginLeft: '12px', justifyContent: 'space-between', alignItems: 'center' }} />
                        </Form.Item>

                    </div>
                    <div className=" w-[100%]  flex justify-between items-center ">
                        <Form.Item
                            name="address"
                            label="Address"
                            style={{ width: '220px' }}
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
                            hasFeedback
                        >
                            <Input style={{ width: '235px', marginLeft: '1px', justifyContent: 'space-between', alignItems: 'center' }} />
                        </Form.Item>

                        <Form.Item
                            name="pincode"
                            label="Pincode"
                            style={{ width: '430px' }}
                            hasFeedback
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
                            <Input style={{ width: '255px', marginLeft: '6px', justifyContent: 'space-between', alignItems: 'center' }} />
                        </Form.Item>


                    </div>
                    <div className="flex w-[100%] mr-[72px] justify-between items-center">
                        <Form.Item
                            name="password"
                            label="Password"
                            style={{ width: '320px', marginLeft: '12px' }}
                            dependencies={["password"]}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '15px', display: 'flex' }}>
                                            Please confirm your password!
                                        </p>
                                    ),
                                },
                            ]}
                        >
                            <Input.Password style={{ width: '225px', marginRight: '64px' }} />
                        </Form.Item>

                        <Form.Item
                            name="confirm_password"
                            label="Confirm Password"
                            style={{ width: '380px' }}
                            dependencies={["password"]}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '50px', display: 'flex' }}>
                                            Please confirm your password!
                                        </p>
                                    ),
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Passwords do not match!"));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password style={{ width: '240px', marginLeft: '23px' }} />
                        </Form.Item>

                    </div>

                    {otpToggle &&
                        (
                            <div className="flex justify-between items-center w-full flex-col gap-3 mt-[20px] ">
                                <h4 className="text-center mt-[0px] text-2xl text-[green] ">
                                    Varifaction code send to{" "}
                                    <span className="text-[black] text-3xl">
                                        ******{otpMobNo?.substr(6)}
                                    </span>
                                </h4>

                                <div className="flex gap-4 ">
                                    <OTPInput
                                        value={otp}
                                        onChange={setOtp}
                                        inputStyle={{
                                            width: "50px",
                                            height: "50px",
                                            border: "1px solid gray",
                                            borderRadius: "6px",
                                            gap: 4,
                                        }}
                                        numInputs={4}
                                        renderSeparator={<span className="mr-4 "> </span>}
                                        renderInput={(props) => <input {...props} />}
                                    />
                                    <Timer setSeconds={setSeconds} seconds={seconds} />
                                </div>

                                <div className="flex justify-between items-center w-full flex-col gap-3 mr-6">
                                    <h5 className="text-[red] text-xl ">{otpErrorMsg}</h5>
                                </div>
                                <div className="flex justify-between gap-3 mr-8">
                                    <Button
                                        style={{ backgroundColor: 'blue', color: 'white', marginBottom: '4px' }}
                                        htmlType="submit"
                                        onClick={resendOtp}
                                    >
                                        Resend code
                                    </Button>
                                    <Button
                                        {...tailFormItemLayout}
                                        onClick={handleRegister}
                                        style={{ backgroundColor: 'blue', color: 'white' }}
                                        htmlType="submit"
                                    >
                                        Register
                                    </Button>
                                </div>
                            </div>
                        )
                    }

                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            style={{
                                backgroundColor: 'blue',
                                color: 'white',
                                marginTop: '3px',
                                display: otpToggle ? 'none' : 'block'
                            }}
                            onClick={getVarifactionCode}
                            htmlType="submit"
                        >
                            Get Verification Code
                        </Button>
                    </div>
                </Form>
            </Card>
            <Modal footer={null} open={isModalOpen} >
                <SuccessRegister message={registerApiResponse} />
            </Modal>
        </div >
    )
}

