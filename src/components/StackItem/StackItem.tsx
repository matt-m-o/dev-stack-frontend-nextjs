import { UnstyledButton, Image, Text, Checkbox, SimpleGrid, createStyles } from "@mantine/core";
import { useUncontrolled } from '@mantine/hooks';

import useStyles from '../../styles/StackItem.styles';
import images from '../../images/development_types';
import { StackModal } from "../StackModal/StackModal";
import { useState } from "react";



const stackUIItems = [
  {
    name: 'Backend',
    title: 'Backend',
    developmentTypeName: 'Backend',
    image: images.backend,
  },
  {
    name: 'Frontend',
    title: 'Frontend',
    developmentTypeName: 'Frontend',
    image: images.frontend,
  },
];



interface StackItemProps {
    title?: string;
    description?: string;
    data: any;
    onClick: (data: any) => void;
}

export function StackItem({        
    onChange,
    onClick,
    title,
    description,
    className,
    data,
    ...others
  }: StackItemProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof StackItemProps>) {
  
    const { classes, cx } = useStyles();     

    const uiItem = stackUIItems.find( uiItem => uiItem.developmentTypeName === data?.development_type?.name );

    title = title ? title : uiItem?.title;


    // Show icons instead of names for tech items
    if (!description) {
      description = data.programming_languages.map( item => {
        return item.name;
      }).join(', ') + '.';
    }
  
    return (      
        <>
          <UnstyledButton
            {...others}
            onClick={ () => { onClick(data) } }
            className={cx(classes.button, className)}
          >
            <div style={{display: 'grid', placeItems: 'center', minHeight: 40}}>
              <Image src={uiItem?.image} alt={title} width={40} />
            </div>
      
            <div className={classes.body}>
                <Text weight={500} size="sm" sx={{ lineHeight: 1.5 }} mb={0}>
                    {title}
                </Text>
                <Text color="dimmed" size="xs" sx={{ lineHeight: 1.5 }} mb={0}>
                    {description}
                </Text>
            </div>
          </UnstyledButton>
        </>
      
    );
  }