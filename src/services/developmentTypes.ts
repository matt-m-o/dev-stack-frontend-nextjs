import { attributesParser } from '../helpers/dataHelper';
import { apiClient } from '../libs/apiClient'

export async function getAllDevelopmentTypes() {
    const { data } = await apiClient('get', '/development-types');
    return data.data.map( item => {
        return attributesParser(item);
    });
}