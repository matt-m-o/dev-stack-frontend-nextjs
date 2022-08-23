import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  title: {    
    fontSize: "155%",
    fontWeight: 600,
    letterSpacing: 0,

    [theme.fn.smallerThan('md')]: {
      fontSize: '150%',
    },
  },

  inputLabel: {    
    fontSize: "115%",
    fontWeight: 600,
    letterSpacing: 0,

    [theme.fn.smallerThan('md')]: {
      fontSize: '100%',
    },
  },

  inputError: {
    marginLeft: '1em',
  },

  otherText: {
    fontSize: "97%",
    fontWeight: 500,
    letterSpacing: 0.4,

    [theme.fn.smallerThan('md')]: {
      fontSize: '90%',
    },
  }
}));
