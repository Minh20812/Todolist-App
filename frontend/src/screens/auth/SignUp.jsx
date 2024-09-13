import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form, Input, message, Space, Typography } from "antd";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/feature/auth/authSlice";
import { toast } from "react-toastify";
import SocialLogin from "./components/SocialLogin"; // Ant Design Social Login Component
import Loader from "./components/Loader"; // Loader component from previous code

const { Title, Paragraph, Text } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [register, { isLoading: registerLoading }] = useRegisterMutation();
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
    const { name, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const res = await register({ username: name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("User successfully registered");
    } catch (err) {
      console.log(err);
      toast.error(err.data.message || "Registration failed");
    } finally {
      setIsLoading(false);
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
          className=" w-12 h-12"
        />
      </div>
      <div className="text-center mb-4">
        <Title level={2}>Create an Account</Title>
        <Paragraph>Free trial for 30 days</Paragraph>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={submitHandler}
        disabled={isLoading || registerLoading}
        size="large"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input
            placeholder="Enter your name"
            allowClear
            className=" min-w-[360px]"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" allowClear />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Create a password" allowClear />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[{ required: true, message: "Please confirm your password" }]}
        >
          <Input.Password placeholder="Confirm your password" allowClear />
        </Form.Item>

        <Button
          loading={isLoading || registerLoading}
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          {registerLoading ? "Registering..." : "Get started"}
        </Button>
      </Form>
      {registerLoading && <Loader />}
      <div className="mt-4">
        <SocialLogin text={"Sign up with Google"} />
      </div>
      <div className="mt-6 text-center">
        <Text>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Text>
      </div>
    </Card>
  );
};

export default Register;
