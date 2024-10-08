import React, { useState } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";

// Define types for the user object
interface UserObj {
  emailId: string;
}

const ForgotPassword: React.FC = () => {
  const INITIAL_USER_OBJ: UserObj = {
    emailId: "",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [linkSent, setLinkSent] = useState<boolean>(false);
  const [userObj, setUserObj] = useState<UserObj>(INITIAL_USER_OBJ);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (userObj.emailId.trim() === "")
      return setErrorMessage("Email Id is required! (use any value)");
    else {
      setLoading(true);
      // Call API to send password reset link
      setLoading(false);
      setLinkSent(true);
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
    setUserObj((prev) => ({ ...prev, [updateType]: value }));
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div>
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Forgot Password
            </h2>

            {linkSent ? (
              <>
                <div className="text-center mt-8">
                  <CheckCircleIcon className="inline-block w-32 text-success" />
                </div>
                <p className="my-4 text-xl font-bold text-center">Link Sent</p>
                <p className="mt-4 mb-8 font-semibold text-center">
                  Check your email to reset password
                </p>
                <div className="text-center mt-4">
                  <Link to="/login">
                    <button className="btn btn-block btn-primary">Login</button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="my-8 font-semibold text-center">
                  We will send password reset link on your email Id
                </p>
                <form onSubmit={submitForm}>
                  <div className="mb-4">
                    <InputText
                      type="emailId"
                      defaultValue={userObj.emailId}
                      updateType="emailId"
                      containerStyle="mt-4"
                      labelTitle="Email Id"
                      updateFormValue={updateFormValue}
                    />
                  </div>

                  <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
                  <button
                    type="submit"
                    className={`btn mt-2 w-full btn-primary ${loading ? "loading" : ""}`}
                  >
                    Send Reset Link
                  </button>

                  <div className="text-center mt-4">
                    Back to{" "}
                    <Link to="/login">
                      <button className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200 font-bold">
                        Login
                      </button>
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
