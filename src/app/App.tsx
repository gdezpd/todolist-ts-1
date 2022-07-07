import React from 'react'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {TaskType} from "../api/todolist-api";
import {LinearProgress} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import TodolistList from "../featuris/TodolistList/TodolistList";
import {Login} from "../featuris/Login/Login";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>


            {status === 'loading' && <LinearProgress color="secondary"/>}

            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistList/>}/>
                    <Route path="login" element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
