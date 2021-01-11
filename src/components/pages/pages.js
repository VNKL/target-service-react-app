import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import AdsPage from "./ads-page";
import AutomatesPage from "./automates-page";
import CabinetsPage from "./cabinets-page";
import CampaignsPage from "./campaigns-page";
import DashboardPage from "./dashboard-page";
import NewAutomatePage from "./new-automate-page";
import NewCampaignPage from "./new-campaign-page";
import ProfilePage from "./profile-page";
import RetargetsPage from "./retargets-page";
import VkAccountPage from "./vk-account-page";


const Pages = () => {

    return (
        <Switch>

            <Route path='/' component={DashboardPage} exact/>
            <Route path='/ads/:id?' render={({match}) => {
                const {id} = match.params
                return <AdsPage campaignVkId={id} />
            }}/>
            <Route path='/automates' component={AutomatesPage} />
            <Route path='/cabinets' component={CabinetsPage} />
            <Route path='/campaigns' component={CampaignsPage} />
            <Route path='/dashboard' component={DashboardPage} />
            <Route path='/new_automate' component={NewAutomatePage} />
            <Route path='/new_campaign' component={NewCampaignPage} />
            <Route path='/user_profile' component={ProfilePage} />
            <Route path='/retarget' component={RetargetsPage} />
            <Route path='/vk_account' component={VkAccountPage} />

            <Redirect to='/' />

        </Switch>
    )
}


export default Pages