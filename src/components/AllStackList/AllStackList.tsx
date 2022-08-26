import { Grid, Center, Loader, Text, SimpleGrid, createStyles } from "@mantine/core";

import { queryGetAllStacks } from "../../services/queries/queries";

import { StackItem } from "../StackItem/StackItem";
import { StackModal } from "../StackModal/StackModal";
import { useState } from "react";
import { IStack } from "../../types";

const useStyles = createStyles((theme) => ({

    title: {
      fontSize: '1.25rem',
      fontWeight: 500,
      textAlign: 'center',
      marginBottom: '1vh'
    },
  
}));

export function AllStackList () {

    const { classes } = useStyles();

    const [ modalOpened, setModalOpened ] = useState(false);
    const [ modalData, setModalData ] = useState < IStack | null > (null);
        
    const { data, isFetching } = queryGetAllStacks();

    //console.log(data);
    
    function openModal(data: IStack) {
        setModalData(data);
        setModalOpened(true);
    }
    
    const items = data?.map((dataItem) => {        

        //console.log(dataItem);        
        
        return (
            <StackItem
                key={dataItem.id}                 
                data= { dataItem }                
                onClick={ openModal }
            />
        );
    });

    
    return (        
        <Center style={{ padding: 50 }}>
            <Grid columns={1} justify="center">
                
                <Grid.Col span={1}>
                    <Text className={classes.title}>
                        All Stacks
                    </Text>
                </Grid.Col>                

                { !items &&
                    <Center>
                        <Loader/>
                    </Center>
                }
                { items && !isFetching &&
                    <SimpleGrid 
                        cols={4}
                        breakpoints={[                        
                            { maxWidth: 'lg', cols: 4 },
                            { maxWidth: 'md', cols: 3 },
                            { maxWidth: 'sm', cols: 2 },
                            { maxWidth: 'xs', cols: 1 },
                        ]}
                    >
                        {items}
                    </SimpleGrid>
                }
                
            </Grid>

            { modalData &&
                <StackModal
                    opened={ modalOpened }
                    onClose={ () => { setModalOpened(false) } }
                    data={ modalData }
                    openStateSetter={ setModalOpened }
                /> 
            }
            
            
        </Center>
    )
}