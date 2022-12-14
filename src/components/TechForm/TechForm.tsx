import { SimpleGrid, Center, Loader, Text, Divider } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

import useStyles  from '../../styles/Form.styles';
import { IProgrammingLanguage } from "../../types";
import { ImageCheckbox } from "../ImageCheckbox/ImageCheckbox";

import { queryGetAllProgrammingLanguages } from "../../services/queries/queries";

import logos from '../../images/programming_languages_logos'
import { IconTemperatureMinus } from "@tabler/icons";

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

export function TechForm ({ formData, setFormData }: Props) {

    const { classes } = useStyles();

        
    const { data, isFetching } = queryGetAllProgrammingLanguages();
        

    function handleFormChange(change: IProgrammingLanguage, checked: boolean) { 

        //console.log({change, checked})
            

        let updated: IProgrammingLanguage[] = [];

        if (!checked) {
            updated = formData.filter( data => data.name !== change.name );            
        }
        else if (checked) {

            //console.log(formData)
            
            const exists = formData.some( item => item.name === change.name );

            if (!exists) updated = [...formData, change];
        }

        //console.log(updated)

        setFormData(updated);
    }
    
    
    const items = data?.map((dataItem) => {
        const uiItem = programmingLanguageUIItems.find( uiItem => uiItem.name === dataItem.name );
        if (!uiItem) return;

        //console.log(dataItem);

        const selected = formData.some( item => item.name === uiItem.name );

        return (
            <ImageCheckbox 
                {...uiItem} 
                key={uiItem.title} 
                onChange= {handleFormChange}
                data= { dataItem }
                checked={ selected }
                disabled={ false }
            />
        )
    });


    return (        
        <Center>
            <SimpleGrid cols={1}>
                <div>
                    <Text className={classes.title}>
                        Programming languages
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
                        cols={5}
                        breakpoints={[                        
                            { maxWidth: 'md', cols: 3 },
                            { maxWidth: 'sm', cols: 2 },                        
                        ]}
                    >
                        {items}
                    </SimpleGrid>
                }

                <div>
                    <Text className={classes.title} mt={65}>
                        Frameworks
                    </Text>
                    <Divider my="xs"/>
                </div>                
                
                <div>
                    <Text className={classes.title} mt={65}>
                        Libraries
                    </Text>
                    <Divider my="xs"/>
                </div>

            </SimpleGrid>            
        </Center>
    )
}