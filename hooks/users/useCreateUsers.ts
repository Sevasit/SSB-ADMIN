import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IResponseDefault } from "../../types/IResponseDefult";
import { createUser, getUsers } from "../QueriesKey";
import { createUsers } from "@/app/api/user/userApi";

export default function useCreateUsers() {
  const queryClient = useQueryClient();
  return useMutation<IResponseDefault, { message: string }, any>(
    [createUser],
    (payload) => createUsers(payload),
    {
      onSuccess: () => queryClient.invalidateQueries([getUsers]),
    }
  );
}
