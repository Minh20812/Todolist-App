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

  const handleLogin = (values) => {
    console.log(values);
  };

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
          <Title level={2}>Login to your account</Title>
          <Paragraph className=" text-[#667085] text-[16px] font-normal leading-6">
            Welcome back! Please enter your details.
          </Paragraph>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
          disabled={isloading}
          size="large"
        >
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
              ref={inputRef}
              className=" min-w-[360px]"
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
                message: "Please input your password!",
                type: "password",
                whitespace: true,
              },
            ]}
          >
            <Input.Password
              allowClear
              maxLength={100}
              type="password"
              placeholder="Enter your password"
            />
          </Form.Item>
        </Form>

        <div className=" flex justify-between">
          <Checkbox
            checked={isRemember}
            onChange={(val) => setIsRemember(val.target.checked)}
          >
            Remember for 30 days
          </Checkbox>

          <Link to="/sign-up" className=" text-[#1366D9]">
            Forgot password
          </Link>
        </div>

        <div className=" mt-6 mb-4">
          <Button
            type="primary"
            size="large"
            onClick={() => form.submit}
            className=" w-full rounded-[4px]"
          >
            Sign in
          </Button>
        </div>

        <SocialLogin text="Sign in with Google" />

        <div className=" text-center mt-8">
          <Space>
            <Text type="secondary">Don’t have an account?</Text>
            <Link className=" text-[#1366D9]" to={"/sign-up"}>
              Sign up
            </Link>
          </Space>
        </div>
      </Card>
    </>
  );
};

export default Login;
