import { Text, Header, Container, Group, Avatar, Menu, UnstyledButton } from "@mantine/core";

import useStyles from '../../styles/SimpleHeader.styles';

import Link from "next/link";
import { useRouter } from "next/router";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { IconChevronDown, IconLogout } from "@tabler/icons";

export function SimpleHeader() {
  
    const { classes, cx } = useStyles();

    const { user, signOut } = useContext(AuthContext);

    const [ accountMenuOpened, setAccountMenuOpened ] = useState(false);

    const accountMenu = (
      <Menu
        offset={0}
        /* size={200} */
        placement="end"
        transition="pop-top-right"
        className={classes.accountMenu}
        opened={accountMenuOpened}
        onChange={setAccountMenuOpened}
      >
        <Menu.Target>
          <UnstyledButton
            className={cx(classes.user, { [classes.userActive]: accountMenuOpened })}
          >
            <Group spacing={7}>
              <Avatar alt={user?.first_name} radius="xl" size={20} />
              <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                { user ? user?.first_name : 'Conta' }
              </Text>
              <IconChevronDown size={12} />
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            icon={<IconLogout size={14} />}
            onClick= { () => signOut() }
          > 
            Sign out 
          </Menu.Item>
        </Menu.Dropdown>        
      </Menu>
    )
        

    return (      
      <Header height={60} mb={20} className={classes.root}>
        <Container className={classes.header}>

          <Link href={'/'}>
            <a className={classes.headerTitleAnchor}>
              <Text className={classes.headerTitle}>
                Tech stack survey
              </Text>
            </a>
          </Link>
          
          <Group align={"center"} spacing={60} noWrap>

            { user &&
              accountMenu
            }

            <ColorSchemeToggle/>

          </Group>          
        </Container>
      </Header>      
    );
  }