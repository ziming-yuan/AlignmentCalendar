import { createContext } from 'react';

const defaultContextValue = {
    formRef: null,
    onConfirmFunction: () => {}
};

const FormContext = createContext(defaultContextValue);

export default FormContext;