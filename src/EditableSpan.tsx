import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        // ? <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        ? <TextField
            id="outlined-basic"
            // label={title}
                  variant="outlined"
            value={title}
            onChange={changeTitle}
            autoFocus onBlur={activateViewMode}
            size={"small"}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})
