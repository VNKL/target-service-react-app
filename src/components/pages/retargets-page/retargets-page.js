import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import ApiService from "../../../services/api-service";
import Spinner from "../../spinner";
import Typography from "@material-ui/core/Typography";
import RetargetTable from "./retarget-table";
import RetargetHelpBlock from "./retarget-help-block";
import Button from "@material-ui/core/Button";


const sortRetarget = (a, b) => {
    if (a.retargetName.toLowerCase() > b.retargetName.toLowerCase()) {
        return 1;
    }
    if (a.retargetName.toLowerCase() < b.retargetName.toLowerCase()) {
        return -1;
    }
    return 0;
}


class NewCampaignFormView extends React.Component {

    state = {
        agencyHelpText: 'Необязательно',
        cabinets: undefined,
        cabinet: undefined,
        client: undefined,
        hasCabinets: false,
        hasRetarget: false,
        retarget: [],
    }
    api = new ApiService()

    componentDidMount() {
        this.getCabinets()
    }

    getCabinets = () => {
        this.api.getCabinets().then(this.onCabinetsLoaded)
    }

    onCabinetsLoaded = (cabinets) => {
        if (typeof cabinets !== 'undefined') {
            this.setState({
                cabinets,
                hasCabinets: true,
            })
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value

        if (name === 'client') {
            this.loadRetarget({client_vk_id: value})
        }
    };

    loadRetarget = (param) => {
        this.api.getRetarget(param).then(this.onRetargetLoaded)
    }

    onRetargetLoaded = (retarget) => {
        if (typeof retarget !== 'undefined') {
            retarget.sort(sortRetarget)
            this.setState({retarget: retarget, hasRetarget: true})
        }
    }

    changeCabinet = (event) => {
        const selectedCabId = event.target.value
        const selectedCab = this.state.cabinets.filter(cab => cab.cabinetVkId.toString() === selectedCabId)[0]
        let agencyHelpText = 'Необязательно'

        if (selectedCab) {
            if (selectedCab.cabinetType === 'agency') {
                agencyHelpText = 'Обязательно'
            }
            if (selectedCab.cabinetType === 'user') {
                agencyHelpText = 'Необязательно'
                this.loadRetarget({cabinet_vk_id: selectedCabId})
            }
        }
        this.setState({
            cabinet: selectedCabId,
            client: undefined,
            agencyHelpText: agencyHelpText,
            hasRetarget: false,
            retarget: [],
        });
    }

    updateRetarget = () => {
        this.setState({
            agencyHelpText: 'Необязательно',
            cabinets: undefined,
            cabinet: undefined,
            client: undefined,
            hasCabinets: false,
            hasRetarget: false,
            retarget: [],
        })
        this.api.updateRetarget().then(this.onRetargetUpdated)
    }

    onRetargetUpdated = () => {
        this.getCabinets()
    }

    render() {
        const {hasCabinets} = this.state
        const cabinetSelect = hasCabinets ? <CabinetsSelectView state={this.state}
                                                                changeCabinet={this.changeCabinet}
                                                                handleChange={this.handleChange} />: null
        const spinner = hasCabinets ? null : <Spinner />
        const error = hasCabinets ? null : spinner ? null : <h2>У тебя еще нет сохраненных ретаргетов</h2>

        return (
            <React.Fragment>
                <Grid container spacing={3} >
                    <Grid item xs >
                        <Typography variant="h6" gutterBottom style={{marginBottom: 20}}>
                            Ретаргет
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} align='right'>
                        <Button variant='contained'
                                color='secondary'
                                onClick={this.updateRetarget}
                        >
                            Обновить ретаргет
                        </Button>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={6} sm={6}>
                        {cabinetSelect}
                        {spinner}
                        {error}
                    </Grid>
                    <Grid item xs >
                        <RetargetHelpBlock />
                    </Grid>
                </Grid>


            </React.Fragment>
        );
    }
}


const CabinetsSelectView = (props) => {

    const {state, changeCabinet, handleChange} = props

    const cabinetsVkIds = []

    const table = state.hasRetarget ? <RetargetTable data={state.retarget} /> : <h3>Выбери кабинет</h3>

    return (
        <Grid container spacing={3} alignItems='center' >

            <Grid item xs={6} sm={6}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="age-native-helper">Кабинет</InputLabel>
                    <NativeSelect
                        id='cabinet'
                        name='cabinet'
                        value={state.cabinet}
                        onChange={changeCabinet}
                    >
                        <option aria-label="None" value="" />
                        {
                            state.cabinets.map((cabinet) => {
                                const cabVkId = cabinet.cabinetVkId
                                const check = cabinetsVkIds.includes(cabVkId)
                                let cab = null
                                if (!check) {
                                    cabinetsVkIds.push(cabVkId)
                                    cab = <option value={cabVkId}
                                                  key={cabVkId}>{cabinet.cabinetName}</option>
                                }
                                return cab
                            })
                        }
                    </NativeSelect>
                    <FormHelperText>Обязательно</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={6} sm={6}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="age-native-helper">Клиент</InputLabel>
                    <NativeSelect
                        id='client'
                        name='client'
                        value={state.client}
                        onChange={handleChange}
                    >
                        <option aria-label="None" value="" />
                        {state.cabinets.map((cabinet) => {
                            const cabId = state.cabinet
                            let client = undefined
                            if (cabId === cabinet.cabinetVkId.toString()) {
                                client = <option value={cabinet.clientVkId}
                                                 key={cabinet.clientVkId}>{cabinet.clientName}</option>
                            }
                            return client
                        })}
                    </NativeSelect>
                    <FormHelperText>{state.agencyHelpText}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} >
                {table}
            </Grid>

        </Grid>
    )
}


export default NewCampaignFormView