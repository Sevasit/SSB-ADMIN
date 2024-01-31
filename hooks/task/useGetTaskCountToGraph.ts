import { useQuery } from "@tanstack/react-query";
import { ITaskCountToGraph } from "../../types/ITask";
import { getTasksCountToGraph } from "../QueriesKey";
import { findTaskCountToGraph } from "@/app/api/task/taskApi";
const useGetTaskCountToGraph = () => {
  return useQuery<ITaskCountToGraph[], { message: string }>(
    [getTasksCountToGraph],
    async () => await findTaskCountToGraph()
  );
};

export default useGetTaskCountToGraph;
