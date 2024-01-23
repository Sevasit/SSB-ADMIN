import { useQuery } from "@tanstack/react-query";
import { ITaskPending } from "../../types/ITask";
import { getTasksPending } from "../QueriesKey";
import { getFindPendingByTypeApi } from "@/app/api/task/taskApi";
const useGetTaskPending = (payload: string) => {
  return useQuery<ITaskPending[], { message: string }>(
    [getTasksPending, payload],
    async () => await getFindPendingByTypeApi(payload)
  );
};

export default useGetTaskPending;
