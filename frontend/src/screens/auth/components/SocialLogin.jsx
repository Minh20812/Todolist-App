import { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCredentials } from "../../../redux/feature/auth/authSlice";
import { useLoginMutation } from "../../../redux/api/userApiSlice";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Firebase authentication
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      setValue(email);
      localStorage.setItem("email", email);
      console.log(email);

      // Backend login using the email obtained from Firebase
      const res = await login({ email }).unwrap(); // Pass the email object correctly
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setValue(storedEmail);
    }
  }, []);

  return (
    <>
      <div>
        <button onClick={handleClick} disabled={isLoading} type="submit">
          {isLoading ? "Signing In..." : "Sign In With Google"}
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
