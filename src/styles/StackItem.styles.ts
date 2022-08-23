import { createStyles } from "@mantine/core";

 export default createStyles((theme) => ({
    button: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      minWidth: '199px',      
      transition: 'background-color 150ms ease, border-color 150ms ease',    
      borderRadius: theme.radius.sm,
      padding: theme.spacing.sm,

      border: `1px solid ${        
          theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[3]
      }`,

      backgroundColor:        
          theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.white,

      '&:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background
      }, 
    },
  
    body: {
      flex: 1,
      marginLeft: theme.spacing.md,
    },
}));