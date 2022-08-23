import { Grid, Center, Loader, Text, SimpleGrid, Button } from "@mantine/core";

import { queryGetUserStacks } from "../../services/queries/queries";

import { StackItem } from "../StackItem/StackItem";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({

  title: {
    fontSize: 20,
    textAlign: 'center',    
  },

}));


export function UserStackList () {

    const { classes } = useStyles();

    const { user } = useContext(AuthContext);
        
    const { data, isFetching, refetch } = user ? queryGetUserStacks({ id: user?.id }) : { data: [], isFetching: false };

    //console.log(data);    
    
    const items = data?.map((dataItem) => {        

        //console.log(dataItem);        
        
        return (
            <StackItem                
                key={ dataItem.id }
                data= { dataItem } 
                refetchData= {refetch}               
            />
        );
    });


    const gridItems = items?.map( item => {
        return (
            <Grid.Col span={1}>
                {item}
            </Grid.Col>
        )
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
                    <Grid columns={2}>
                        {gridItems}
                    </Grid>
                }
                
            </Grid>
            
            
        </Center>
    )
}