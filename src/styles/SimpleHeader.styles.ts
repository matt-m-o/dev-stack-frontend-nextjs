import { createStyles } from "@mantine/core";

 export default createStyles( (theme) => ({ 
  root: {
    position: 'sticky',
    zIndex: 1,    
  },

  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',    

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    position: 'sticky',    
    paddingTop: '1vh',
    paddingBottom: '1vh',
  },

  headerTitleLink: {
    width: 'max-content',
  },

  headerTitle: {
    fontSize: '1.5em',
    fontWeight: 700,
    width: 'max-content',
  },

  headerTitleAnchor: {
    textDecoration: 'none',
    color: 'inherit'
  },
  
  accountMenu: {
    display: 'block',
    lineHeight: 1,
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

}));