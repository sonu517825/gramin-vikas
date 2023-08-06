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
  const [sponcerId, setSponcerId] = useState("");
  const [errorHandle, setErrorHandle] = useState(false);
  const [form] = Form.useForm();
  const setSponcerIdHandler = (e) => {
    setErrorHandle(false);
    setSponcerId(e.target.value);
  };

  const onFinish = (values) => {
    const { sponcer_id } = values;

    if (!sponcer_id) {
      setErrorHandle(true);
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
                  label={<h1 className="font-bold text-1xl">Sponcer ID</h1>}
                  className="flex gap-4"
                  rules={[
                    {
                      required: true,
                      message: (
                        <p className="w-[200px]  ml-[8px] flex ">
                          Please fill your Sponcer ID !
                        </p>
                      ),
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input
                    className=""
                    onChange={setSponcerIdHandler}
                  />
                </Form.Item>
                <Button
                  htmlType="submit"
                  className="text-white ml-[20px] mb-[20px] "
                  type="primary"
                >
                  Verify
                </Button>
              </div>
              {errorHandle && (
                <h5 className="text-red-500">Invalid Sponcer ID !</h5>
              )}
            </>
          ) : navigate('/register', { state: { refer_sponcer_id: sponcerId } })}
        </Form>
      </Card>
    </div>
  );
}

export default Register;


