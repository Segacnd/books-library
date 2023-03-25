import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { IRegistrationFormContext } from '../../../interfases';

export const RegistrationFormContext = createContext<IRegistrationFormContext>({ data: {}, setFormValues: () => {} });

export const RegistrationFormProvider = ({ children }: any) => {
  const [data, setData] = useState({});

  const setFormValues = useCallback((values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  }, []);

  const contextValue = useMemo(() => ({ data, setFormValues }), [data, setFormValues]);

  return <RegistrationFormContext.Provider value={contextValue}>{children}</RegistrationFormContext.Provider>;
};

export const useFormData = () => useContext(RegistrationFormContext);
