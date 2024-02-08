import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IResponseDefault } from "../../types/IResponseDefult";
import { rejectTaskApi } from "@/app/api/task/taskApi";
import {
  rejectTask,
  getTasksPending,
  getTasksCurrent,
  getTasksApproved,
} from "../QueriesKey";

export default function useReject() {
  const queryClient = useQueryClient();
  return useMutation<IResponseDefault, { message: string }, any>(
    [rejectTask],
    (payload) => rejectTaskApi(payload),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([
          getTasksPending,
          getTasksCurrent,
          getTasksApproved,
        ]),
    }
  );
}
