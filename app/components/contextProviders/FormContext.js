import { createContext } from 'react';

const defaultContextValue = {
    formRef: null,
    setIsModalOpen: () => {}
};

const FormContext = createContext(defaultContextValue);

export default FormContext;