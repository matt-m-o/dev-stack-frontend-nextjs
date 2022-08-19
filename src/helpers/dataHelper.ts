export const attributesParser = (data: any) =>  {
    return {
        id: data?.id,
        ...data.attributes,        
    }
}
