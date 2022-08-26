import { attributesParser, relationshipsParser } from '../helpers/dataHelper';
import { apiClient } from '../libs/apiClient'
import { IProgrammingLanguage, IStack } from '../types';


interface ICreateStack {
    id_user: string;
    id_development_type: string;    
}

interface IUpdateStack {
    id_stack: string;
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


export async function createUserStack({id_user, id_development_type}: ICreateStack): Promise<IStack> {
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

export async function stackDeleteProgrammingLanguage({id_user, id_stack, id_programming_language}: IStackAddProgrammingLanguage) {
    await apiClient(
        'delete', `/users/${id_user}/stacks/${id_stack}/programming-languages/${id_programming_language}`
    );
}

export async function getUserStacks({ id_user }: {id_user: string}){
    const { data } = await apiClient('get', `/users/${id_user}/stacks`);
    return data.data.map( item => {
        console.log(item);
        const stack = relationshipsParser(attributesParser(item));

        console.log(stack);

        stack.development_type = attributesParser(stack.development_type)

        stack.programming_languages = stack.programming_languages.map( item => {
            return attributesParser(item);
        });

        return stack;
    });
}

export async function updateUserStack({ id_stack, id_user, id_development_type }: IUpdateStack): Promise<IStack> {
    const { data } = await apiClient('patch', `/users/${id_user}/stacks/${id_stack}`, {
        data: {
            id_development_type
        }
    });
    return attributesParser(data.data);
}

export async function deleteUserStack({ id_user, id_stack }: {id_user: string, id_stack: string}) {
    await apiClient('delete', `/users/${id_user}/stacks/${id_stack}`);
}


export async function saveStackProgrammingLanguagesChanges(
    stack: IStack,
    updatedProgrammingLanguages: IProgrammingLanguage[],
) {

    const toAdd = updatedProgrammingLanguages.filter( updatedItem => {
        const alreadyExists = stack.programming_languages?.some( item => item.id === updatedItem.id );
        if (!alreadyExists) return updatedItem;
    });

    const toDelete = stack?.programming_languages?.filter( item => {
        const exists = updatedProgrammingLanguages.some( updatedItem => updatedItem.id === item.id );
        if (!exists) return item;
    });

    const promises: Promise<any>[] = [];

    for (const language of toAdd || []) {
        promises.push(
            stackAddProgrammingLanguage({
                id_user: stack.id_user,
                id_stack: stack.id,
                id_programming_language: language.id,
            })
        );
    }

    for (const language of toDelete || []) {
        promises.push(
            stackDeleteProgrammingLanguage({
                id_user: stack.id_user,
                id_stack: stack.id,
                id_programming_language: language.id,
            })
        );
    }

    await Promise.all(promises);
}