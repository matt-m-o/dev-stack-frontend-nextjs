import {  Button, Center, Container, createStyles, Group, Paper, Stepper, Title, Text, SimpleGrid, Grid, Loader } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { DevelopmentTypeForm } from "../components/DevelopmentTypeForm/DevelopmentTypeForm";
import { UserPersonalDetailsForm } from "../components/UserPersonalDetailsForm/UserPersonalDetailsForm";
import { IDevelopmentType, IProgrammingLanguage, IStack, IUser } from "../types";

import { TechForm } from "../components/TechForm/TechForm";
import { createUser } from "../services/users";
import { createUserStack, saveStackProgrammingLanguagesChanges, stackAddProgrammingLanguage } from "../services/stacks";
import { setCookie } from "cookies-next";
import { invalidateQuery } from "../services/queries/queries";

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
        gap: 10,
    }
    
}));

export default function DevStackSurvey () {
    const { classes } = useStyles();

    const [active, setActive] = useState(0);

    const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


    const [ userInfo, setUserInfo ] = useState< IUser | null >(null);
    const [ devTypes, setDevTypes ] = useState< IDevelopmentType[] >([]);
    const [ backendLanguages, setBackendLanguages ] = useState< IProgrammingLanguage[] >([]);
    const [ frontLanguages, setFrontLanguages ] = useState< IProgrammingLanguage[] >([]);
    
    const [ formSubmitted, setFormSubmitted ] = useState(false);

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

    function setUserIDCookie (id: string) {
        // Temporary solution before implementing login
        setCookie('token', id);
    }

    async function handleSubmit () {
        if (userInfo && devTypes.length > 0 && ( backendLanguages.length > 0 || frontLanguages.length > 0 )) {
            const user = await createUser(userInfo);
            console.log(user);
            setUserIDCookie(user.id);

            for (const devType of devTypes) {                

                const stack = await createUserStack({
                    id_user: user.id,
                    id_development_type: devType.id,
                });

                console.log(stack);

                if (devType.name === 'Backend')
                    saveStackProgrammingLanguagesChanges(stack, backendLanguages);
                
                if (devType.name === 'Frontend')
                    saveStackProgrammingLanguagesChanges(stack, frontLanguages);
            }            

            setTimeout( () => {
                console.log("Redirecting...");                
                
                window.location.pathname = '/'; // redirecting and forcing reload
            }, 3000)
        }
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
                                    formData={userInfo}
                                    setFormData={setUserInfo}
                                />                                
                            </div>                            
                            {nextButton(userInfo)}                            
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
                                    <TechForm
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
                                    <TechForm
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