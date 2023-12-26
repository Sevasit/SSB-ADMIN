import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../QueriesKey";
import { IUsers } from "../../types/IUserResponse";
import { getfindUsers } from "../../src/app/api/users/userApi";

const useGetfindUsers = () => {
  return useQuery<IUsers[], { message: string }>(
    [getUsers],
    async () => await getfindUsers()
  );
};

export default useGetfindUsers;
