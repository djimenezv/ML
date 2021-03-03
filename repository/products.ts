import { Observable } from 'rxjs';
import axios from 'axios';
import { SEARCH_API_URL_ML, GET_PRODUCT_API_URL_ML } from '../constants/api';


/** Returns detail for a product given its unique id */
export function getProductById (productId: string) : Observable<any> {

    const product$ = new Observable((subscriber) => {
        axios.all([
            axios.get(`${GET_PRODUCT_API_URL_ML}${productId}`),
            axios.get(`${GET_PRODUCT_API_URL_ML}${productId}/description`)
        ])
        .then(axios.spread((...responses)  =>  subscriber.next(responses)))
        .catch(error => subscriber.next(error));
    });

    return product$;
} 

/** Returns a list of product which their name match with a given productKey */
export function getProductByKey (productKey : string) {

    const product$ = new Observable((subscriber) => {
      axios.get(`${SEARCH_API_URL_ML}${productKey}`)
      .then(r => subscriber.next(r));
    });

    return product$;
} 