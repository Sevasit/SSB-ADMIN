// USER KEY
const getUsers = "GET_USERS";
const getUsersById = "GET_USERBYID";
const deleteUser = "DELETE_USERS";
const createUser = "CREATE_USERS";
const editUser = "EDIT_USERS";

//TYPE KEY
const getTypes = "GET_TYPES";
const getTypesById = "GET_TYPEBYID";
const deleteType = "DELETE_TYPES";
const createType = "CREATE_TYPES";
const editType = "EDIT_TYPES";

//TASK KEY
const getTaskHistory = "GET_TASK_HISTORY";
const getTasksPending = "GET_TASKS_PENDING";
const getTasksPendingById = "GET_TASKS_PENDINGBYID";
const getTasksApproved = "GET_TASKS_APPROVED";
const getTasksCurrent = "GET_TASKS_CURRENT";
const rejectTask = "REJECT_TASK";
const approveTask = "APPROVE_TASK";
const sendTask = "SEND_TASK";
const getTasksCount = "GET_TASKS_COUNT";
const getTasksCountToGraph = "GET_TASKS_COUNTTOGRAPH";
const getTaskByAdmin = "GET_TASK_BY_ADMIN";

//add export key
export {
  getTaskHistory,
  getUsers,
  deleteUser,
  getTypes,
  createUser,
  getUsersById,
  editUser,
  deleteType,
  createType,
  editType,
  getTypesById,
  getTasksPending,
  getTasksPendingById,
  approveTask,
  getTasksApproved,
  sendTask,
  getTasksCurrent,
  getTasksCount,
  getTasksCountToGraph,
  getTaskByAdmin,
  rejectTask,
};
