import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/feature/auth/authSlice";
import { toast } from "react-toastify";

const SignUp = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isloading, error }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        if (err.data) {
          toast.error(err.data.message);
        } else {
          toast.error("An error occurred.");
        }
      }
    }
  };

  const nameRef = useRef(null);
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);
  return (
    <>
      <form onSubmit={submitHandler} className="container w-[40rem]">
        <div className=" flex flex-col gap-4 text-center">
          <input
            type="text"
            placeholder="Enter your name"
            ref={nameRef}
            className="mt-1 p-2 border rounded w-full"
            id="name"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            className="mt-1 p-2 border rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            className="mt-1 p-2 border rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm your password"
            id="confirmPassword"
            className="mt-1 p-2 border rounded w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            Sign Up
          </button>
          <Link to={"/login"}>Login</Link>
        </div>
      </form>
    </>
  );
};

export default SignUp;
