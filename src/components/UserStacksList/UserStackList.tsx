import { Grid, Center, Loader, Text, SimpleGrid, Button } from "@mantine/core";

import { queryGetUserStacks } from "../../services/queries/queries";

import { StackItem } from "../StackItem/StackItem";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { createStyles } from '@mantine/core';
import { StackModal } from "../StackModal/StackModal";
import { IStack } from "../../types";

const useStyles = createStyles((theme) => ({

  title: {
    fontSize: '1.25rem',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1vh'
  },

}));


export function UserStackList () {

    const { classes } = useStyles();

    const [ modalOpened, setModalOpened ] = useState(false);
    const [ modalData, setModalData ] = useState < IStack | null > (null);

    const { user } = useContext(AuthContext);
        
    const { data, isFetching } = user ? queryGetUserStacks({ id: user?.id }) : { data: [], isFetching: false };

    //console.log(data);

    function openModal(data: IStack) {
        setModalData(data);
        setModalOpened(true);
    }
    
    const items = data?.map( dataItem => {        
        return (
            <StackItem
                key={ dataItem.id }
                data= { dataItem }
                onClick={ openModal }
            />
        );
    });    

    
    return (
        <Center style={{ padding: 50 }}>
            <Grid columns={1} justify="center">                
                
                <Grid.Col span={1} style={{width: 'max-content'}}>
                    <Text className={classes.title} align={'center'}>
                        Your Stacks
                    </Text>
                </Grid.Col>

                { !items &&
                    <Center>
                        <Loader/>
                    </Center>
                }
                { items && !isFetching &&
                    <SimpleGrid 
                        cols={2}
                        breakpoints={[                            
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