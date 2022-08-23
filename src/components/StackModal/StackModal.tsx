import { UnstyledButton, Image, Text, Checkbox, SimpleGrid, createStyles, Modal, Center, Divider, Group, Button } from "@mantine/core";
import { useUncontrolled } from '@mantine/hooks';

import useStyles from '../../styles/Modal.styles';
import images from '../../images/development_types';
import logos from '../../images/programming_languages_logos';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { IconEdit, IconTrash } from "@tabler/icons";
import { deleteUserStack } from "../../services/stacks";
import { invalidateQuery } from "../../services/queries/queries";


const developmentTypeUIItems = [
  { 
      name: 'Backend',
      description: 'Sever side applications',
      title: 'Backend',
      developmentTypeName: 'Backend',
      image: images.backend,      
  },
  {
      name: 'Frontend',
      description: 'Client side applications',
      title: 'Frontend',
      developmentTypeName: 'Frontend',
      image: images.frontend,      
  },
];


const programmingLanguageUIItems = [
  { 
      name: 'JavaScript',
      title: 'JavaScript',        
      image: logos.javascript,        
  },
  {
      name: 'TypeScript',        
      title: 'TypeScript',
      image: logos.typescript,
  },
  {
      name: 'Python',        
      title: 'Python',
      image: logos.python,        
  },
  {
      name: 'Rust',        
      title: 'Rust',
      image: logos.rust,        
  },
  {
      name: 'GO',
      title: 'GO',
      image: logos.go,
  },
  {
      name: 'PHP',        
      title: 'PHP',
      image: logos.php,     
  },
  {
      name: 'Java',        
      title: 'Java',
      image: logos.java,     
  },
  {
      name: 'C#',        
      title: 'C#',
      image: logos.c_sharp,
  },
  {
      name: 'Ruby',        
      title: 'Ruby',
      image: logos.ruby,
  },
  {
      name: 'Kotlin',        
      title: 'Kotlin',
      image: logos.kotlin,
  },
];



interface StackModalProps {
  opened: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  data: any;
  refetchData: any;
}

export function StackModal({ onClose, opened, title, data, refetchData }: StackModalProps ) {

  const { classes } = useStyles();

  const { user } = useContext(AuthContext);

  const editStack = () => {      
  }

  const deleteStack = async () => {
    const confirmed = confirm("Are you sure you want to delete?");

    if (confirmed && user) deleteUserStack({ id_user: user.id, id_stack: data.id });
    
    await invalidateQuery('userStacks');
    await refetchData();
  }

  const devTypeUIItem = developmentTypeUIItems.find( uiItem => uiItem.developmentTypeName === data?.development_type?.name );

  console.log(data);

  title = title ? title : data.development_type.name + ' tech stack';
  const description = devTypeUIItem?.description;


  // Show icons instead of names for tech items
  const programmingLanguagesUIItems = data.programming_languages.map( language => {
    const uiItem = programmingLanguageUIItems.find( uiItem => uiItem.name === language.name );
    if (!uiItem) return;

    //console.log(dataItem);

    return (
      <div>
        <Image src={uiItem.image}/>
      </div>
    )
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      closeOnClickOutside={false}
      title= { <span className={classes.title}>{title}</span> }
      size="md"
      transition={'pop'}
    >
      <Center>        
        <SimpleGrid cols={1}>

            <div>
              <Text size={'lg'} weight={600} mb={0}>
                  Programming languages
              </Text>
              <Divider my="xs"/>
            </div>            
                        
            <SimpleGrid
                cols={5}
                breakpoints={[                        
                    { maxWidth: 'md', cols: 3 },
                    { maxWidth: 'sm', cols: 2 },                        
                ]}
            >
                {programmingLanguagesUIItems}
            </SimpleGrid>
          
            <div>
              <Text size={'lg'} weight={600} mt={4}>
                  Frameworks
              </Text>
              <Divider my="xs"/>
            </div>            
              
            <div>
              <Text size={'lg'} weight={600}>
                  Libraries                
              </Text>
              <Divider my="xs"/>
            </div>

            { user?.id === data.id_user &&

              <Group position="right" mt={'4vh'}>
                <Button leftIcon={<IconEdit/>}>
                  Edit
                </Button>

                <Button color={'red'} leftIcon={<IconTrash/>}
                  onClick={ deleteStack }
                >
                  Delete
                </Button>
              </Group>

            }
        </SimpleGrid>
      </Center>
    </Modal>
  );
}