import { NextApiRequest, NextApiResponse } from 'next';
import { getProductById } from '../../../services/products';



const getProductsById = (req: NextApiRequest, res: NextApiResponse) => {
    const productId = req.query.id.toString();

    if(req.method !== 'GET' || !productId) {
        res.status(400).json({'error': 'wrong request'});
    }

    const product$ = getProductById(productId);
    
    product$.subscribe(
        (product) => product ? res.json(product) : res.json({}),
        (error) => res.status(500) 
    );

}

export default getProductsById;