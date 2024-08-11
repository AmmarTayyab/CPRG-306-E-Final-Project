import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { addNewLead } from "../leadSlice";
import { fetchData, postData } from "../../../utils/axiosHelper";
import { trimList } from "../../../lib/utils";
import SelectField from "../../../components/Select";
import { OptionsProp } from "@/types/Modal";
import { LeadObj } from "@/types/Users";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import SuccessComponent from '../../../components/alert/success'
import { BASE_URL } from "../../../utils/globalConstantUtil";

// Define the shape of the lead object

interface AddLeadModalBodyProps {
  closeModal: () => void;
  extraObject?: any;
}

const INITIAL_LEAD_OBJ: LeadObj = {
  firstName: "",
  lastName: "",
  email: "",
  departmentId:0,
  jobPositionId:0,
  salary:0,
  phone:"",
  address:"",
  password:"",
  confirmPassword: "",
};

const AddLeadModalBody: React.FC<AddLeadModalBodyProps> =  ({ closeModal }) => {
  const queryClient:QueryClient = useQueryClient();

  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [leadObj, setLeadObj] = useState<LeadObj>(INITIAL_LEAD_OBJ);

  const positionUrl = `${BASE_URL}job-positions/fetch`;
  const departmenturl = `${BASE_URL}departments/fetch`;
  const postUrl = `${BASE_URL}users/addUser`

  const [positions, setPositions] = useState<OptionsProp[]>([]);
  const [departments, setDepartments] = useState<OptionsProp[]>([]);


  useEffect(() => {

    async function fetchOptions2() {
      try {
        const apiQuery: any = await fetchData(departmenturl);
        // Assuming `apiQuery.data` is an array with `id` and `name`
        const apiList: any = trimList(apiQuery);

        setDepartments(apiList); // This should now correctly update the state
      } catch (error) {
        console.error("Error fetching options:", error);
        setDepartments([]); // Set options to an empty array on error
      }
    }
    async function fetchOptions() {
      try {
        const apiQuery: any = await fetchData(positionUrl);
        // Assuming `apiQuery.data` is an array with `id` and `name`
        const apiList: any = trimList(apiQuery);

        setPositions(apiList); // This should now correctly update the state
      } catch (error) {
        console.error("Error fetching options:", error);
        setPositions([]); // Set options to an empty array on error
      }
    }

    fetchOptions2();
    fetchOptions();
  }, [departmenturl,positionUrl]);

  const saveNewLead = async () => {
    // if (leadObj.firstName.trim() === "")
    //   return setErrorMessage("First Name is required!");
    // if (leadObj.email.trim() === "")
    //   return setErrorMessage("Email id is required!");

    const newLeadObj = {
      email: leadObj.email,
      firstName: leadObj.firstName,
      lastName: leadObj.lastName,
      departmentId: leadObj.departmentId,
      password: leadObj.password,
      confirmPassword: leadObj.confirmPassword,
      address: leadObj.address,
      salary: +leadObj.salary,
      phone: leadObj.phone,
      jobPositionId: leadObj.jobPositionId

    };

    dispatch(addNewLead({ newLeadObj }));

   const res =  await postData(postUrl, newLeadObj)
    if (res){
      <SuccessComponent message="Employee Was Added "/>
      // @ts-ignore
      queryClient.invalidateQueries(["users"]);
      closeModal();

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
    setLeadObj((prevLeadObj) => ({ ...prevLeadObj, [updateType]: value }));
  };

  return (
    <>
     <div className="flex gap-2 flex-col md:flex-row">
       <InputText
         type="text"
         defaultValue={leadObj.firstName}
         updateType="firstName"
         containerStyle="mt-4"
         labelTitle="First Name"
         updateFormValue={updateFormValue}
       />

       <InputText
         type="text"
         defaultValue={leadObj.lastName}
         updateType="lastName"
         containerStyle="mt-4"
         labelTitle="Last Name"
         updateFormValue={updateFormValue}
       />
     </div>

      <div className="flex gap-2 flex-col md:flex-row">
        <InputText
          type="email"
          defaultValue={leadObj.email}
          updateType="email"
          containerStyle="mt-4"
          labelTitle="Email"
          updateFormValue={updateFormValue}
        />

        <InputText
          type="text"
          defaultValue={leadObj.phone}
          updateType="phone"
          containerStyle="mt-4"
          labelTitle="Phone"
          updateFormValue={updateFormValue}
        />
      </div>


      <div className="flex gap-2 flex-col md:flex-row">
        <InputText
          type="text"
          defaultValue={leadObj.address}
          updateType="address"
          containerStyle="mt-4"
          labelTitle="Address"
          updateFormValue={updateFormValue}
        />
        <InputText
          type="number"
          updateType="salary"
          containerStyle="mt-4"
          labelTitle="Salary"
          updateFormValue={updateFormValue}
        />
      </div>

   <div className="flex gap-2 flex-col md:flex-row">

     <InputText
       type="password"
       defaultValue={leadObj.password}
       updateType="password"
       containerStyle="mt-4"
       labelTitle="Password"
       updateFormValue={updateFormValue}
     />
     <InputText
       type="password"
       defaultValue={leadObj.confirmPassword}
       updateType="confirmPassword"
       containerStyle="mt-4"
       labelTitle="Confirm Password"
       updateFormValue={updateFormValue}
     />
   </div>


     <div className="flex gap-2 flex-col md:flex-row">
       <SelectField updateFormValue={updateFormValue} updateType="departmentId" label="Select Department" options={departments} defaultValue={leadObj.departmentId}/>
       <SelectField  defaultValue={leadObj.jobPositionId} updateFormValue={updateFormValue} updateType="jobPositionId" label="Select Job Position" options={positions} />
     </div>

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={closeModal}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={saveNewLead}>
          Save
        </button>
      </div>
    </>
  );
};

export default AddLeadModalBody;
