import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import JobPositions from "../../features/positions";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Job Positions" }));
  }, []);

  return (
    <>
      <JobPositions />
    </>
  );
}

export default InternalPage;
