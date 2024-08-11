import React, { useState } from "react";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { postData } from "../../utils/axiosHelper";

interface LoginObj {
  emailId: string;
  password: string;
}

const Login: React.FC = () => {
  const INITIAL_LOGIN_OBJ: LoginObj = {
    password: "",
    emailId: "",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loginObj, setLoginObj] = useState<LoginObj>(INITIAL_LOGIN_OBJ);

  // Declare the submitForm function as async
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.emailId.trim() === "")
      return setErrorMessage("Email Id is required!");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Password is required!");
    else {

      try {
        setLoading(true);
        const res: any = await postData('http://localhost:3001/api/v1/auth/login', {
          email: loginObj.emailId,
          password: loginObj.password,
        });
        setLoading(false);
        localStorage.setItem("token", res.access_token);
        window.location.href = "/app/dashboard";
      } catch (error) {
        // Handle the error appropriately in the UI
        console.error("Login failed", error);
        setLoading(false);
        setErrorMessage("InValid Credentials!");

      }
    }
  };

  const updateFormValue = ({
                             updateType,
                             value,
                           }: {
    updateType: string;
    value: string;
  }) => {
    setErrorMessage("");
    setLoginObj((prev) => ({ ...prev, [updateType]: value }));
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div>
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <InputText
                  type="email"
                  defaultValue={loginObj.emailId}
                  updateType="emailId"
                  containerStyle="mt-4"
                  labelTitle="Email Id"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={`btn mt-2 w-full btn-primary ${loading ? "loading" : ""}`}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
