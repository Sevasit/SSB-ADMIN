import { useQuery } from "@tanstack/react-query";
import { ITaskPending } from "../../types/ITask";
import { getFindPendingByAdminApi } from "@/app/api/task/taskApi";
import { getTaskByAdmin } from "../QueriesKey";

const useGetTaskByAdmin = () => {
  return useQuery<ITaskPending[], { message: string }>(
    [getTaskByAdmin],
    async () => await getFindPendingByAdminApi()
  );
};

export default useGetTaskByAdmin;
