// @flow

export const styleSheet = (theme: Object) => ({
  root: {
    width: '100%',
    height: '100%'
  },
  content: {
    margin: '30px auto 20px auto',
    height: '100%',
    [theme.breakpoints.up('sm')]: { maxWidth: theme.breakpoints.width('sm') },
    [theme.breakpoints.up('lg')]: { maxWidth: theme.breakpoints.width('lg') }
  }
})
