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
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { openModal } from "../common/modalSlice";
import { useDispatch } from "react-redux";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";

function JobPositions() {
  const dispatch = useDispatch();

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
      accessorKey: "user_id",
      enableColumnFilter: false,
    },
    {
      header: "Position",
      accessorKey: "first_name",
    },
    {
      header: "Department",
      accessorKey: "last_name",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      enableColumnFilter: false,
      cell: ({ row }) => (
        <div className="dropdown dropdown-hover">
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

  const handleDeleteClick = (user: User) => {
    // Perform your desired action with the user data
    console.log("Button clicked for deleting user:", user);

    dispatch(
      openModal({
        title: "Confirmation",
        size: "md",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          index: "1",
          message: "Are you sure you want to delete this Job Position?",
        },
      }),
    );
  };

  const handleEditClick = (user: User) => {
    // Perform your desired action with the user data
    console.log("Button clicked for Edit user:", user);

    dispatch(
      openModal({
        title: "Edit Job Position Details",
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
      {/* <button onClick={() => console.log(sorting)}>sorting</button> */}
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

export default JobPositions;
