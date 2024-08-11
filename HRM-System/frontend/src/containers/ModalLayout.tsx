import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store"; // Adjust the import according to your store setup
import { closeModal } from "../features/common/modalSlice";
import AddLeadModalBody from "../features/leads/components/AddLeadModalBody";
import { ConfirmationModalBody } from "../features/common/components/ConfirmationModalBody";
import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import EmployeeDetails from "../features/employees/EmployeeDetails";
import { ModalState } from "../types/Modal";
import EmployeeEdit from "../features/employees/EmployeeEdit";

const ModalLayout: React.FC = () => {
  const { isOpen, bodyType, size, extraObject, title } = useSelector(
    (state: RootState) => state.modal,
  ) as ModalState;
  const dispatch = useDispatch<AppDispatch>();

  const close = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {/* Modal overlay */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={close}
          >
            ✕
          </button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>

          {/* Modal body based on type */}
          {
            {
              [MODAL_BODY_TYPES.EMPLOYEE_DETAIL]: (
                <EmployeeDetails closeModal={close} extraObject={extraObject} />
              ),
              [MODAL_BODY_TYPES.LEAD_ADD_NEW]: (
                <AddLeadModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION]: (
                <ConfirmationModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.EMPLOYEE_EDIT_DETAIL]: <EmployeeEdit />,
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
};

export default ModalLayout;
