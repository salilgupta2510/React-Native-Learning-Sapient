import axios from 'axios';
import { REACT_APP_API } from '../constants';

export interface ServerAdapter {
    reset(): Promise<any>;
}

export class HttpServerAdapter {
    reset(): Promise<any> {
        return axios.delete(REACT_APP_API + '/orders');
    }
}