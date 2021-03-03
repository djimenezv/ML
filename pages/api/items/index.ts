import { NextApiRequest, NextApiResponse } from 'next';
import { listProductsByKey } from '../../../services/products';

async function searchProductsByKey  (req: NextApiRequest, res: NextApiResponse) {
    const searchKey = req.query.q.toString();

    if(req.method !== 'GET' || !searchKey) {
        res.status(400).json({'error': 'wrong request'});
    }

    listProductsByKey(searchKey).then(
        r => res.status(200).json(r),
        error => res.status(500).json(error)
    );
    
}

export default searchProductsByKey;