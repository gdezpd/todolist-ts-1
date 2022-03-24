import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './Button';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    arg: {
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
    },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
    task: {id: '111', isDone: true, title: 'JS'},
    // todolistId: 'qwe',
};

export const TaskIsNoteDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNoteDoneStory.args = {
    task: {id: '111', isDone: false, title: 'HTML'},
    // todolistId: 'qwew',
};