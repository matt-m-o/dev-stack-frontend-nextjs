import { Button, Center, Container, createStyles, Group, Paper, Stepper, Title, Text, Loader } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { DevelopmentTypeForm } from "../components/DevelopmentTypeForm/DevelopmentTypeForm";
import { IDevelopmentType, IProgrammingLanguage, IStack, IUser } from "../types";

import { TechForm } from "../components/TechForm/TechForm";
import { saveStackProgrammingLanguagesChanges, updateUserStack } from "../services/stacks";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { invalidateQuery, queryGetUserStacks } from "../services/queries/queries";

const useStyles = createStyles( (theme) => ({

    mainPaper: {
      maxWidth: 1280,
      width:'100%',
      placeItems: 'center',
    },

    title: {
        textAlign: 'center',
        paddingBottom: '5vh',
    },

    stepFormDiv: {
        paddingTop: '5vh',
        paddingBottom: '5vh',
    },

    stepButtonsDiv: {
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
    }
    
}));



export default function EditDevStackSurvey () {
    const router = useRouter();


    const { id_stack } = router.query;    

    const { user } = useContext(AuthContext);
        
    const { data, isFetching } = user ? queryGetUserStacks({ id: user?.id }) : { data: [], isFetching: false };

    const { classes } = useStyles();

    const [active, setActive] = useState(0);

    const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    
    const [ currentStack, setCurrentStack ] = useState< IStack | null >(null);

    const [ devTypes, setDevTypes ] = useState< IDevelopmentType[] >([]);
    const [ programmingLanguages, setProgrammingLanguages ] = useState< IProgrammingLanguage[] >([]);    

    const [ formSubmitted, setFormSubmitted ] = useState(false);
    

    useEffect( () => {        
        const _stack = data?.find( stack => stack.id === id_stack );

        if (_stack != null) setCurrentStack(_stack)
        else return;

        if (_stack?.development_type) {
            setDevTypes([_stack.development_type]);            
        }
        
        if (_stack?.programming_languages) {
            setProgrammingLanguages([..._stack.programming_languages]);
        }
        

    }, []);
       
    
    const nextButton = (formData: any) => (
        <Group position="center" mt="xl">
            <Button
                size='sm'
                onClick={nextStep}
                disabled= { !formData ? true : false }
            >
                Next
            </Button>
        </Group>
    )

    const backButton = (
        <Group position="center" mt="xl">
            <Button
                variant="default"
                size='sm'
                onClick={prevStep}
            >
                Back
            </Button>
        </Group>
    )
  

    async function handleSubmit () {

        if ( currentStack && devTypes.length > 0 && programmingLanguages.length > 0 ) {
            console.log('yes')

            for (const devType of devTypes) {                

                await updateUserStack({
                    id_stack: currentStack.id,
                    id_user: currentStack.id_user,
                    id_development_type: devType.id,
                });                
                
                await saveStackProgrammingLanguagesChanges(currentStack, programmingLanguages);
            }
        }
        
        console.log("Redirecting...");

        setFormSubmitted(true);
        
        setTimeout( () => {
            invalidateQuery('userStacks');
            invalidateQuery('stacks');
            router.push('/');

            //window.location.pathname = '/'; // redirecting and forcing reload
        }, 1000);        
    }


    function Completed() {
        handleSubmit();
        console.log("Completed")

        return (
            <div>
                { !formSubmitted &&
                    <Center>
                        <Loader/>
                    </Center>
                }
                { formSubmitted &&
                    <Center>
                        <Text>Completed</Text>
                    </Center>
                }
            </div>            
        )
    }

    return (
        <>
            <Container>
                <Paper className={classes.mainPaper}  p='xl'>                    

                    <Title className={classes.title}
                        order={2}
                        /* align='center' */
                    >
                        Update your stack
                    </Title>

                    <Stepper active={active} breakpoint="sm">

                        <Stepper.Step label= 'Dev type' description=''>
                            <div className={classes.stepFormDiv}>
                                <DevelopmentTypeForm
                                    formData={devTypes}
                                    setFormData={setDevTypes}
                                    selectOnlyOne={true}
                                    lockSelection={ data && data?.length > 1 ? true : false }
                                />
                            </div>
                            
                            <div className={classes.stepButtonsDiv}>                                
                                {nextButton(devTypes.length > 0 ? devTypes : null)}
                            </div>
                            
                        </Stepper.Step>

                        { devTypes.length === 0 &&
                            <Stepper.Step label= 'Tech' description=''/>
                        } 
                        
                        { devTypes.length > 0 &&
                            <Stepper.Step
                                label= { devTypes?.[0].name + ' tech' }
                                description=''
                            >
                                <div className={classes.stepFormDiv}>
                                    <TechForm
                                        formData={programmingLanguages}
                                        setFormData={setProgrammingLanguages}
                                    />
                                </div>
                                <div className={classes.stepButtonsDiv}>
                                    {backButton}
                                    {nextButton(programmingLanguages.length > 0 ? programmingLanguages : null)}
                                </div>
                            </Stepper.Step>
                        }                        

                        <Stepper.Completed>
                            <Center>
                                <Completed/>
                            </Center>
                        </Stepper.Completed>                                            

                    </Stepper>                     
                    
                </Paper>
            </Container>            
        </>
    );
}