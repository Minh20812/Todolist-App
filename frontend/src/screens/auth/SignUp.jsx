import { Typography, Form, Card, Button, Input, Checkbox, Space } from "antd";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";

const { Title, Paragraph, Text } = Typography;
const Login = () => {
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const [isloading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Card>
        <div className="flex justify-center">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/manage-storage.appspot.com/o/Group%201122.png?alt=media&token=71368463-dae5-4088-bf2e-6e260103e7ca"
            }
            alt="logo"
            className=" w-12 h-12"
          />
        </div>
        <div className=" text-center">
          <Title level={2}>Create an account</Title>
          <Paragraph className=" text-[#667085] text-[16px] font-normal leading-6">
            Start your 30-day free trial.
          </Paragraph>
        </div>
        {/* Name, Email, Password */}
        <Form layout="vertical" form={form} disabled={isloading} size="large">
          {/* Name  */}
          <Form.Item
            name={"name"}
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              allowClear
              maxLength={100}
              type="text"
              ref={inputRef}
              placeholder="Enter your name"
              className=" min-w-[360px]"
            />
          </Form.Item>
          {/* Email */}
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
                whitespace: true,
              },
            ]}
          >
            <Input
              allowClear
              maxLength={100}
              type="email"
              placeholder="Enter your email"
            />
          </Form.Item>
          {/* Password */}
          <Form.Item
            name={"password"}
            label="Password"
            rules={[
              {
                required: true,
                message: "Must be a least 8 characters!",
                type: "password",
                whitespace: true,
              },
            ]}
          >
            <Input.Password
              allowClear
              maxLength={100}
              type="password"
              placeholder="Create a password"
            />
          </Form.Item>
          {/* Confirm Password  */}
          <Form.Item
            name={"cfpassword"}
            label="Confirm Password"
            rules={[
              {
                required: true,
                message: "Please input your password to confirm!",
                type: "password",
                whitespace: true,
              },
            ]}
          >
            <Input.Password
              allowClear
              maxLength={100}
              type="password"
              placeholder="Enter your password confirm"
            />
          </Form.Item>
        </Form>

        <div className=" mt-6 mb-4">
          <Button
            type="primary"
            size="large"
            onClick={() => form.submit}
            className=" w-full rounded-[4px]"
            loading={isloading}
          >
            Get started
          </Button>
        </div>

        <SocialLogin text="Sign up with Google" />

        <div className=" text-center mt-8">
          <Space>
            <Text type="secondary">Already have an account?</Text>
            <Link className=" text-[#1366D9]" to={"/"}>
              Log in
            </Link>
          </Space>
        </div>
      </Card>
    </>
  );
};

export default Login;
