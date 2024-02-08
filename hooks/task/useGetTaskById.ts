import { useQuery } from "@tanstack/react-query";
import { ITaskById } from "../../types/ITask";
import { getFindByIdApi } from "@/app/api/task/taskApi";
import { getTasksPendingById } from "../QueriesKey";

const useGetTaskPendingById = (payload: string) => {
  return useQuery<ITaskById, { message: string }>(
    [getTasksPendingById, payload],
    async () => await getFindByIdApi(payload)
  );
};

export default useGetTaskPendingById;
