import { Button, Grid, Group, Radio, SimpleGrid, Code } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

import useStyles  from '../../styles/Form.styles';
import { IProgrammingLanguage } from "../../types";
import { ImageCheckbox } from "../ImageCheckbox/ImageCheckbox";

import { useQueryGetAllProgrammingLanguages } from "../../services/queries";

import logos from '../../images/programming_languages_logos'

interface Props {
    formData: IProgrammingLanguage[];
    setFormData: Dispatch<SetStateAction< IProgrammingLanguage[] >>;
}


const programmingLanguageUIItems = [
    { 
        name: 'JavaScript',
        title: 'JavaScript',        
        image: logos.javascript,        
    },
    {
        name: 'TypeScript',        
        title: 'TypeScript',
        image: logos.typescript,
    },
    {
        name: 'Python',        
        title: 'Python',
        image: logos.python,        
    },
    {
        name: 'Rust',        
        title: 'Rust',
        image: logos.rust,        
    },
    {
        name: 'GO',
        title: 'GO',
        image: logos.go,
    },
    {
        name: 'PHP',        
        title: 'PHP',
        image: logos.php,     
    },
    {
        name: 'Java',        
        title: 'Java',
        image: logos.java,     
    },
    {
        name: 'C#',        
        title: 'C#',
        image: logos.c_sharp,
    },
    {
        name: 'Ruby',        
        title: 'Ruby',
        image: logos.ruby,
    },
    {
        name: 'Kotlin',        
        title: 'Kotlin',
        image: logos.kotlin,
    },
];

export function ProgrammingLanguagesForm ({ formData, setFormData }: Props) {

    const { classes } = useStyles();

        
    const { data, isFetching } = useQueryGetAllProgrammingLanguages();
        

    function handleFormChange(change: IProgrammingLanguage, checked: boolean) { 

        //console.log({change, checked})
            

        let updated: IProgrammingLanguage[] = [];
        if (formData && !checked) {
            updated = formData.filter ( data => data.name !== change.name );
            //updated = updated.length > 0 ? updated : null
        }
        else if (checked) {

            //console.log(formData)

            let exists;

            if (formData) exists = formData.find( item => item.name === change.name );            

            if (formData && !exists) updated = [...formData, change];
            
            else updated = [ change ]            
        }

        console.log(updated)

        setFormData(updated);
    }
    
    
    const items = data?.map((dataItem) => {
        const uiItem = programmingLanguageUIItems.find( uiItem => uiItem.name === dataItem.name );
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
                cols={5}
                
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