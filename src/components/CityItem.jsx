import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import { useCitiesContext } from '../hooks/useCitiesContext';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const { currentCity } = useCitiesContext();

  const { cityName, emoji, date, id, position } = city;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <img
          src={`https://flagcdn.com/24x18/${emoji.toLowerCase()}.png`}
          width='24'
          height='18'
          alt={emoji}
        />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='12'
            height='12'
            viewBox='0 0 256 256'
          >
            <path d='M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z'></path>
          </svg>
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
