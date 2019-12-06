import React from 'react';
import { action } from '@storybook/addon-actions';
import Loading from '../common/loading'

export default {
  title: 'Loading',
};

export const red = () => <Loading color="red"/>;
export const black = () => <Loading color="black"/>;

