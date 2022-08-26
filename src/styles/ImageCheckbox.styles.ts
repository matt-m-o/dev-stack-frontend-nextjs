import { createStyles } from "@mantine/core";

 export default createStyles((theme, { checked, disabled }: { checked: boolean, disabled: boolean }) => ({
    button: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      transition: 'background-color 150ms ease, border-color 150ms ease',
      border: `1px solid ${
        checked
          ? theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).border
          : theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[3]
      }`,
      borderRadius: theme.radius.sm,
      padding: theme.spacing.sm,
      backgroundColor: checked
        ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background
        : theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.white,
      filter: disabled
        ? 'saturate(0)'
        : 'unset',
    },
  
    body: {
      flex: 1,
      marginLeft: theme.spacing.md,
    },

    title: {
      fontWeight: 500,
      fontSize: '1rem'
    }
}));