import { createContext } from 'react';

const defaultContextValue = {
    router: null,
};

const RouterContext = createContext(defaultContextValue);

export default RouterContext;