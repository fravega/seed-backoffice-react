// @flow
/* eslint-disable no-undef, no-invalid-this*/
import { connect, type MapStateToProps } from 'react-redux'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import React, { Component } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import {
  type Session,
  storeSession
} from '../../data/session'
import AppBar from 'material-ui/AppBar'
import compose from 'recompose/compose'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import FaceIcon from 'material-ui-icons/Face'
import IconButton from 'material-ui/IconButton'
import jwtDecode from 'jwt-decode'
import ListIcon from 'material-ui-icons/List'
import MenuIcon from 'material-ui-icons/Menu'
import { push } from 'react-router-redux'
import ShowChartIcon from 'material-ui-icons/ShowChart'
import { type State as StoreState } from '../../store'
import { styleSheet } from './styles'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { withCookies } from 'react-cookie'
import withRoot from '../../components/withRoot'
import { withStyles } from 'material-ui/styles'

const DefaultRoute = ({ ...params }) => (
  <Route
    { ...params }
    render={ (props: Object) => (<Redirect to={{ pathname: '<default url>', state: { from: props.location } }} />) }
  />
)

const Routing = (<Switch>
  // <Route component={ Page } exact path={ Url } />
  <DefaultRoute />
</Switch>)

type State = {
  open: boolean
}

type Props = {
  classes: Object,
  cookies: { get: (name: string) => string },
  dispatch: (action: any) => void,
  session?: Session
}

class Layout extends Component<Props, State> {
  props: Props
  state: State

  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  componentDidMount() {
    const { dispatch, cookies } = this.props
    const jwtToken = cookies.get('X-FVG-TOKEN') || cookies.get('X-FVG-TOKEN-CORS')
    const session = jwtDecode(jwtToken)

    dispatch(storeSession(session))
  }

  handleOnSelectPage = (url: string) => {
    const { dispatch } = this.props
    dispatch(push(url))
    this.setState({ open: false })
  }

  handleOnOpenDrawer = () => this.setState({ open: true })

  handleOnCloseDrawer = () => this.setState({ open: false })

  render() {
    const { classes, session } = this.props
    const { open } = this.state
    const email = (session && session.email) ? session.email : 'Loading ...'

    const menuListItems = (
      <List>
        <Toolbar>
          <Typography gutterBottom type="title">
            Fravega
          </Typography>
          <Divider absolute />
        </Toolbar>
        <ListItem button onClick={ () => this.handleOnSelectPage(URl) }>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="<Titulo>" />
        </ListItem>
      </List>
    )

    const drawer = (<Drawer
      onClick={ () => '' }
      onRequestClose={ this.handleOnCloseDrawer }
      open={ open }
    >
      { menuListItems }
    </Drawer>)

    return (
      <div className={ classes.root } >
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" onClick={ this.handleOnOpenDrawer }>
              <MenuIcon />
            </IconButton>
            <Typography color="inherit" type="title">
              { email }
            </Typography>

          </Toolbar>
        </AppBar>
        { drawer }
        <div className={ classes.content }>
          { Routing }
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<StoreState, Props, Object> = state =>
  ({ session: state.get('session') })

export default compose(
  withRoot,
  withCookies,
  withRouter,
  withStyles(styleSheet),
  connect(mapStateToProps)
)(Layout)
