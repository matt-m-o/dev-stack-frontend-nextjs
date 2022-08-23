import { Grid, Center, Loader, Text, SimpleGrid } from "@mantine/core";

import useStyles  from '../../styles/Form.styles';

import { queryGetAllStacks } from "../../services/queries/queries";

import { StackItem } from "../StackItem/StackItem";



export function AllStackList () {

    const { classes } = useStyles();

        
    const { data, isFetching } = queryGetAllStacks();

    //console.log(data);
    
    
    const items = data?.map((dataItem) => {        

        //console.log(dataItem);        
        
        return (
            <StackItem                
                key={dataItem.id} 
                //onChange= {handleFormChange}
                data= { dataItem }
                //checked={ selected }
            />
        );
    });

    
    return (        
        <Center style={{ padding: 50 }}>
            <Grid columns={1} justify="center">
                
                <Grid.Col span={1}>
                    <Text className={classes.title}>
                        Stacks
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
            
            
        </Center>
    )
}