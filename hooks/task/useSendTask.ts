import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IResponseDefault } from "../../types/IResponseDefult";
import { getTasksApproved, sendTask } from "../QueriesKey";
import { sendTaskApi } from "@/app/api/task/taskApi";

export default function useSendTask() {
  const queryClient = useQueryClient();
  return useMutation<IResponseDefault, { message: string }, any>(
    [sendTask],
    (payload) => sendTaskApi(payload),
    {
      onSuccess: () => queryClient.invalidateQueries([getTasksApproved]),
    }
  );
}
