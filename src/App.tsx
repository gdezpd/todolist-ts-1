import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type filterType = 'All' | 'Active' | 'Completed'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    const [tasks, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ]);

    const removeTasks = (tasksID: string) => {
        setTask(tasks.filter(f => f.id !== tasksID))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        const updatedTask: Array<TaskType> = [newTask, ...tasks]
        setTask(updatedTask)
    }

    const [filter, setFilter] = useState<filterType>("All")

    let filteredT = tasks

    if (filter === "Active") {
        filteredT = tasks.filter(f => !f.isDone)
    }
    if (filter === "Completed") {
        filteredT = tasks.filter(f => f.isDone)
    }

    const filteredTasks = (filterValue: filterType) => {
        setFilter(filterValue)
        return console.log(filterValue)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredT}
                removeTasks={removeTasks}
                filteredTasks={filteredTasks}
                addTask={addTask}
            />
        </div>
    );
}

export default App;