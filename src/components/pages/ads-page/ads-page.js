import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import ApiService from "../../../services/api-service";
import TableView from "../../table";
import Spinner from "../../spinner";


const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: 5
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
}));


const AdsHeader = (props) => {
    const classes = useStyles()

    return (

        <Grid className={classes.header} container alignItems='center' spacing={4}>

            <Grid item >
                <Avatar src={props.data.cover} alt={props.data.name} className={classes.large} />
            </Grid>

            <Grid item xs>
                <Typography variant='h6'>
                    {props.data.name}
                </Typography>
            </Grid>

            <Grid item xs={3} sm={3} align='right'>
                <Button variant='contained'
                        color='secondary'
                        onClick={props.updateStats}
                >
                    Обновить статистику
                </Button>
            </Grid>


        </Grid>


    )
}


class AdsPage extends React.Component {

    state = {
        loading: true,
        campaign: null,
        hasData: false,
        hasHeader: false
    }

    api = new ApiService()

    componentDidMount() {
        this.getCampaign()
    }

    getCampaign = () => {
        this.api.getCampaign(this.props.campaignVkId).then(this.onDataLoaded)
    }

    updateStats = () => {
        this.setState({
            loading: true,
            hasData: false
        })
        this.api.updateCampaignStats(this.props.campaignVkId).then(this.onDataLoaded)
    }

    onDataLoaded = (campaign) => {
        if (typeof campaign !== 'undefined') {
            this.setState({
                campaign,
                loading: false,
                hasData: true,
                hasHeader: true
            })
        } else {
            this.setState({
                loading: false,
                hasData: false
            })
        }
    }

    render() {
        let {loading, hasData, hasHeader, campaign} = this.state
        if (campaign) {
            campaign.campaign.cover = 'https://upload.wikimedia.org/wikipedia/ru/1/1a/%D0%9A%D0%BB%D0%B0%D0%B2%D0%B0_%D0%9A%D0%BE%D0%BA%D0%B0_%26_Niletto_%E2%80%94_%D0%9A%D1%80%D0%B0%D1%88.jpg'
        }

        const header = hasHeader ? <AdsHeader data={campaign.campaign} updateStats={this.updateStats}/> : null
        const table = hasData ? <TableView data={campaign.ads} firstCellLabel='Сегмент' headLabel='Объявления' /> : null
        const spinner = loading ? <Spinner /> : null
        const error = hasData ? null : spinner ? null : <h2>У тебя еще нет созданных кампаний</h2>

        return (
            <div className='campaigns-page'>
                {header}
                {spinner}
                {table}
                {error}
            </div>
        )
    }

}


export default AdsPage