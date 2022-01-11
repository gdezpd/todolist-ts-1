import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type filterType= 'All'| 'Active' | 'Completed'

function App() {

    // const tasks1 = [
    //     {id: 1, title: "HTML&CSS", isDone: true},
    //     {id: 2, title: "JS", isDone: true},
    //     {id: 3, title: "ReactJS", isDone: false}
    // ]

    const [tasks, setTask] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]);

    const removeTasks = (tasksID:number) => {
    setTask(tasks.filter(f=>f.id!==tasksID))
    }

    const [filter, setFilter] = useState<filterType>("All")

    let filteredT=tasks
    if (filter==="Active"){
        filteredT= tasks.filter(f=>!f.isDone)
    }
    if (filter==="Completed"){
        filteredT= tasks.filter(f=>f.isDone)
    }


    const filteredTasks=(filterValue:filterType)=> {
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
            />
        </div>
    );
}

export default App;