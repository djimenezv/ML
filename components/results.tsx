import styles from '../styles/Results.module.css';
import Link from 'next/link';

const Result = ({searchResults}) => {

    return(
        <div className={styles.results}>
            {   
                searchResults? searchResults.items.map(product => getProductDisplay(product)) : ''
            }
        </div>
    );
    
}

const getProductDisplay = (product) => {
    return(
        <Link href={`/items/${product.id}`}>
            <div className={styles.result__row} key={product.id}>
                <img src={product.picture}></img>
                <div className={styles.result__row__details}>
                    <div className={styles.results__row__details__price}>
                        <div className={styles.results__row__details__value}>${product.price.amount}</div>
                        <div className={styles.results__row__details__location}>{product.state}</div>
                    </div>
                    <div className={styles.results__row__details__title}>{product.title}</div>
                    <div>{product.condition}</div>
                </div>
            </div>
        </Link>
    );
}

export default Result;
