import {configureStore} from '@reduxjs/toolkit';
import {reducer} from "../reducers/reducer.ts";

export const store = configureStore({reducer: reducer})