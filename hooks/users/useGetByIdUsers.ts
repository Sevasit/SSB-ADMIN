import { getfindByIdUsers } from "@/app/api/user/userApi";
import { useQuery } from "@tanstack/react-query";
import { IUsersById } from "../../types/IUserResponse";
import { getUsersById } from "../QueriesKey";

const useGetByIdUsers = (id: string) => {
  return useQuery<IUsersById, { message: string }>(
    [getUsersById],
    async () => await getfindByIdUsers(id)
  );
};

export default useGetByIdUsers;
