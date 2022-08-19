import { Grid, Group, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form'
import { Dispatch, SetStateAction } from "react";

import useStyles  from '../../styles/Form.styles';
import { IUserPersonalInfo } from "../../types";


type Props = {
    formData: IUserPersonalInfo | null
    setFormData: Dispatch<SetStateAction< IUserPersonalInfo | null >>
}

export function UserPersonalDetailsForm ({ formData, setFormData }: Props) {

    const { classes } = useStyles();

    const form = useForm({
        initialValues: {
            first_name: formData ? formData.first_name : '',
            last_name: formData ? formData.last_name : '',
            email: formData ? formData.email : '',
        },
    });

    function validateForm (formData: IUserPersonalInfo) {        
        return true;
    }

    function handleFormChange(change: Partial<IUserPersonalInfo>) { 
        const updated = { 
            ...(formData ? formData : form.values),
            ...change 
        };

        if (validateForm(updated)) setFormData(updated);
    }

    return (
        <>            
            <Group position="center">
                <form>
                    <Grid columns={10} align='center'>
                        <Grid.Col span={4}>
                            <TextInput
                                label= {
                                    <span className={classes.inputLabel}>First Name</span> 
                                }
                                size='sm'
                                {...form.getInputProps('first_name')}
                                onInputCapture = { ({target}) => handleFormChange({ first_name: target?.value }) }
                                required
                            />
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <TextInput            
                            label= {
                                <span className={classes.inputLabel}>Last Name</span> 
                            }
                            size='sm'
                            {...form.getInputProps('last_name')}

                            onInputCapture = { ({target}) => handleFormChange({ last_name: target?.value }) }
                            required                  
                            />
                        </Grid.Col>

                        <Grid.Col span={10}>
                            <TextInput
                            id='email'                
                            label= {
                                <span className={classes.inputLabel}>Email</span>
                            }
                            size='sm'
                            type='email'                  
                            {...form.getInputProps('email')}

                            onInputCapture = { ({target}) => handleFormChange({ email: target?.value }) }
                            required                  
                            />                            

                        </Grid.Col>
                        
                    </Grid>
                    
                </form>
                
            </Group>
        </>
    )
}