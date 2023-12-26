import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers } from "../QueriesKey";
import { deleteUsers } from "@/app/api/users/userApi";
import { IResponseDefault } from "../../types/IResponseDefult";

export default function useCreateUsers() {
  const queryClient = useQueryClient();
  return useMutation<IResponseDefault, { message: string }, any>(
    [deleteUser],
    (payload) => deleteUsers(payload),
    {
      onSuccess: () => queryClient.invalidateQueries([getUsers]),
    }
  );
}
