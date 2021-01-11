import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NewCampaignForm from "./new-campaign-form";
import NewCampaignHelpBlock from "./new-campaign-help-block";
import ApiService from "../../../services/api-service";
import NewCampaignFormSkeleton from "./new-campaign-form-skeleton";


class NewCampaignPage extends React.Component {

    state = {
        loading: true,
        cabinets: null,
        hasCabinets: false,
        hasGroups: false
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

    render() {
        const {hasCabinets, hasGroups, cabinets, groups} = this.state

        const form = hasCabinets && hasGroups ? <NewCampaignForm cabinets={cabinets} groups={groups}/> : null
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
            </React.Fragment>
        )
    }
}


export default NewCampaignPage