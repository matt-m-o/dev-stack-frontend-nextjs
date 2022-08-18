import { UnstyledButton, Image, Text, Checkbox, SimpleGrid, createStyles } from "@mantine/core";
import { useUncontrolled } from '@mantine/hooks';

import useStyles from '../../styles/ImageCheckbox.styles'

interface ImageCheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?(checked: boolean): void;
    title: string;
    description: string;
    image: string;
    data?: any;
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
    ...others
  }: ImageCheckboxProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof ImageCheckboxProps>) {
    const [value, handleChange] = useUncontrolled({
      value: checked,
      defaultValue: defaultChecked,
      finalValue: false,
      onChange: () =>{ onChange ? onChange(data, !value) : null },
    });
  
    const { classes, cx } = useStyles({ checked: value });
  
    return (
      <UnstyledButton
        {...others}
        onClick={() => handleChange(!value)}
        className={cx(classes.button, className)}
      >
        <Image src={image} alt={title} width={40} />        
  
        <div className={classes.body}>
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mb={3}>
                {title}
            </Text>
            <Text color="dimmed" size="xs" sx={{ lineHeight: 1 }} mb={0}>
                {description}
            </Text>          
        </div>
  
        <Checkbox
          checked={value}
          onChange={() => {}}
          tabIndex={-1}
          styles={{ input: { cursor: 'pointer' } }}
          hidden
        />
      </UnstyledButton>
    );
  }