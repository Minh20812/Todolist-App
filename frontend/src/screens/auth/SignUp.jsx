import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Card, Typography, Space } from "antd"; // Antd imports
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/feature/auth/authSlice";
import { toast } from "react-toastify";
import SocialLogin from "./components/SocialLogin"; // Assuming you have this component

const { Title, Paragraph, Text } = Typography;

const Register = () => {
  const [form] = Form.useForm(); // Form initialization

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (values) => {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        toast.error(err?.data?.message || "Failed to register");
      }
    }
  };

  return (
    <Card>
      <div className="flex justify-center">
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/manage-storage.appspot.com/o/Group%201122.png?alt=media&token=71368463-dae5-4088-bf2e-6e260103e7ca"
          }
          alt="logo"
          className="w-12 h-12"
        />
      </div>
      <div className="text-center">
        <Title level={2}>Create an account</Title>
        <Paragraph type="secondary">Free trial 30 days</Paragraph>
      </div>

      <Form
        layout="vertical"
        form={form}
        onFinish={submitHandler}
        disabled={isLoading}
        size="large"
      >
        <Form.Item
          name={"username"}
          label="Name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input
            placeholder="Enter your name"
            allowClear
            className=" min-w-[360px]"
          />
        </Form.Item>

        <Form.Item
          name={"email"}
          label="Email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input
            placeholder="Enter your email"
            allowClear
            type="email"
            maxLength={100}
          />
        </Form.Item>

        <Form.Item
          name={"password"}
          label="Password"
          rules={[
            { required: true, message: "Please enter your password!" },
            { min: 6, message: "Password must be at least 6 characters long" },
          ]}
        >
          <Input.Password placeholder="Create password" maxLength={100} />
        </Form.Item>

        <Form.Item
          name={"confirmPassword"}
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
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
          <Input.Password placeholder="Confirm password" />
        </Form.Item>

        <div className="mt-5 mb-3">
          <Button
            loading={isLoading}
            htmlType="submit"
            type="primary"
            style={{ width: "100%" }}
            size="large"
          >
            Get started
          </Button>
        </div>
      </Form>

      <SocialLogin text={"Sign up with Google"} />

      <div className="mt-3 text-center">
        <Space>
          <Text type="secondary">Already have an account?</Text>
          <Link to={"/login"}>Login</Link>
        </Space>
      </div>
    </Card>
  );
};

export default Register;
