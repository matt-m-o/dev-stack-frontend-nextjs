import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({

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
