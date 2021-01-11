import React from 'react';

import NewCampaignFormView from "../new-campaign-form-view";
import ApiService from "../../../../services/api-service";


const ageArray = [
    '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31',
    '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'
]


const sortGroups = (a, b) => {
    if (a.groupName.toLowerCase() > b.groupName.toLowerCase()) {
        return 1;
    }
    if (a.groupName.toLowerCase() < b.groupName.toLowerCase()) {
        return -1;
    }
    return 0;
}

const sortRetarget = (a, b) => {
    if (a.retargetName.toLowerCase() > b.retargetName.toLowerCase()) {
        return 1;
    }
    if (a.retargetName.toLowerCase() < b.retargetName.toLowerCase()) {
        return -1;
    }
    return 0;
}


class NewCampaignForm extends React.Component {

    state = {
        ageFromArray: [...ageArray],
        ageToArray: [...ageArray],
        relatedArtists: true,
        agencyHelpText: 'Необязательно',
        releaseUrl: undefined,
        releaseUrlError: false,
        budget: undefined,
        budgetError: false,
        ageFrom: '',
        ageTo: '',
        ageDisclaimer: '1',
        sex: 'all',
        cabinet: undefined,
        cabinetError: false,
        client: undefined,
        clientError: false,
        group: undefined,
        groupError: false,
        retarget: [],
        retargetNames: [],
    }
    api = new ApiService()

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value
        this.setState({[name]: value})

        if (name === 'client') {
            this.loadRetarget({client_vk_id: value})
        }
        if (name === 'ageFrom' || 'ageTo' || 'ageDisclaimer') {
            this.handleAge(name, value)
        }
    };

    handleRetarget = (event) => {
        this.setState({retargetNames: event.target.value})
    };

    handleRetargetDelete = (retargetName) => {
        const idx = this.state.retargetNames.indexOf(retargetName)
        this.setState({retargetNames: [...this.state.retargetNames.slice(0, idx),
                                            ...this.state.retargetNames.slice(idx + 1)]})
    };

    handleAge = (name, value) => {

        if (name === 'ageDisclaimer') {
            this.handleAgeDisclaimer(value)
        }
        if (name === 'ageFrom') {
            this.handleAgeFrom(value)
        }
        if (name === 'ageTo') {
            this.handleAgeTo(value)
        }
    }

    handleAgeDisclaimer = (value) => {

        if (value === '') {
            value = '1'
        }

        if (value === '4') {
            let ageFrom = '16'
            if (this.state.ageFrom > ageFrom) {
                ageFrom = this.state.ageFrom
            }
            const idx = ageArray.indexOf('16')
            this.setState({ageFromArray: [...ageArray.slice(idx)],
                                ageToArray: ['0', ...ageArray.slice(idx)],
                                ageFrom: ageFrom})
        } else if (value === '5') {
            let ageFrom = '18'
            if (this.state.ageFrom > ageFrom) {
                ageFrom = this.state.ageFrom
            }
            const idx = ageArray.indexOf('18')
            this.setState({ageFromArray: [...ageArray.slice(idx)],
                                ageToArray: ['0', ...ageArray.slice(idx)],
                                ageFrom: ageFrom})
        } else {
            const idx = ageArray.indexOf(this.state.ageFrom)
            this.setState({ageFromArray: [...ageArray],
                                ageToArray: [...ageArray.slice(idx)],
                                ageDisclaimer: value})
        }
    }

    handleAgeFrom = (value) => {
        if (value === '') {
            value = '0'
        }
        let ageTo = this.state.ageTo
        if (value > ageTo) {
            ageTo = value
        }
        if (this.state.ageTo === '') {
            ageTo = ''
        }
        const idx = ageArray.indexOf(value)
        this.setState({ageFromArray: [...ageArray],
                            ageToArray: [...ageArray.slice(idx)],
                            ageFrom: value,
                            ageTo: ageTo})
    }

    handleAgeTo = (value) => {
        if (value === '') {
            value = '0'
        }
        if (value === '0') {
            this.setState({ageFromArray: [...ageArray],
                                ageTo: '0'})
        } else {
            let ageFrom = this.state.ageFrom
            if (ageFrom > value) {
                ageFrom = value
            }
            const idx = ageArray.indexOf(value)
            this.setState({ageFromArray: [...ageArray.slice(0, idx + 1)],
                                ageToArray: [...ageArray],
                                ageFrom: ageFrom,
                                ageTo: value})
        }
    }

    changeRelatedArtists = () => {
        this.setState({relatedArtists: !this.state.relatedArtists})
    }

    loadRetarget = (param) => {
        this.api.getRetarget(param).then(this.onRetargetLoaded)
    }

    onRetargetLoaded = (retarget) => {
        if (typeof retarget !== 'undefined') {
            retarget.sort(sortRetarget)
            this.setState({retarget: retarget})
        }
    }

    checkForm = () => {

        let [urlError, budgetError, cabinetError, clientError, groupError] = [false, false, false, false, false]

        const releaseUrl = this.state.releaseUrl
        if (!releaseUrl || releaseUrl.indexOf('https://vk.com/music/album/-200') === -1) {urlError = true}

        const budget = this.state.budget
        if (!budget || isNaN(budget)) {budgetError = true}

        const cabinet = this.state.cabinet
        if (!cabinet) {cabinetError = true}

        const client = this.state.client
        if (!client && this.state.agencyHelpText === 'Обязательно') {clientError = true}

        const group = this.state.group
        if (!group) {groupError = true}

        this.setState({releaseUrlError: urlError, budgetError, cabinetError, clientError, groupError},
            this.startCampaign)

    }

    startCampaign = () => {
        const {releaseUrlError, budgetError, cabinetError, clientError, groupError} = this.state
        if (!releaseUrlError && !budgetError && !cabinetError && !clientError && !groupError) {
            console.log(this.state)
        } else {
            console.log('form error')
        }
    }

    render() {

        const { cabinets, groups } = this.props
        groups.sort(sortGroups)

        const changeCabinet = (event) => {
            const selectedCabId = event.target.value
            const selectedCab = cabinets.filter(cab => cab.cabinetVkId.toString() === selectedCabId)[0]
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
                retarget: [],
                retargetNames: []
            });
        }

        return <NewCampaignFormView groups={groups}
                                    state={this.state}
                                    ageArray={ageArray}
                                    handleChange={this.handleChange}
                                    changeRelatedArtists={this.changeRelatedArtists}
                                    changeCabinet={changeCabinet}
                                    cabinets={cabinets}
                                    handleRetarget={this.handleRetarget}
                                    handleRetargetDelete={this.handleRetargetDelete}
                                    startCampaign={this.checkForm}
        />
    }
}


export default NewCampaignForm