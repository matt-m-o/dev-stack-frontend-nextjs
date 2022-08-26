import { SimpleGrid, Loader, Center, Text, Group, Divider } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

import useStyles  from '../../styles/Form.styles';
import { IDevelopmentType } from "../../types";
import { ImageCheckbox } from "../ImageCheckbox/ImageCheckbox";

import { queryGetAllDevelopmentTypes } from "../../services/queries/queries";

import images from '../../images/development_types'

interface Props {
    formData: IDevelopmentType[];
    setFormData: Dispatch<SetStateAction< IDevelopmentType[] >>;
    selectOnlyOne?: boolean;
    lockSelection?: boolean;
}


const developmentTypeUIItems = [
    { 
        name: 'Backend',
        description: 'Sever side applications',
        title: 'Backend',        
        image: images.backend,
        //checked: false,
    },
    {
        name: 'Frontend',
        description: 'Client side applications',
        title: 'Frontend',
        image: images.frontend,
        //checked: false,
    },
];

export function DevelopmentTypeForm ({ formData, setFormData, selectOnlyOne, lockSelection }: Props) {

    const { classes } = useStyles();

        
    const { data, isFetching } = queryGetAllDevelopmentTypes();    
        

    function handleFormChange(change: IDevelopmentType, checked: boolean) { 

        if (lockSelection) return;
        //console.log({change, checked})

        let updated: IDevelopmentType[] = [];

        if (formData && !checked) {
            updated = formData.filter ( data => data.name !== change.name );
            //updated = updated.length > 0 ? updated : null
        }
        else if (checked) {

            //console.log(formData);

            const exists = formData.some( item => item.name === change.name );

            if (!exists) updated = [...formData, change];
        }

        if (selectOnlyOne) updated = updated.filter( data => data.name === change.name );

        setFormData(updated);
    }
        
    const items = data?.map((dataItem) => {
        const uiItem = developmentTypeUIItems.find( uiItem => uiItem.name === dataItem.name );
        if (!uiItem) return;

        //console.log(dataItem);
        const selected = formData.some( item => item.name === uiItem.name );

        return (
            <ImageCheckbox 
                {...uiItem} 
                key={uiItem.title} 
                onChange={handleFormChange}
                data={ dataItem }
                checked={ selected }
                disabled={ lockSelection && !selected ? true : false }
            />
        )
    });

    return (
        <Center>
            <SimpleGrid cols={1}>                
                <div>
                    <Text className={classes.title}>
                        Types of development
                    </Text>
                    <Divider my="xs"/>
                </div>
                
                { !items &&
                    <Center>
                        <Loader/>
                    </Center>
                }
                { items && !isFetching &&
                    <SimpleGrid
                        cols={2}
                        breakpoints={[
                            { maxWidth: 'md', cols: 2 },
                            { maxWidth: 'sm', cols: 1 },
                        ]}
                    >
                        {items}                        
                    </SimpleGrid>
                }
            </SimpleGrid>            
        </Center>     
    )
}