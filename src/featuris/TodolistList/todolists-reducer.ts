import {v1} from 'uuid';
import {todolistAPI, TodoType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {setAppReducerAC, setErrorAC} from "../../app/app-reducer";

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodoType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOS":
            return action.todos.map(tl => ({...tl, filter: 'all' as FilterValuesType}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter:'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title:action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter:action.filter} : tl)
        }
        default:
            return state;
    }
}

// Actions
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodoType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
} as const)
export const setTodolistsAC = (todos: TodoType[]) => ({type: 'SET-TODOS', todos} as const)

// Thank
export const fetchTodosTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppReducerAC('loading'))
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppReducerAC('succeeded'))
        })
}
export const deletedTodoTC = (todosId: string) => (dispatch: Dispatch) => {
    dispatch(setAppReducerAC('loading'))
    todolistAPI.deleteTodolist(todosId)
        .then((res) => {
            dispatch(removeTodolistAC(todosId))
            dispatch(setAppReducerAC('succeeded'))
        })
}
export const createTodoTC = (titleTodo: string) => (dispatch: Dispatch) => {
    dispatch(setAppReducerAC('loading'))
    todolistAPI.createTodolist(titleTodo)
        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppReducerAC('succeeded'))
            } else {
                dispatch(setErrorAC(res.data.messages[0]))
            }
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}

// Types
export type  AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistsActionType
