export interface Product {
    id: String,
    title: String,
    price: {
    currency: String,
    amount: Number,
    decimals: Number
    },
    picture: String,
    condition: String,
    free_shipping: Boolean,
    state: String,
    sold_quantity: number,
    description: String
}

export interface ProductsSearch {
    author: {
        name: String
        lastname: String
        },
    categories: Array<String>,
    items: Array<Product>            
}