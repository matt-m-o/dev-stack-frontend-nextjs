import {  Button, Center, Container, createStyles, Group, Paper, Stepper, Title, Text, SimpleGrid, Grid } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { DevelopmentTypeForm } from "../components/DevelopmentTypeForm/DevelopmentTypeForm";
import { UserPersonalDetailsForm } from "../components/UserPersonalDetailsForm/UserPersonalDetailsForm";
import { IDevelopmentType, IProgrammingLanguage, IStack, IUserPersonalInfo } from "../types";

import { useQuery } from "react-query";
import { ProgrammingLanguagesForm } from "../components/ProgrammingLanguagesForm/ProgrammingLanguagesForm";
import { createUser } from "../services/users";
import { createStack, stackAddProgrammingLanguage } from "../services/stacks";

const useStyles = createStyles((theme) => ({

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
        gap: 10
    }
    
}));

export default function CreateStack () {
    const { classes } = useStyles();

    const [active, setActive] = useState(0);

    const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


    const [ personalInfo, setPersonalInfo ] = useState< IUserPersonalInfo | null >(null);
    const [ devTypes, setDevTypes ] = useState< IDevelopmentType[] >([]);
    const [ backendLanguages, setBackendLanguages ] = useState< IProgrammingLanguage[] >([]);
    const [ frontLanguages, setFrontLanguages ] = useState< IProgrammingLanguage[] >([]);
    


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

    function stackAddProgrammingLanguages (
        stack: IStack,
        programmingLanguages: IProgrammingLanguage[],
    ) {
        for (const language of programmingLanguages) {
            stackAddProgrammingLanguage({
                id_user: stack.id_user,
                id_stack: stack.id,
                id_programming_language: language.id,
            });
        }
    }

    async function handleSubmit () {
        if (personalInfo && devTypes.length > 0 && ( backendLanguages.length > 0 || frontLanguages.length > 0 )) {
            const user = await createUser(personalInfo);

            for (const devType of devTypes) {                

                const stack = await createStack({
                    id_user: user.id,
                    id_development_type: devType.id,
                });

                console.log(stack);

                if (devType.name === 'Backend')
                    stackAddProgrammingLanguages(stack, backendLanguages);
                
                if (devType.name === 'Frontend')
                    stackAddProgrammingLanguages(stack, frontLanguages);   
            }
        }
    }


    function Completed() {
        handleSubmit();
        console.log("Completed")

        return <Text>Completed</Text>
    }

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

                    <Stepper active={active} breakpoint="sm">

                        <Stepper.Step
                            label= 'Personal info'
                            description=''
                            allowStepSelect={active > 1}                            
                        >
                            <div className={classes.stepFormDiv}>
                                <UserPersonalDetailsForm
                                    formData={personalInfo}
                                    setFormData={setPersonalInfo}
                                />                                
                            </div>                            
                            {nextButton(personalInfo)}                            
                        </Stepper.Step>

                        <Stepper.Step label= 'Dev type' description=''>
                            <div className={classes.stepFormDiv}>
                                <DevelopmentTypeForm
                                    formData={devTypes}
                                    setFormData={setDevTypes}
                                />
                            </div>
                            
                            <div className={classes.stepButtonsDiv}>
                                {backButton}
                                {nextButton(devTypes.length > 0 ? devTypes : null)}
                            </div>
                            
                        </Stepper.Step>

                        { devTypes.length === 0 &&
                            <Stepper.Step label= 'Tech' description=''/>
                        } 
                        

                        { devTypes?.some( item => item.name === 'Backend') &&                            
                            <Stepper.Step label= 'Backend tech' description=''>
                                <div className={classes.stepFormDiv}>
                                    <ProgrammingLanguagesForm
                                        formData={backendLanguages}
                                        setFormData={setBackendLanguages}
                                    />
                                </div>
                                <div className={classes.stepButtonsDiv}>
                                    {backButton}
                                    {nextButton(backendLanguages.length > 0 ? backendLanguages : null)}
                                </div>
                            </Stepper.Step>
                        }

                        { devTypes?.some( item => item.name === 'Frontend') &&
                            <Stepper.Step label= 'Frontend tech' description=''>
                                <div className={classes.stepFormDiv}>
                                    <ProgrammingLanguagesForm
                                        formData={frontLanguages}
                                        setFormData={setFrontLanguages}
                                    />
                                </div>
                                <div className={classes.stepButtonsDiv}>
                                    {backButton}
                                    {nextButton(frontLanguages.length > 0 ? frontLanguages : null)}
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