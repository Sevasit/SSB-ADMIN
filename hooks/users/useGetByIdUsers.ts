import { getfindByIdUsersApi } from "@/app/api/user/userApi";
import { useQuery } from "@tanstack/react-query";
import { IUsersById } from "../../types/IUserResponse";
import { getUsersById } from "../QueriesKey";

const useGetByIdUsers = (id: string) => {
  return useQuery<IUsersById, { message: string }>(
    [getUsersById, id],
    async () => await getfindByIdUsersApi(id),
    {
      // reset query when id changes
      staleTime: 0,
    }
  );
};

export default useGetByIdUsers;
