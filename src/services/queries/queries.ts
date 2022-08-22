import { useQuery } from "react-query";
import { IDevelopmentType, IProgrammingLanguage, IStack } from "../../types";

import { getAllDevelopmentTypes } from '../developmentTypes';
import { getAllProgrammingLanguages,  } from "../programmingLanguages";
import { getAllStacks } from "../stacks";


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