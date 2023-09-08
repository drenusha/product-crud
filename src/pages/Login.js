import { useState } from "react";
import "antd/dist/reset.css";
import './Login.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Space, Button, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";
import AuthUser from '../components/AuthUser';



const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { http, setToken } = AuthUser();
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();

      http.post('/login', { email: email, password: password }).then((res) => {
        setToken(res.data.user, res.data.access_token);
        navigate("/products");
      })

        .catch((error) => {
          if (error.response && error.response.status === 401) {
            message.error('Invalid email or password. Please try again.');
          } else {
            message.error('An error occurred. Please try again later.');
            console.error("Login failed:", error);
          }
        });
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="login_page">
      <Space direction="vertical" size={16}>
        <Card
          style={{ width: 350 }}
        >
          <Form
            form={form}
            name="loginForm"
            className="login_form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            scrollToFirstError
          >
            <h2 className='title'>Log in</h2>
            <Form.Item
              name="Email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              <Input prefix={<UserOutlined className="user_icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              <Input
                prefix={<LockOutlined className="pass_icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item className="btns">
              <Button type="primary" onClick={onSubmit} htmlType="submit" className="login_btn">
                Log in
              </Button>
              <Button type="secondary" onClick={handleRegisterClick} htmlType="submit" className="register_btn">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
};

export default Login;