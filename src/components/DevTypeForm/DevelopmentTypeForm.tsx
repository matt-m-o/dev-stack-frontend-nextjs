import { Button, Grid, Group, Radio, SimpleGrid } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

import useStyles  from '../../styles/Form.styles';
import { IDevelopmentType } from "../../types";
import { ImageCheckbox } from "../ImageCheckbox/ImageCheckbox";

import { IconServer } from '@tabler/icons';

interface Props {
    formData: IDevelopmentType[];
    setFormData: Dispatch<SetStateAction< IDevelopmentType[] >>;
}


const mockdata = [
    { 
        name: 'backend',
        description: 'Sever side applications',
        title: 'Backend',        
        image: 'https://img.icons8.com/external-xnimrodx-blue-xnimrodx/64/000000/external-server-project-management-xnimrodx-blue-xnimrodx.png',
        //checked: false,
    },
    {
        name: 'frontend',
        description: 'Client side applications',
        title: 'Frontend',
        image: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-front-end-computer-programming-flaticons-lineal-color-flat-icons.png',
        //checked: false,
    },
];

export function DevelopmentTypeForm ({ formData, setFormData }: Props) {

    const { classes } = useStyles();

        

    
    

    function validateForm (formData: IDevelopmentType[] | null) { return true; }

    function handleFormChange(change: IDevelopmentType, checked: boolean) { 

        console.log({change, checked})
            

        let updated: IDevelopmentType[] = [];
        if (formData && !checked) {
            updated = formData.filter ( data => data.name !== change.name );
            //updated = updated.length > 0 ? updated : null
        }
        else if (checked) {

            console.log(formData)

            let exists;

            if (formData) exists = formData.find( item => item.name === change.name );            

            if (formData && !exists) updated = [...formData, change];
            
            else updated = [ change ]            
        }

        console.log(updated)

        if (validateForm(updated)) setFormData(updated);
    }

    const items = mockdata.map((item) => 
        <ImageCheckbox 
            {...item} 
            key={item.title} 
            onChange= {handleFormChange}
            data= { {name: item.title} }            
        />
    );

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