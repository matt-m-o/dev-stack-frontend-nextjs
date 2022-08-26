import { Grid, Group, TextInput, Text } from "@mantine/core";
import { useForm } from '@mantine/form'
import { Dispatch, SetStateAction, useState } from "react";

import useStyles  from '../../styles/Form.styles';
import { IUser } from "../../types";

type UserFormData = {    
    first_name: string;
    last_name: string;
    email: string;    
}

interface Props {
    formData: UserFormData | null
    setFormData: Dispatch<SetStateAction< IUser | null >>;
}

export function UserPersonalDetailsForm ({ formData, setFormData }: Props) {

    const { classes } = useStyles();


    const inputsInitialValues: UserFormData = {
        first_name: formData ? formData.first_name : '',
        last_name: formData ? formData.last_name : '',
        email: formData ? formData.email : '',
    }

    const [ formInputs, setFormInputs ] = useState <UserFormData> (inputsInitialValues);


    function validateForm (data: IUser) {
        // simple validation        
        return (
            data?.first_name?.length > 0 &&
            data?.last_name?.length > 0 &&
            data?.email?.length > 0
        )        
    }
    
    let _formInputValues
    function handleFormChange(change: Partial<UserFormData>) {
        const _formInputValues = { 
            ...formInputs,
            ...change
        };

        if (!_formInputValues) return;

        setFormInputs(_formInputValues as UserFormData);

        validateForm(_formInputValues) ? 
            setFormData(_formInputValues) : setFormData(null);

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
                            />                            

                        </Grid.Col>
                        
                    </Grid>
                    
                </form>
                
            </Group>
        </>
    )
}