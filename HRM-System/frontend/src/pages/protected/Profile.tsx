import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Profile from "../../features/profile";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "My Profile" }));
  }, []);

  return (
    <>
      <Profile />
    </>
  );
}

export default InternalPage;
