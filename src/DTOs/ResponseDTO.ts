import ErrorDetailDTO from './ErrorDetailDTO';

interface ResponseDTO{
    message?: string;
    data?: any;
    errors: ErrorDetailDTO[];
}

export default ResponseDTO;