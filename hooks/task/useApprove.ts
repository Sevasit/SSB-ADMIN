import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IResponseDefault } from "../../types/IResponseDefult";
import { approveTaskApi } from "@/app/api/task/taskApi";
import { approveTask, getTasksPending } from "../QueriesKey";

export default function useApprove() {
  const queryClient = useQueryClient();
  return useMutation<IResponseDefault, { message: string }, any>(
    [approveTask],
    (payload) => approveTaskApi(payload),
    {
      onSuccess: () => queryClient.invalidateQueries([getTasksPending]),
    }
  );
}
