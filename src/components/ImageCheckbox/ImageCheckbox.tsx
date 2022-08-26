import { UnstyledButton, Image, Text, Checkbox, SimpleGrid, createStyles } from "@mantine/core";
import { useUncontrolled } from '@mantine/hooks';

import useStyles from '../../styles/ImageCheckbox.styles'

interface ImageCheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?(data: any, checked: boolean): void;
    title: string;
    description?: string;
    image: string;
    data?: any;
    disabled: boolean;
}

export function ImageCheckbox({
    checked,
    defaultChecked,
    onChange,
    title,
    description,
    className,
    image,
    data,
    disabled,
    ...others
  }: ImageCheckboxProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof ImageCheckboxProps>) {
    const [value, handleChange] = useUncontrolled({
      value: checked,
      defaultValue: defaultChecked,
      finalValue: false,
      onChange: () =>{ onChange ? onChange(data, !value) : null },
    });  
  
    const { classes, cx } = useStyles({ checked: value, disabled: disabled });    
  
    return (
      <UnstyledButton
        {...others}
        onClick={() => handleChange(!value)}
        className={cx(classes.button, className)}
      > 
        <div style={{display: 'grid', placeItems: 'center', minHeight: 40}}>
          <Image src={image} alt={title} width={40} />        
        </div>        
  
        <div className={classes.body}>
            <Text className={classes.title} sx={{ lineHeight: 1.5 }} mb={0}>
                {title}
            </Text>
            <Text color="dimmed" size="xs" sx={{ lineHeight: 1.5 }} mb={0}>
                {description}
            </Text>          
        </div>
  
        <Checkbox
          checked={false}
          onChange={() => {}}
          tabIndex={-1}
          styles={{ input: { cursor: 'pointer' } }}
          hidden
        />
      </UnstyledButton>
    );
  }