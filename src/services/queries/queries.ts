import { useQuery } from "react-query";
import { IDevelopmentType, IProgrammingLanguage } from "../../types";

import { getAllDevelopmentTypes } from '../developmentTypes';
import { getAllProgrammingLanguages,  } from "../programmingLanguages";


export function useQueryGetAllDevelopmentTypes() {
    return useQuery<IDevelopmentType[]>('developmentTypes', async () => {    
        return await getAllDevelopmentTypes();        
    });
}

export function useQueryGetAllProgrammingLanguages() {
    return useQuery<IProgrammingLanguage[]>('programmingLanguages', async () => {    
        return await getAllProgrammingLanguages();        
    });
}