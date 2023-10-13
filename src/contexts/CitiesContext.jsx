import { createContext, useEffect, useReducer } from 'react';

// 1 - Create a context
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'getCities':
      return { ...state, isLoading: false, cities: action.payload };
    case 'getCurrentCity':
      return { ...state, isLoading: false, currentCity: action.payload };
    case 'createCity':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'deleteCity':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Unknown action');
  }
};

function CitiesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  // Fetch all cities
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' });

      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/cities`);
        const data = await res.json();

        dispatch({ type: 'getCities', payload: data });
      } catch (error) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities.',
        });
      }
    };

    fetchCities();
  }, []);

  /**
   * Get the current city data
   * @param {number} id pass an ID of selected cities
   */
  async function getCurrentCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/cities/${id}`);
      const data = await res.json();

      dispatch({ type: 'getCurrentCity', payload: data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the city.',
      });
    }
  }

  /**
   * Create new city
   * @param {object} newCity new city data
   */
  async function createCity(newCity) {
    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();

      dispatch({ type: 'createCity', payload: data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating city.',
      });
    }
  }

  /**
   * Delete city
   * @param {number} id current city id
   */
  async function deleteCity(id) {
    dispatch({ type: 'loading' });

    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'deleteCity', payload: id });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting city.',
      });
    }
  }

  return (
    // 2 - Provide value to child components
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCurrentCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContextProvider, CitiesContext };
