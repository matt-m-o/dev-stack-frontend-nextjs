export const attributesParser = (data: any) =>  {
    return {
        id: data?.id,
        relationships: data?.relationships,
        ...data.attributes,
    }
}

export const relationshipsParser = (data: any) =>  {
    return {
        id: data?.id,
        attributes: data?.attributes,
        ...data.relationships,
    }
}