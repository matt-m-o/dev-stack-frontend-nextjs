import { attributesParser, relationshipsParser } from '../helpers/dataHelper';
import { apiClient } from '../libs/apiClient'
import { IStack } from '../types';


interface ICreateStack {
    id_user: string;
    id_development_type: string;    
}

interface IStackAddProgrammingLanguage {
    id_user: string;
    id_stack: string;
    id_programming_language: string;
}

export async function getAllStacks() {
    const { data } = await apiClient('get', '/stacks');
    return data.data.map( item => {
        const stack = relationshipsParser(attributesParser(item));

        stack.development_type = attributesParser(stack.development_type)

        stack.programming_languages = stack.programming_languages.map( item => {
            return attributesParser(item);
        });

        return stack;
    });
}


export async function createStack({id_user, id_development_type}: ICreateStack): Promise<IStack>{
    const { data } = await apiClient('post', `/users/${id_user}/stacks`, {
        data: {
            id_development_type
        }
    });
    return attributesParser(data.data);
}


export async function stackAddProgrammingLanguage({id_user, id_stack, id_programming_language}: IStackAddProgrammingLanguage) {
    const { data } = await apiClient(
        'post', `/users/${id_user}/stacks/${id_stack}/programming-languages`, {
            data: {
                id_programming_language
            }
        }
    );
    return attributesParser(data.data);
}