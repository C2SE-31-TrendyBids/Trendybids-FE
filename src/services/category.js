
import * as request from '../ultils/request'

const getAllCategory = async () => {
    try {
        const response = await request.get('/category/get-all-category')
       
    return {
      response: response.data,
      statusCode: response.status,
    };

    } catch (error) {
        console.log(error);
    }
}

export {
    getAllCategory
}

