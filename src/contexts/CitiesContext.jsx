import { createContext, useState, useEffect } from 'react';

// 1 - Create a context
const CitiesContext = createContext();

function CitiesContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/cities`);
        const data = await res.json();

        setCities(data);
      } catch (error) {
        alert('There was an error loading data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  /**
   * Get the current city data
   * @param {number} id pass an ID of selected cities
   */
  async function getCurrentCity(id) {
    try {
      setIsLoading(true);

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/cities/${id}`);
      const data = await res.json();

      setCurrentCity(data);
    } catch (error) {
      alert('There was an error loading data.');
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Create new city
   * @param {object} newCity new city data
   */
  async function createCity(newCity) {
    try {
      setIsLoading(true);

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert('There was an error creating city.');
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Delete city
   * @param {number} id current city id
   */
  async function deleteCity(id) {
    try {
      setIsLoading(true);

      await fetch(`${import.meta.env.VITE_BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert('There was an error deleting city.');
    } finally {
      setIsLoading(false);
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
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContextProvider, CitiesContext };
