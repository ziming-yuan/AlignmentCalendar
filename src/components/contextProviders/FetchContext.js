import { createContext } from 'react';

const defaultContextValue = {
    fetchFlag: false,
    setFetchFlag: null
};

const FetchContext = createContext(defaultContextValue);

export default FetchContext;