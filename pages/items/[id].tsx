import axios from "axios";
import { ITEMS_API_URL } from "../../constants/api";
import styles from "../../styles/Product.module.css";
import Detail from "../../components/product";

const ProductDetail = ({product}) => {
    return(
      <div className={styles.container}>
        <Detail product={product} ></Detail>
      </div>
    );
}

export async function getServerSideProps (context) {
    const { id } = context.query;
    return {
      props: {
        product: id 
                  ? (await axios.get(`${ITEMS_API_URL}/${id}`)).data 
                  : null
      }
    }  
  }

export default ProductDetail;