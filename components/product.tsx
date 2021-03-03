import styles from "../styles/Product.module.css";


const Detail = ({product}) => {

    return(
    <div className={styles.product}>
        <div className={styles.product__detail}>
          <img src={product.picture}></img>
          <div className={styles.product__detail__misc}>
            <div>{product.condition}</div>
            <div className={styles.product__detail__misc__title}>{product.title}</div>
            <div className={styles.product__detail__misc__price}>${product.price.amount}</div>
            <div className={styles.product__detail__misc__button}>Comprar</div>
          </div>
        </div>
        <div className={styles.product__description}>
            <div className={styles.product__description_title}>Descripción del Producto</div>
            <span>{product.description}</span>
        </div>
      </div>
    );
}

export default Detail;