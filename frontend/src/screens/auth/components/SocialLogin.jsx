import { Button } from "antd";
import React from "react";

const SocialLogin = ({ text }) => {
  return (
    <>
      <Button
        className=" bg-transparent w-full rounded-[4px] text-gray-700 border-[1px] border-[#D0D5DD]"
        type="primary"
        size="large"
      >
        <img
          src="https://img.icons8.com/fluency/48/google-logo.png"
          alt="logoGg"
          className=" w-6 h-6"
        />
        {text}
      </Button>
    </>
  );
};

export default SocialLogin;
