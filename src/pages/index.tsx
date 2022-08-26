import { Button, createStyles, Grid, Group } from "@mantine/core";
import router from "next/router";
import { useContext } from "react";
import { AllStackList } from "../components/AllStackList/AllStackList";
import { UserStackList } from "../components/UserStacksList/UserStackList";
import { AuthContext } from '../contexts/AuthContext';


const useStyles = createStyles((theme) => ({

  takeSurveyBtn: {
    fontSize: '1rem'
  }
  
}));

export default function HomePage() {  

  const { user } = useContext(AuthContext);

  const { classes } = useStyles();
  
  return (    
      <Group position='center'>
        <Grid columns={1} gutter={0} justify="space-around" grow>

          <Button className={classes.takeSurveyBtn}
            radius={'lg'} 
            size={'sm'}             
            onClick={ () => router.push("devStackSurvey") }
          >
            Take survey
          </Button>  

          { user &&
            <Grid.Col>
              <UserStackList></UserStackList>
            </Grid.Col> 
          }
          <Grid.Col>
            <AllStackList></AllStackList>
          </Grid.Col>          
        </Grid>
      </Group>        
  );
}
