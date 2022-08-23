import { useQuery, UseQueryOptions } from "react-query";
import { IDevelopmentType, IProgrammingLanguage, IStack, IUser } from "../../types";

import { getAllDevelopmentTypes } from '../developmentTypes';
import { getAllProgrammingLanguages,  } from "../programmingLanguages";
import { getAllStacks, getUserStacks } from "../stacks";
import { getUser } from "../users";
import { queryClient } from "./queryClient";

export async function invalidateQuery(queryKey: string) {
    await queryClient.invalidateQueries([queryKey])
}

export function queryGetAllDevelopmentTypes() {
    return useQuery<IDevelopmentType[]>('developmentTypes', async () => {    
        return await getAllDevelopmentTypes();        
    });
}

export function queryGetAllProgrammingLanguages() {
    return useQuery<IProgrammingLanguage[]>('programmingLanguages', async () => {    
        return await getAllProgrammingLanguages();        
    });
}

export function queryGetAllStacks() {
    return useQuery<IStack[]>('stacks', async () => {    
        return await getAllStacks();
    });
}


export function queryGetUser({ id }:{ id: string }, options= {}) {
    return useQuery<IUser>('user', async () => {    
        return await getUser({id});        
    }, options);
}


export function queryGetUserStacks({ id }:{ id: string }, options= {}) {
    return useQuery<IStack[]>('userStacks', async () => {
        return await getUserStacks({ id_user: id });
    }, options);
}

