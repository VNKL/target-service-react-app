import React, {useState} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Route, Switch, Redirect} from "react-router-dom";

import NavigationPanel from "../navigaton-panel";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import BusinessIcon from '@material-ui/icons/Business';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsPowerIcon from '@material-ui/icons/SettingsPower';
import {MuiThemeProvider} from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Pages from "../pages";
import LoginPage from "../pages/login-page";
import RegisterPage from "../pages/register-page";
import { ruRU } from '@material-ui/core/locale';


const leftPanelListItems = [
    {text: 'DashboardPage', icon: <DashboardIcon />, link: '/dashboard'},
    {text: 'Автоматизации', icon: <SettingsPowerIcon />, link: '/automates'},
    {text: 'Кампании', icon: <PlaylistAddCheckIcon />, link: '/campaigns'},
    {text: 'Кабинеты', icon: <BusinessIcon />, link: '/cabinets'},
    {text: 'Ретаргет', icon: <FolderSharedIcon />, link: '/retarget'},
]


const user = {
    username: 'vnkl',
    avatarImageUrl: 'https://sun1-29.userapi.com/impf/c637529/v637529837/d5a9/WJ0A0U_BN5Q.jpg?' +
        'size=50x0&quality=96&crop=467,0,284,284&sign=4770c3371bdfa12fbebfd01934027e72&ava=1'
}


const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: blueGrey[900],
        },
        secondary: {
            main: blueGrey[700],
        },
    },
}, ruRU);


const App = () => {

    const isLoggedInCheck = !!localStorage.getItem('token')

    const [isLoggedIn, changeLoggedInStatus] = useState(isLoggedInCheck)

    let data = (
        <Switch>
            <Route path='/login' render={() => <LoginPage changeLoggedInStatus={changeLoggedInStatus}/>}/>
            <Route path='/register' render={() => <RegisterPage changeLoggedInStatus={changeLoggedInStatus}/>}/>
            <Redirect to='/login'/>
        </Switch>
    )

    if (isLoggedIn) {
        data = (
            <NavigationPanel leftPanelListItems={leftPanelListItems} user={user}>
                <Pages/>
            </NavigationPanel>
        )
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Router>
                {data}
            </Router>
        </MuiThemeProvider>
    )
}

export default App