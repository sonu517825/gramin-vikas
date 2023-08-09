import React from "react";
import { useState } from "react";
import { Card, } from "@mui/material";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";
import { BASE_URL } from '../config/config'
import Dashboard from './Dashboard/Home';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [isRedirectDashboard, setIsRedirectDashboard] = useState(false);
  const [loginFaildError, setLoginFaildError] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (obj) => {

    axios.post(`${BASE_URL}/api/user/login`,
      {
        "password": obj.password,
        "my_sponcer_id": obj.my_sponcer_id
      }
    ).then((result) => {
      console.log(result)
      const payload = result?.data
      navigate('/dashboard', { state: payload });

    }).catch((error) => {
      console.log(error.response.data?.message)
      setLoginFaildError(true)
    })
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    handleLogin({ password: values.password, my_sponcer_id: values.username })
  };

  return (

    <div className="bg-[green] w-[100vw] h-[100vh] flex justify-center items-center">
      <Card sx={{ padding: "10px", width: "400px", height: "430px", display: "flex", justifyContent: "center", alignItems: "center", }} >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >

          <h2 className="flex justify-center items-center text-4xl " > Welcome Back! </h2>
          <h6 className="flex justify-center items-center mt-[5px] text-2xl mb-[30px]" > Enter your Login credentials </h6>

          <Form.Item
            name="username"

            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
            style={{ marginBottom: '30px' }}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              style={{ borderRadius: '4px', border: '1px solid #d9d9d9', padding: '10px' }}
            />
          </Form.Item>


          <Form.Item
            name="password"
            // style={{marginTop:"20px"}}
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
            style={{ marginBottom: '30px', }}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer' }}
                  />
                )
              }
              style={{ borderRadius: '4px', border: '1px solid #d9d9d9', padding: '10px' }}
            />
          </Form.Item>




          <Form.Item style={{ marginBottom: '16px' }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ marginRight: '8px' }}>Remember me</Checkbox>
            </Form.Item>
            <a style={{ color: 'blue' }} href="/home">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item style={{ marginBottom: '16px' }}>
            <Button
              style={{
                backgroundColor: '#0074E4',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
              }}
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>


          {loginFaildError && (
            <h5 className="flex justify-center items-center text-[red] ">Login Failed !</h5>
          )}
        </Form>

      </Card>


    </div>
  );
}

