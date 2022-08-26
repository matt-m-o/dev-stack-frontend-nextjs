export const attributesParser = (data: any) =>  {
    return {
        ...data,        
        ...data.attributes,
        attributes: undefined,
    }
}

export const relationshipsParser = (data: any) =>  {
    return {
        ...data,
        ...data.relationships,
        relationships: undefined,
    }
}