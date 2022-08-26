import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({

  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 500,
  },

  inputLabel: {    
    fontSize: "110%",
    fontWeight: 600,
    letterSpacing: 0,

    [theme.fn.smallerThan('md')]: {
      fontSize: '100%',
    },
  },

  inputError: {
    marginLeft: '1em',
  },  

}));
