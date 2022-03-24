import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AppWithRedux from "../AppWithReducer";
import {store} from "../store/store";
import {Provider} from "react-redux";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Todolist/AppWithRedux',
  component: AppWithRedux,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addItem:{
      description: 'callback',
    }

  },
} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = (args) => <Provider store={store}> <AppWithRedux /> </Provider>;

export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppWithReduxStory.args = {
};