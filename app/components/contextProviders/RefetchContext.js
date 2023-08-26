import { createContext } from 'react';

const defaultContextValue = {
    onRefetch: () => {},
};

const RefetchContext = createContext(defaultContextValue);

export default RefetchContext;