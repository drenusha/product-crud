import "antd/dist/reset.css";
import "./Register.css";
import { Card, Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from '../components/AuthUser';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 20,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 20,
    },
    sm: {
      span: 15,
    },
  },
};


const Register = () => {
  const navigate = useNavigate();

  const [name, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [form] = Form.useForm();
  const { http } = AuthUser();



  const onSubmit = async (e) => {

    try {
      const values = await form.validateFields();

      http.post('/register', { email: email, password: password, name: name }).then((res) => {
        navigate('/')
      })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            message.error('Email already exists. Please use a different email.');
          } else {
            message.error('An error occurred. Please try again later.');
            console.error("Registration failed:", error);
          }
        })
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <div className="register_page">
      <Card style={{ width: 500 }}>
        <Form
          onSubmit={onSubmit}
          form={form}
          {...formItemLayout}
          name="register"
          scrollToFirstError
        >
          <h2 className="title">Register Form</h2>

          <Form.Item
            name="name"
            label="Full Name"
            value={name}
            onChange={(e) => setFullName(e.target.value)}
            rules={[
              {
                required: true,
                message: "Please input your Full name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="register_btns">
            <Button type="primary" onClick={onSubmit} htmlType="submit" className="reg_btn">
              Register
            </Button>
            <Button type="secondary" onClick={handleLoginClick} htmlType="submit" className="log_btn">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
