import React, {useCallback, useEffect} from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Menu} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodoTC, deletedTodoTC,
    fetchTodosTC,
    FilterValuesType, TodolistDomainType
} from "../../state/todolists-reducer";
import {changeTaskStatusTC, changeTaskTitleTC, createTaskTS, deleteTasksTC} from "../../state/tasks-reducer";
import {AppRootStateType} from "../../app/store";
import {TaskStatuses, TaskType} from "../../api/todolist-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function TodolistList() {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodosTC())
    }, [])


    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(deleteTasksTC(todolistId, id))
    }, []);
    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(createTaskTS(todolistId, title))
        // const action = addTaskAC(title, todolistId);
        // dispatch(action);
    }, []);
    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {

        dispatch(changeTaskStatusTC(todolistId, id, status))
        // const action = changeTaskStatusAC(id, status, todolistId);
        // dispatch(action);
    }, []);
    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleTC(id, newTitle, todolistId))
    }, []);
    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);
    const removeTodolist = useCallback(function (id: string) {
        dispatch(deletedTodoTC(id))
    }, []);
    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTC(id, title))
    }, []);
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodoTC(title))
    }, []);

    return (
        <div className="TodolistList">

            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </div>
    );
}

export default TodolistList;
