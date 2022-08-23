import { Button, Container, createStyles, Grid, Group, Header, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AllStackList } from "../components/AllStackList/AllStackList";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle/ColorSchemeToggle";
import { UserStackList } from "../components/UserStacksList/UserStackList";
import { AuthContext } from '../contexts/AuthContext';

const useStyles = createStyles( (theme) => ({ 
  root: {
    position: 'sticky',
    zIndex: 1,    
  },

  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',    

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    position: 'sticky',    
    paddingTop: '1vh',
    paddingBottom: '1vh',
  },

  headerTitle: {
    fontSize: '1.5em',
    fontWeight: 700,    
  },

  participateBtn: {
  },

}));

export default function HomePage() {

  const { classes } = useStyles();

  const { user } = useContext(AuthContext);

  console.log(user);
  

  const router = useRouter();
  
  return (
    <>
      <Header height={60} mb={20} className={classes.header}>
        <Container className={classes.header}>

          <Grid align={'center'} columns={4}>

            <Grid.Col span={3} offset={0}>
              <Text className={classes.headerTitle}
              >
                Tech stack survey
              </Text>
            </Grid.Col>

            <Grid.Col span={1} offset={0}>
              <Group>
                <Button radius={'lg'} size={'sm'}
                  onClick={ () => router.push("devStackSurvey")}
                >
                  Participate
                </Button>
              </Group>
            </Grid.Col>
            <ColorSchemeToggle/>
          </Grid>          
        </Container>
      </Header>

      <Group position='center'>
        <Grid gutter={0} justify="space-around" grow>
          
        </Grid>
        <Grid columns={1} gutter={0} justify="space-around" grow>

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
      
    </>
  );
}
