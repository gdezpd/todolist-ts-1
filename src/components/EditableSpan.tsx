import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    collBack: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onDubleClickHundler = () => {
        setNewTitle(props.title)
        setEdit(true)
    }
    const onBlureHundler = () => {
        props.collBack(newTitle)
        setEdit(false)
    }

    return (
        edit
            ? <input value={newTitle} autoFocus={true} onBlur={onBlureHundler} onChange={onChangeHandler}/>
            : <span onDoubleClick={onDubleClickHundler}> {props.title}</span>
    )
};
