import { useQuery } from "@tanstack/react-query";
import { ITaskPending } from "../../types/ITask";
import { getFindCompleteByTypeApi } from "@/app/api/task/taskApi";
import { getTasksApproved } from "../QueriesKey";

const useGetTaskComplete = (payload: string) => {
  return useQuery<ITaskPending[], { message: string }>(
    [getTasksApproved, payload],
    async () => await getFindCompleteByTypeApi(payload)
  );
};

export default useGetTaskComplete;
