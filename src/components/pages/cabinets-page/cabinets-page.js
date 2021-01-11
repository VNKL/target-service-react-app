import React from "react";
import CabinetsTable from "./cabinets-table";
import ApiService from "../../../services/api-service";
import Spinner from "../../spinner";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LinkIcon from "@material-ui/icons/Link";
import Link from "@material-ui/core/Link";
import CabinetsHelpBlock from "./cabinets-help-block";
import Button from "@material-ui/core/Button";


class CabinetsPage extends React.Component {

    state = {
        loading: true,
        cabinets: null,
        hasCabinets: false
    }

    api = new ApiService()

    componentDidMount() {
        this.getCabinets()
    }

    getCabinets = () => {
        this.api.getCabinets().then(this.onCabinetsLoaded)
    }

    updateCabinets = () => {
        this.setState({
            loading: true,
            cabinets: null,
            hasCabinets: false
        })
        this.api.updateCabinets().then(this.onCabinetsLoaded)
    }

    onCabinetsLoaded = (cabinets) => {
        if (typeof cabinets !== 'undefined') {
            this.setState({
                cabinets: this.refactorCabinets(cabinets),
                hasCabinets: true,
                loading: false
            })
        }
    }

    refactorCabinets = (cabinets) => {
        return  cabinets.map((cabinet) => {
            let cabinetType = 'Пользовательский'
            if (cabinet.cabinetType === 'agency') {
                cabinetType = 'Агентский'
            }

            const cabinetUrl = `https://vk.com/ads?act=office&union_id=${cabinet.cabinetVkId}`
            const cabinetLink = <Link href={cabinetUrl} underline='none' target="_blank"> <LinkIcon /> </Link>

            let clientLink = undefined
            if (cabinet.clientVkId) {
                const clientUrl = `https://vk.com/ads?act=office&union_id=${cabinet.clientVkId}`
                clientLink = <Link href={clientUrl} underline='none' target="_blank"> <LinkIcon /> </Link>
            }
            return {
                ...cabinet,
                cabinetType: cabinetType,
                cabinetLink: cabinetLink,
                clientLink: clientLink
            }
        })
    }

    render() {

        const {hasCabinets, cabinets, loading} = this.state

        const table = hasCabinets ? <CabinetsTable data={cabinets} /> : null
        const spinner = loading  ? <Spinner /> : null
        const error = hasCabinets ? null : spinner ? null : <h2>У тебя еще нет рекламных кабинетов</h2>

        return (
            <React.Fragment>

                <Grid container spacing={3} >
                    <Grid item xs >
                        <Typography variant="h6" gutterBottom style={{marginBottom: 20}}>
                            Рекламные кабинеты
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} align='right'>
                        <Button variant='contained'
                                color='secondary'
                                onClick={this.updateCabinets}
                        >
                            Обновить кабинеты
                        </Button>
                    </Grid>
                </Grid>

                <Grid container spacing={3} >
                    <Grid item xs>
                        {table}
                        {spinner}
                        {error}
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <CabinetsHelpBlock />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}


export default CabinetsPage