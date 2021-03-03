import { getProductByKey, getProductById as getProduct } from "../repository/products";
import { map, take, mergeMap, reduce, catchError } from "rxjs/Operators";
import { Observable } from "rxjs";
import { Product, ProductsSearch } from "../models/products";

/**
 * this method apply some rxjs operator over the raw result from the ML endpoint
 * and retrieves a formatted entity with products and categories
 * @param searchKey : String to search products
 */
export async function listProductsByKey  (searchKey) {

    return new Promise((resolve, reject) => {
        const product$ = getProductByKey(searchKey);
        product$.pipe(
            map((r:any) => r.data),
            map(d => d.results),
            mergeMap(a => a),
            take(4),
            reduce((acum, val) => getFormattedProduct(acum, val), null),
        ).subscribe(re => resolve(re), err => reject(err));
    });

}

export const getProductById = (productId) => {

    const searchResult = new Observable((observer) => {
        const product$ = getProduct(productId);
        product$.pipe(
            map((r:any) => (Array.isArray(r) && r.length == 2) 
                            ? getFormattedItem(r[0].data, r[1].data) 
                            : {})
        )        
        .subscribe(re => observer.next(re))                
    });

    return searchResult;
}


/**
 * This function is used by the reducer its main goal is to process raw entity 
 * and convert that raw data into a formatted data
 * @param formattedEntity : The accum of the reducer
 * @param rawProduct : The raw product data returned by the endpoint
 */
const getFormattedProduct = (formattedEntity, rawProduct) : any => {

    return !formattedEntity ?
                getNewFormattedItem(rawProduct):
                getUpdatedFormattedItem(formattedEntity, rawProduct);

}

/**
 * Retrieves a formatted entity given a raw product entity
 * @param rawItem : raw product entity
 */
const getFormattedItem = (rawItem: any, rawDescription:any = null) => {

    return <Product> {
        id: rawItem.id,
        title: rawItem.title,
        price: {
            currency: rawItem.currency_id,
            amount: rawItem.price,
            decimals: rawItem.price % 1
        },
        picture: rawItem.thumbnail,
        condition: rawItem.condition,
        free_shipping: rawItem.shipping.free_shipping,
        state: rawItem.address? rawItem.address.state_name : null,
        sold_quantity: rawItem.sold_quantity,
        description: rawDescription? rawDescription.plain_text : null
    }

}

/**
 * Retreive a new formatted entity for the first product
 * @param rawProduct: raw product entity
 */
const getNewFormattedItem = (rawProduct) => {
    return <ProductsSearch> {
        categories : [rawProduct.category_id],
        items:[getFormattedItem(rawProduct)]
     }
}

/**
 * Updates the existing formatted entity given a new raw entity 
 * @param formattedItem : Formatted data
 * @param rawProduct : new product raw data to add
 */
const getUpdatedFormattedItem = (formattedItem : ProductsSearch, rawProduct) => {

    return <ProductsSearch> {
        ...formattedItem,
        categories: [...formattedItem.categories, rawProduct.category_id],
        items: [...formattedItem.items, getFormattedItem(rawProduct)]  
    }
    
}


