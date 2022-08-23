import { attributesParser } from '../helpers/dataHelper';
import { apiClient } from '../libs/apiClient'

interface ICreateStack {
    first_name: string;
    last_name: string;
    email: string;
}

export async function createUser(
    { first_name, last_name, email }: ICreateStack
) {
    const { data } = await apiClient('post', `/users`, {
        data: {
            first_name,
            last_name,
            email,
        }
    });
    
    return attributesParser(data.data);
}

export async function getUser({id}: { id: string }) {
    const { data } = await apiClient('get', `/users/${id}`);
    
    return attributesParser(data.data);
}