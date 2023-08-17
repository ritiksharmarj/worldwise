import styles from './CountryItem.module.css';

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <img
        src={`https://flagcdn.com/24x18/${country.emoji.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/48x36/${country.emoji.toLowerCase()}.png 2x,
    https://flagcdn.com/72x54/${country.emoji.toLowerCase()}.png 3x`}
        width='24'
        height='18'
        alt={country.emoji}
      />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
