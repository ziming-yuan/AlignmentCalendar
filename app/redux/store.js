'use client';

import { configureStore } from '@reduxjs/toolkit';
import functionReducer from './features/function/functionSlice';

export const store = configureStore({
    reducer: {
        functionRef: functionReducer,
    }
})