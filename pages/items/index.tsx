import styles from '../../styles/Home.module.css'
import Results from "../../components/results";
import axios from 'axios';
import { SEARCH_API_URL } from '../../constants/api';

const Items = ({searchResult}) => {
  return (
      <div className={styles.container}>
        <Results searchResults={searchResult}></Results>
      </div>
  )
}

export async function getServerSideProps (context) {
  const { q } = context.query;
  return {
    props: {
      searchResult: q ? (await axios.get(`${SEARCH_API_URL}${q}`)).data : null
    }
  }  
}

export default Items;