import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { UseUsersInput, UseUsersResponse } from "../types/Users";
import { BASE_URL } from "../utils/globalConstantUtil";

const backend_url = BASE_URL;

const getAllUsersFn: {
  ({
    sorting,
    columnFilters,
    pagination,
  }: UseUsersInput): Promise<UseUsersResponse>;
} = async ({ sorting, columnFilters, pagination }: UseUsersInput) => {
  // set pagingation
  const page = pagination.pageIndex + 1,
    per_page = pagination.pageSize;

  // set filter
    let  email = "",
    firstName = "",
    lastName = ""


  for (const filter of columnFilters) {
    const id = filter.id,
      value = filter.value;
    switch (id) {
      case "email":
        email = value as string;
        break;
      case "firstName":
        firstName = value as string;
        break;
      case "lastName":
        lastName = value as string;
        break;

    }
  }

  // set sorting
  let sorting_param = "";
  for (let i = 0; i < sorting.length; i++) {
    const id = sorting[i].id,
      direction = sorting[i].desc ? "desc" : "asc";
    sorting_param += id + ":" + direction;

    if (i !== sorting.length - 1) {
      sorting_param += ",";
    }
  }

  const res = await axios.get(
    `${backend_url}users/fetch?${
      firstName !== "" ? `firstName=${firstName}&` : ""
    }${lastName !== "" ? `lastName=${lastName}&` : ""}${email !== "" ? `email=${email}&` : ""}${
      sorting_param !== "" ? `sortBy=${sorting_param}&` : ""
    }page=${page}&limit=${per_page}`,
  );

  return res.data;
};

export const useGetUsers = ({
  sorting,
  columnFilters,
  pagination,
}: UseUsersInput) => {
  const {
    data: allUsersData,
    status: allUsersDataStatus,
    isLoading: isAllUsersDataLoading,
  } = useQuery<UseUsersResponse, AxiosError>({
    queryKey: ["users", sorting, columnFilters, pagination],
    queryFn: () =>
      getAllUsersFn({
        sorting,
        columnFilters,
        pagination,
      }),
  });

  return { allUsersData, allUsersDataStatus, isAllUsersDataLoading };
};
