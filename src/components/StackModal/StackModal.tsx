import { Image, Text, SimpleGrid, Modal, Center, Divider, Group, Button, Loader } from "@mantine/core";

import useStyles from '../../styles/Modal.styles';
import images from '../../images/development_types';
import logos from '../../images/programming_languages_logos';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { IconEdit, IconTrash } from "@tabler/icons";
import { deleteUserStack } from "../../services/stacks";
import { invalidateQuery } from "../../services/queries/queries";
import { useRouter } from "next/router";


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
  title?: string;
  description?: string;
  data: any;
  opened: boolean;
  onClose: () => void;
  openStateSetter?: (state: boolean) => void;
}

export function StackModal({ title, data, openStateSetter, onClose, opened }: StackModalProps ) {

  const { classes } = useStyles();

  const { user } = useContext(AuthContext);

  const router = useRouter();

  const [ deleting, setDeleting ] = useState(false);

  const editStack = () => {
    router.push({
      pathname: 'editDevStackSurvey',
      query: {
        id_stack: data?.id,
      }
    })
  }

  const deleteStack = async () => {
    const confirmed = confirm("Are you sure you want to delete?");

    if (confirmed && user) {
      setDeleting(true);
      await deleteUserStack({ id_user: user.id, id_stack: data.id });        
      setDeleting(false);
    }    
    else return;

    await invalidateQuery('userStacks');
    await invalidateQuery('stacks');
    openStateSetter ? openStateSetter(false) : null;
  }

  const devTypeUIItem = developmentTypeUIItems.find( uiItem => uiItem.developmentTypeName === data?.development_type?.name );

  //console.log(data);

  title = title ? title : data.development_type.name + ' tech stack';
  const description = devTypeUIItem?.description;


  const programmingLanguagesUIItems = data.programming_languages.map( language => {
    const uiItem = programmingLanguageUIItems.find( uiItem => uiItem.name === language.name );
    if (!uiItem) return;

    //console.log(dataItem);

    return (
      <div className={classes.programmingLanguageLogoContainer} key={uiItem.name}>
        <Image src={uiItem.image} width={50} />        
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
        <SimpleGrid cols={1} style={{ width: '100%' }}>

            <div>
              <Text size={'lg'} weight={600} mb={0}>
                  Programming languages
              </Text>
              <Divider my="xs"/>
            </div>            
                        
            <SimpleGrid cols={5}>
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
                <Button leftIcon={<IconEdit/>}
                  onClick={ editStack }
                >
                  Edit
                </Button>

                <Button 
                  color={'red'} 
                  leftIcon={ deleting ? <Loader size={'xs'}/> : <IconTrash/> }
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