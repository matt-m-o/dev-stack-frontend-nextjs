import { Button, Grid, Group, Radio, SimpleGrid, Code } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

import useStyles  from '../../styles/Form.styles';
import { IDevelopmentType } from "../../types";
import { ImageCheckbox } from "../ImageCheckbox/ImageCheckbox";

import { useQueryGetAllDevelopmentTypes } from "../../services/queries";

interface Props {
    formData: IDevelopmentType[];
    setFormData: Dispatch<SetStateAction< IDevelopmentType[] >>;
}


const developmentTypeUIItems = [
    { 
        name: 'Backend',
        description: 'Sever side applications',
        title: 'Backend',        
        image: 'https://img.icons8.com/external-xnimrodx-blue-xnimrodx/64/000000/external-server-project-management-xnimrodx-blue-xnimrodx.png',
        //checked: false,
    },
    {
        name: 'Frontend',
        description: 'Client side applications',
        title: 'Frontend',
        image: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-front-end-computer-programming-flaticons-lineal-color-flat-icons.png',
        //checked: false,
    },
];

export function DevelopmentTypeForm ({ formData, setFormData }: Props) {

    const { classes } = useStyles();

        
    const { data, isFetching } = useQueryGetAllDevelopmentTypes();
        

    function handleFormChange(change: IDevelopmentType, checked: boolean) { 

        console.log({change, checked})
            

        let updated: IDevelopmentType[] = [];
        if (formData && !checked) {
            updated = formData.filter ( data => data.name !== change.name );
            //updated = updated.length > 0 ? updated : null
        }
        else if (checked) {

            //console.log(formData);

            let exists;

            if (formData) exists = formData.find( item => item.name === change.name );            

            if (formData && !exists) updated = [...formData, change];
            
            else updated = [ change ]            
        }

        console.log(updated)

        setFormData(updated);
    }
    
    let items;
    items = data?.map((dataItem) => {
        const uiItem = developmentTypeUIItems.find( uiItem => uiItem.name === dataItem.name );
        if (!uiItem) return;

        //console.log(dataItem);

        return (
            <ImageCheckbox 
                {...uiItem} 
                key={uiItem.title} 
                onChange= {handleFormChange}
                data= { {name: uiItem.title} }
            />
        )
    });

    return (
        <>                          
            <SimpleGrid
                cols={2}
                breakpoints={[
                    { maxWidth: 'md', cols: 2 },
                    { maxWidth: 'sm', cols: 1 },
                ]}
            >                
                {items}                
                
            </SimpleGrid>                         
        </>
    )
}