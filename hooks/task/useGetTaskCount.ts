import { useQuery } from "@tanstack/react-query";
import { ITaskCount } from "../../types/ITask";
import { getTasksCount } from "../QueriesKey";
import { findTaskCount } from "@/app/api/task/taskApi";
const useGetTaskCount = () => {
  return useQuery<ITaskCount[], { message: string }>(
    [getTasksCount],
    async () => await findTaskCount()
  );
};

export default useGetTaskCount;
