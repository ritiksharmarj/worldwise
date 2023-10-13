import { useContext } from 'react';
import { CitiesContext } from '../contexts/CitiesContext';

export function useCitiesContext() {
  // 3 - Consume the context
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(
      'CitiesContext was used outside of the CitiesContextProvider'
    );

  return context;
}
