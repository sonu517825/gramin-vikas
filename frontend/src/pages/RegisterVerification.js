import {
  Button,
  Card,
  Form,
  Input,
  message, Space
} from "antd";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config/config'

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

const Register = () => {

  const navigate = useNavigate();
  const [sponcerToggle, setSponcerToggle] = useState(false);
  const [sponcerId, setSponcerId] = useState(false);
  const [errorHandle, setErrorHandle] = useState(false);
  const [errMsg, setErrMsg] = useState('Please fill your Sponcer ID !');
  const [form] = Form.useForm();
  const setSponcerIdHandler = (e) => {
    setErrorHandle(false);
    setSponcerId(e.target.value);
  };

  const onFinish = (values) => {
    const { sponcer_id } = values;

    if (!sponcer_id) {
      setErrorHandle(true);
      setErrMsg('Please fill your Sponcer ID !')
      return;
    }

    axios.post(
      `${BASE_URL}/api/user/valid_sponcer_id`,
      {
        refer_sponcer_id: sponcer_id,
      }
    )
      .then((result) => {
        console.log(result.data);
        setSponcerToggle(true);
        setErrorHandle(false);
      })
      .catch((error) => {
        setErrorHandle(true);
        setErrMsg('Invalid Sponcer ID !')
      });
  };


  return (
    <div className="w-full flex justify-center items-center  min-h-[100vh] bg-[#ffd6e7]">
      <Card style={{ boxShadow: "20px", width: "480px" }}>
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
          onFinish={onFinish}
          scrollToFirstError
        >
          {!sponcerToggle ? (
            <>
              <h1 className="text-center mb-3 text-[green] font-bold text-2xl">
                Verify Sponcer ID
              </h1>
              <div className="flex items-center mr-[20px]">
                <Form.Item
                  name="sponcer_id"
                  label={<h1 className="font-bold text-1xl"> <span className="text-red-500" >*</span> Sponcer ID</h1>}
                  className="flex gap-4"
                >
                  <Input
                    className=""
                    onChange={setSponcerIdHandler}
                  />
                </Form.Item>
                <Button
                  htmlType="submit"
                  // className="text-white ml-[10px] mb-[23px] mt-[-30px] "
                  className="text-white ml-[20px] mb-[23px] "
                  // className={`text-white ml-[20px] mb-[23px] `}
                  type="primary"
                >
                  Verify
                </Button>
              </div>
              {errorHandle && (
                <h5 className="text-red-500">{errMsg}</h5>

              )}
            </>
          ) : navigate('/register', { state: { refer_sponcer_id: sponcerId } })}
        </Form>
      </Card>
    </div>
  );
}

export default Register;

// .ant-btn, .ant-btn:active, .ant-btn:focus {
//   outline: 0;
//   margin-top: -30px;
// }