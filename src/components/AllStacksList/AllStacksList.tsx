import { SimpleGrid, Center, Loader, Text } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

import useStyles  from '../../styles/Form.styles';
import { IProgrammingLanguage } from "../../types";
import { ImageCheckbox } from "../ImageCheckbox/ImageCheckbox";

import { queryGetAllProgrammingLanguages, queryGetAllStacks } from "../../services/queries/queries";

import images from '../../images/development_types'


const stackUIItems = [
    { 
        name: 'Backend',        
        title: 'Backend',
        image: images.backend,
        //checked: false,
    },
    {
        name: 'Frontend',        
        title: 'Frontend',
        image: images.frontend,
        //checked: false,
    },
];
export function AllStacksList () {

    const { classes } = useStyles();

        
    const { data, isFetching } = queryGetAllStacks();

    //console.log(data);
    
    
    const items = data?.map((dataItem) => {
        const uiItem = stackUIItems.find( uiItem => uiItem.name === dataItem?.development_type?.name );
        if (!uiItem) return;

        //console.log(dataItem);        

        return (
            <ImageCheckbox 
                {...uiItem}
                description= { (dataItem.programming_languages.map( item => {
                    return item.name;                    
                })).join('; ')}
                key={dataItem.id} 
                //onChange= {handleFormChange}
                data= { dataItem }
                //checked={ selected }
            />
        )
    });

    
    return (        
        <Center style={{ padding: 50 }}>
            <SimpleGrid cols={1}>
                <Text className={classes.title}>
                    Stacks
                </Text>

                { !items &&
                    <Center>
                        <Loader/>
                    </Center>
                }
                { items && !isFetching &&
                    <SimpleGrid
                        cols={6}
                        breakpoints={[                        
                            { maxWidth: 'lg', cols: 6 },
                            { maxWidth: 'md', cols: 4 },
                            { maxWidth: 'sm', cols: 2 },
                            { maxWidth: 'xs', cols: 1 },
                        ]}
                    >
                        {items}
                    </SimpleGrid>
                }                
            </SimpleGrid>            
        </Center>
    )
}