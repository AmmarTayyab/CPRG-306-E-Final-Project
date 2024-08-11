import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Departments from "../../features/departments";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Departments" }));
  }, []);

  return (
    <>
      <Departments />
    </>
  );
}

export default InternalPage;
