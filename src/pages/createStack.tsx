import {  Button, Container, createStyles, Group, Paper, Stepper, Title } from "@mantine/core";
import { useState } from "react";
import { UserPersonalDetailsForm } from "../components/UserPersonalDetailsForm/UserPersonalDetailsForm";
import { IUserPersonalInfo } from "../types";


const useStyles = createStyles((theme) => ({

    mainPaper: {
      maxWidth: 1280,
      width:'100%',
      placeItems: 'center'
    },

    title: {
        textAlign: 'center',
        paddingBottom: '1em'
    },

    /* step: {
        display: 'grid',
        placeItems: 'center',

    } */
    
}));

export default function CreateStack () {
    const { classes } = useStyles();

    const [active, setActive] = useState(0);

    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


    const [ personalInfo, setPersonalInfo ] = useState< IUserPersonalInfo | null >(null);
    const [ devType, setDevType ] = useState();
    const [ programmingLanguages, setProgrammingLanguages ] = useState();

    const nextButton = (formData: any) => (
        <Group position="center" mt="xl">                                
            <Button
                size='sm'
                onClick={nextStep}                                    
                disabled= { !formData ? true : false}
            >                                        
                Next
            </Button>
        </Group>
    )

    return (
        <>
            <Container>
                <Paper className={classes.mainPaper}  p='xl'>

                    

                    <Title className={classes.title}
                        order={2} 
                        /* align='center' */                                    
                    >
                        Dev tech stack survey
                    </Title>

                    <Stepper active={active} onStepClick={setActive} breakpoint="sm">

                        <Stepper.Step
                            label= 'Personal info'
                            description=''
                            allowStepSelect={active > 1}
                        >
                            <UserPersonalDetailsForm
                                formData={personalInfo}
                                setFormData={setPersonalInfo}
                            />
                            
                        {nextButton(personalInfo)}
                            
                        </Stepper.Step>

                        <Stepper.Step label= 'Dev type' description=''>
                        </Stepper.Step>                    
                    
                        <Stepper.Step label= 'Programming languages' description=''>
                        </Stepper.Step>


                        <Stepper.Completed>
                            Completed
                        </Stepper.Completed>                                            

                    </Stepper>                     
                    
                </Paper>
            </Container>            
        </>
    );
}