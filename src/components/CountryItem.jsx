import styles from './CountryItem.module.css';

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <img
        src={`https://flagcdn.com/24x18/${country.emoji.toLowerCase()}.png`}
        width='24'
        height='18'
        alt={country.emoji}
      />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
