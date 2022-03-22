import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    removeTask: (taskId: string) => void
}

export const Task = memo((props: TaskPropsType) => {

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue);
    }, [props.changeTaskStatus, props.task.id])
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue);
    }, [props.changeTaskTitle, props.task.id])
    const onClickHandler = useCallback(() => props.removeTask(props.task.id), [props.removeTask, props.task.id])
    return <div className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            onChange={onChangeHandler}
            checked={props.task.isDone}/>
        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>

        <IconButton aria-label="delete" onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>

})

