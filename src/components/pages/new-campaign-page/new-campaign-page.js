import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NewCampaignForm from "./new-campaign-form";
import NewCampaignHelpBlock from "./new-campaign-help-block";
import ApiService from "../../../services/api-service";
import NewCampaignFormSkeleton from "./new-campaign-form-skeleton";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function BalanceAlert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class NewCampaignPage extends React.Component {

    state = {
        loading: true,
        cabinets: null,
        hasCabinets: false,
        hasGroups: false,
        balanceError: false,
        campaignSettings: undefined,
        campaignIsStarting: false
    }

    api = new ApiService()

    componentDidMount() {
        this.getCabinets()
        this.getGroups()
    }

    getCabinets = () => {
        this.api.getCabinets().then(this.onCabinetsLoaded)
    }

    getGroups = () => {
        this.api.getGroups().then(this.onGroupsLoaded)
    }

    getUser = () => {
        this.api.getUser().then(this.onUserLoaded)
    }

    onCabinetsLoaded = (cabinets) => {
        if (typeof cabinets !== 'undefined') {
            this.setState({
                cabinets,
                hasCabinets: true,
            })
        }
    }

    onGroupsLoaded = (groups) => {
        if (typeof groups !== 'undefined') {
            this.setState({
                groups,
                hasGroups: true,
            })
        }
    }

    onUserLoaded = (user) => {
        if (typeof user !== 'undefined') {
            const balanceError = user.balance - 100 < 0
            const campaignIsStarting = !balanceError
            this.setState({balanceError, campaignIsStarting}, this.createCampaign)
        }
    }

    createCampaign = () => {
        if (!this.state.balanceError){
            this.api.createCampaign(this.state.campaignSettings)
        } else {
            console.log('low balance')
        }

    }

    startCampaign = (campaignSettings) => {
        this.setState({campaignSettings: campaignSettings})
        this.getUser()
    }

    handleCloseBalanceAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({balanceError: false});
    };

    handleCloseCampaignIsStartingAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({campaignIsStarting: false});
    };

    render() {
        const {hasCabinets, hasGroups, cabinets, groups} = this.state

        const form = hasCabinets && hasGroups ? <NewCampaignForm cabinets={cabinets}
                                                                 groups={groups}
                                                                 startCampaign={this.startCampaign} /> : null
        const spinner = hasCabinets && hasGroups ? null : <NewCampaignFormSkeleton />
        const error = hasCabinets && hasGroups ? null : spinner ? null : <h2>Недостаточно информации от тебе.</h2>


        return (
            <React.Fragment>

                <Typography variant="h6" gutterBottom style={{marginBottom: 20}}>
                    Запуск новой кампании
                </Typography>
                
                <Grid container spacing={6}>
                    <Grid item xs>
                        {form}
                        {spinner}
                        {error}
                    </Grid>
                    <Grid item xs>
                        <NewCampaignHelpBlock />
                    </Grid>
                </Grid>

                <Snackbar open={this.state.balanceError} autoHideDuration={6000}
                          onClose={this.handleCloseBalanceAlert}>
                    <BalanceAlert onClose={this.handleCloseBalanceAlert} severity="error">
                        Твоего баланса недостаточно для запуска новой кампании
                    </BalanceAlert>
                </Snackbar>

                <Snackbar open={this.state.campaignIsStarting} autoHideDuration={6000}
                          onClose={this.handleCloseCampaignIsStartingAlert}>
                    <BalanceAlert onClose={this.handleCloseCampaignIsStartingAlert} severity="success">
                        Кампания запускается, это займет некоторое время
                    </BalanceAlert>
                </Snackbar>

            </React.Fragment>
        )
    }
}


export default NewCampaignPage