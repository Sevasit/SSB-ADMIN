import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IResponseDefault } from "../../types/IResponseDefult";
import { editUser, getUsers } from "../QueriesKey";
import { editUsersApi } from "@/app/api/user/userApi";

export default function useEditUsers() {
  const queryClient = useQueryClient();
  return useMutation<IResponseDefault, { message: string }, any>(
    [editUser],
    (payload) => editUsersApi(payload),
    {
      onSuccess: () => queryClient.invalidateQueries([getUsers]),
    }
  );
}
