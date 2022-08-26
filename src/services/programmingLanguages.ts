import { attributesParser } from "../helpers/dataHelper";
import { apiClient } from "../libs/apiClient";

export async function getAllProgrammingLanguages() {
    const { data } = await apiClient('get', '/programming-languages');
    //console.log(data.data);
    return data.data.map( item => {
        return attributesParser(item);
    });
}