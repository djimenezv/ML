import styles from '../styles/Header.module.css';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Header component
 * @param setSearchKey: property in storage with the string the user is using to search products
 * @param searchProducts: products found given the search key
 * @param searchKey: search key enter by user
 */
const Header = () => {
    const [searchKey, setSearchKey] = useState('');

    return (
    <div className={styles.header}>
        <div className={styles.header__row}>
            <div className={styles.header__row__img}></div>
            <input className={styles.header__row__input} onChange={evt => setSearchKey(evt.target.value) } type='text'></input>
            <Link href={`/items?q=${searchKey}`}>
                <div className={styles.header__row__seacrh}></div>
            </Link>
        </div>
    </div>
    );
}
  
export default Header;