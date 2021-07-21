// import axios from 'axios';
// import ResponseDTO from '../DTOs/ResponseDTO';
import XxxDTO from '../DTOs/XxxDTO';
import logger from '../Utils/logger';

export interface IXxxService{
    getSomething: (data:any) => Promise<XxxDTO>;
}

class XxxService implements IXxxService{

    //TODO: Implement this
    async getSomething(data: string): Promise<XxxDTO> {
        try{
            // Return mock data only,, Uncomment to call real API
            // const response: ResponseDTO = await axios.get(`some_URL`, data);
            // if (response.data.errors && response.data.errors.length > 0) {
            //     let errors = response.data.errors.map(s => s.details);
            //     throw errors;
            // }
            const result: XxxDTO = {
                greeting: "Hello "+data
            };
            return result;            
        }catch(error){
            logger.error(error);
            throw error;
        }
    }
}

export const impl = new XxxService();