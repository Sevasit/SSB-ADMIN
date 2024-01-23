import { useQuery } from "@tanstack/react-query";
import { ITaskCurrent } from "../../types/ITask";
import { getTasksCurrent } from "../QueriesKey";
import { getFindCurrentTaskByTypeApi } from "@/app/api/task/taskApi";

const useGetTaskCurrent = (payload: string) => {
  return useQuery<ITaskCurrent[], { message: string }>(
    [getTasksCurrent, payload],
    async () => await getFindCurrentTaskByTypeApi(payload)
  );
};

export default useGetTaskCurrent;
