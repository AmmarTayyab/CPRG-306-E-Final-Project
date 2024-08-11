import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useDebounce } from "../../hooks/useDebounce";
import TanStackBasicTable from "../../components/DataTables/TanStackBasicTable";
import { useGetUsers } from "../../api/useGetUsers";
import { User } from "../../types/Users";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,


} from "@heroicons/react/24/outline";
import { closeModal, openModal } from "../common/modalSlice";
import { useDispatch } from "react-redux";
import { BASE_URL, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import SuccessComponent from '../../components/alert/success'
import { deleteData } from "../../utils/axiosHelper";

function Employees() {
  const dispatch = useDispatch();
  const queryClient:QueryClient = useQueryClient();

  // sorting state of the table
  const [sorting, setSorting] = useState<SortingState>([]);

  // column filters state of the table
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(
    columnFilters,
    1000,
  );

  // pagination state of the table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const {
    allUsersData, //allUsersDataStatus,
    isAllUsersDataLoading,
  } = useGetUsers({
    sorting,
    columnFilters: debouncedColumnFilters,
    pagination,
  });

  const userColumns: ColumnDef<User>[] = [
    {
      header: "ID",
      accessorKey: "id",
      enableColumnFilter: false,
    },

    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "First Name",
      accessorKey: "firstName",
    },
    {
      header: "Last Name",
      accessorKey: "lastName",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      enableColumnFilter: false,
      cell: ({ row }) => (
        <div className="dropdown dropdown-hover">
          <button
            className="btn btn-outline btn-xs btn-primary"
            onClick={() => handleViewClick(row.original)}
          >
            <EyeIcon className="h-4 w-4" />
          </button>
          <button
            className="btn btn-outline btn-xs btn-success mx-2"
            onClick={() => handleEditClick(row.original)}
          >
            <PencilSquareIcon className="h-4 w-4" />
          </button>
          <button
            className="btn btn-outline btn-xs btn-error"
            onClick={() => handleDeleteClick(row.original)}
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteClick = async (user: User) => {
  await deleteData(`${BASE_URL}users/${user.id}`)
    console.log("deleted");
    <SuccessComponent message="Employee Was Deleted " />
    // @ts-ignore
    queryClient.invalidateQueries(["users"]);
    closeModal();
    dispatch(
      openModal({
        title: "Confirmation",
        size: "md",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          index: "1",
          message: "Are you sure you want to delete this Employee?",
        },
      }),
    );
  };

  const handleViewClick = (user: User) => {
    // Perform your desired action with the user data
    console.log("Button clicked for user:", user);

    dispatch(
      openModal({
        title: "Employee Details",
        size: "lg",
        bodyType: MODAL_BODY_TYPES.EMPLOYEE_DETAIL,
        extraObject: {
          index: "1",
        },
      }),
    );
  };
  const handleAddUser = () => {


    dispatch(
      openModal({
        title: "Add Employee",
        size: "lg",
        bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
        extraObject: {
          index: "1",
        },
      }),
    );
  };



  const handleEditClick = (user: User) => {
    // Perform your desired action with the user data
    console.log("Button clicked for Edit user:", user);

    dispatch(
      openModal({
        title: "Edit Employee Details",
        size: "lg",
        bodyType: MODAL_BODY_TYPES.EMPLOYEE_EDIT_DETAIL,
        extraObject: {
          index: "1",
        },
      }),
    );
  };

  return (
    <>
      <div className="flex justify-end">
        <button onClick={handleAddUser} className="btn btn-success mt-8 mx-12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
               stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
          Add Employee
        </button>
      </div>
      <TanStackBasicTable
          isTableDataLoading={isAllUsersDataLoading}
          paginatedTableData={allUsersData}
          columns={userColumns}
          pagination={pagination}
          setPagination={setPagination}
          sorting={sorting}
          setSorting={setSorting}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
    </>
  );

}

export default Employees;
