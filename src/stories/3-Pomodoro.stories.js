import React from 'react';
import { action } from '@storybook/addon-actions';
import Pomodoro from '../pomodoro/Pomodoro';

export default {
  title: 'Pomodoro',
};

export const basic = () => <Pomodoro />;
