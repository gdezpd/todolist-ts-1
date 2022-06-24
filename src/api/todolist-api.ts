import axios, {AxiosResponse} from 'axios'const instance = axios.create({    baseURL: 'https://social-network.samuraijs.com/api/1.1/',    withCredentials: true,    headers: {        'API-KEY': '74718249-56a1-4b64-b024-8ff831c849e8'    }})export const todolistAPI = {    getTodolist() {        return instance.get<TodoType[]>('todo-lists');    },    createTodolist(title: string) {        return instance.post<{ title: string }, AxiosResponse<CommonResponseType<{ item: TodoType }>>>('todo-lists', {title});    },    deleteTodolist(id: string) {        return instance.delete<ResponseType>(`todo-lists/${id}`);    },    updateTodolist(id: string, title: string) {        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${id}`, {title});    },    getTasks(todolistId: string) {        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);    },    deleteTask(todolistId: string, taskId: string) {        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);    },    createTask(todolistId: string, title: string) {        return instance.post<{ title: string; }, AxiosResponse<CommonResponseType<{ item: TaskType; }>>>(`todo-lists/${todolistId}/tasks`, {title});    },    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {        return instance.put<UpdateTaskModelType, AxiosResponse<CommonResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);    }}export type TodoType = {    id: string    title: string    addedDate: string    order: number}type CommonResponseType<T = {}> = {    data: T    fieldsErrors: string[]    messages: string[]    resultCode: number}export enum TaskStatuses {    New = 0,    InProgress = 1,    Completed = 2,    Draft = 3}export enum TaskPriorities {    Low = 0,    Middle = 1,    Hi = 2,    Urgently = 3,    Later = 4}export type TaskType = {    description: string    title: string    status: TaskStatuses    priority: TaskPriorities    startDate: string    deadline: string    id: string    todoListId: string    order: number    addedDate: string}export type UpdateTaskModelType = {    title: string    description: string    status: TaskStatuses    priority: TaskPriorities    startDate: string    deadline: string}export type GetTasksResponse = {    error: string | null    totalCount: number    items: TaskType[]}