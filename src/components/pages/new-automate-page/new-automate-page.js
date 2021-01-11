import React from "react";
import NewAutomateForm from "./new-automate-form";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import NewAutomateHelpBlock from "./new-automate-help-block";
import ApiService from "../../../services/api-service";
import Spinner from "../../spinner";


class NewAutomatePage extends React.Component {

    state = {
        loading: true,
        campaigns: null,
        hasData: false,
    }

    api = new ApiService()

    componentDidMount() {
        this.getCampaigns()
    }

    getCampaigns = () => {
        this.api.getCampaigns().then(this.onDataLoaded)
    }

    onDataLoaded = (campaigns) => {
        if (typeof campaigns !== 'undefined') {
            this.setState({
                campaigns: campaigns.filter(campaign => campaign.status !== 2),
                loading: false,
                hasData: true,
            })
        }
    }

    render() {

        const {loading, hasData, campaigns} = this.state

        const form = hasData ? <NewAutomateForm campaigns={campaigns}/> : null
        const spinner = loading ? <Spinner /> : null
        const error = hasData ? null : spinner ? null : <h2>У тебя еще нет созданных кампаний</h2>

        return (
            <React.Fragment>

                <Typography variant="h6" gutterBottom style={{marginBottom: 20}}>
                    Запуск новой автоматизации
                </Typography>

                <Grid container spacing={6}>
                    <Grid item xs>
                        { spinner }
                        { form }
                        { error }
                    </Grid>
                    <Grid item xs>
                        <NewAutomateHelpBlock />
                    </Grid>
                </Grid>

            </React.Fragment>
        )
    }

}


export default NewAutomatePage