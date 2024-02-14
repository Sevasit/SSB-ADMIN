import { useQuery } from "@tanstack/react-query";
import { getTaskHistory } from "../QueriesKey";
import { getFindAllTaskHistory } from "@/app/api/task/taskApi";
import { ITaskHistory } from "../../types/ITask";

const useGetTaskHistory = () => {
  return useQuery<ITaskHistory[], { message: string }>(
    [getTaskHistory],
    async () => await getFindAllTaskHistory()
  );
};

export default useGetTaskHistory;
