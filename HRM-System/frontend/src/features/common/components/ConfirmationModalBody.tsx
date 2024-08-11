import React, { useEffect, useState } from "react";
import { ModalBodyProps } from "@/types/Modal";
import { User } from "../../../types/Users";
import { fetchData } from "../../../utils/axiosHelper";

const ConfirmationModalBody: React.FC<ModalBodyProps> = ({
  extraObject,
  closeModal,
}) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (shouldFetch) {
      closeModal();
      const getUserDetails = async () => {
        try {
          const data = await fetchData<User>(
            `https://pokeapi.co/api/v2/berry/111`,
          );
          console.log(data);
        } catch (error) {
          console.error("Failed to fetch user details", error);
        }
      };

      getUserDetails();
    }
  }, [shouldFetch, closeModal]);

  const proceedWithYes = () => {
    setShouldFetch(true);
  };

  return (
    <>
      <p className="text-xl mt-8 text-center">{extraObject?.message}</p>
      <div className="modal-action mt-12">
        <button className="btn btn-outline" onClick={closeModal}>
          Cancel
        </button>
        <button className="btn btn-primary w-36" onClick={proceedWithYes}>
          Yes
        </button>
      </div>
    </>
  );
};

export { ConfirmationModalBody };
