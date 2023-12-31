import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../QueriesKey";
import { IUsers } from "../../types/IUserResponse";
import { getfindUsersApi } from "../../src/app/api/user/userApi";

const useGetfindUsers = () => {
  return useQuery<IUsers[], { message: string }>(
    [getUsers],
    async () => await getfindUsersApi()
  );
};

export default useGetfindUsers;
