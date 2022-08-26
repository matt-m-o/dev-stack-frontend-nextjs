import { Grid, Group, TextInput, Text } from "@mantine/core";
import { useForm } from '@mantine/form'
import { Dispatch, SetStateAction, useState } from "react";

import useStyles  from '../../styles/Form.styles';
import { IUser } from "../../types";

import { UserInfoFormSchema } from './formSchema'

type UserFormData = {    
    first_name: string;
    last_name: string;
    email: string;    
}

interface Props {
    formData: UserFormData | null
    setFormData: Dispatch<SetStateAction< IUser | null >>;
}

export function UserInfoForm ({ formData, setFormData }: Props) {

    const { classes } = useStyles();


    const inputsInitialValues: UserFormData = {
        first_name: formData ? formData.first_name : '',
        last_name: formData ? formData.last_name : '',
        email: formData ? formData.email : '',
    }

    const [ formInputs, setFormInputs ] = useState <UserFormData> (inputsInitialValues);

    // not using built-in 'validate' property due to issue in chromium browsers
    const form = useForm({ initialValues: inputsInitialValues });    


    function validateForm (data: Partial<UserFormData>) {
        const validationResult = UserInfoFormSchema.validate(data);

        console.log(validationResult);        

        const errors = validationResult?.error?.details?.[0];        

        return {
            valid: !errors,
            errors,
        };
    }
    
    
    function handleFormChange(change: Partial<UserFormData>) {
        const _formInputValues = { 
            ...formInputs,
            ...change
        };

        if (!_formInputValues) return;

        setFormInputs(_formInputValues as UserFormData);

        const { valid, errors } = validateForm(_formInputValues);

        valid ?  setFormData(_formInputValues) : setFormData(null);        
        

        const errorFieldName = errors?.path[0].toString();
        const errorMessage = errors?.message;

        for (const key in _formInputValues) {
            if (errorFieldName === key) 
                form.setFieldError(key, errorMessage?.split('is ')[1] || errorMessage );
            else
                form.clearFieldError(key);
        }

        //console.log(formData);
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
                                value={formData?.first_name}
                                //{...form.getInputProps('first_name')}
                                onInputCapture = { ({target}) => handleFormChange({ first_name: target?.value }) }
                                required

                                error={form.getInputProps('first_name').error}
                            />
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <TextInput            
                                label= {
                                    <span className={classes.inputLabel}>Last Name</span> 
                                }
                                size='sm'
                                value={formData?.last_name}
                                //{...form.getInputProps('last_name')}

                                onInputCapture = { ({target}) => handleFormChange({ last_name: target?.value }) }
                                required

                                error={form.getInputProps('last_name').error}
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
                                value={formData?.email}
                                //{...form.getInputProps('email')}

                                onInputCapture = { ({target}) => handleFormChange({ email: target?.value }) }
                                required

                                error={form.getInputProps('email').error}
                            />                            

                        </Grid.Col>
                        
                    </Grid>
                    
                </form>
                
            </Group>
        </>
    )
}