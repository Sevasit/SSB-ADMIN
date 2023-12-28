import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers } from "../QueriesKey";
import { deleteUsers } from "@/app/api/user/userApi";
import { IResponseDefault } from "../../types/IResponseDefult";

export default function useDeleteUsers() {
  const queryClient = useQueryClient();
  return useMutation<IResponseDefault, { message: string }, any>(
    [deleteUser],
    (payload) => deleteUsers(payload),
    {
      onSuccess: () => queryClient.invalidateQueries([getUsers]),
    }
  );
}
