export default class ApiService {
    _apiBaseUrl = 'http://192.168.1.165:8000/api/'

    async getResponse(method, params) {
        const fullUrl = new URL(`${this._apiBaseUrl}${method}`)
        fullUrl.search = new URLSearchParams(params).toString()
        const response = await fetch(fullUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {Authorization: `JWT ${localStorage.getItem('token')}`},
        })
        if (response.ok) {
            return await response.json()
        } else {
            console.log(response.json())
        }
    }

    async automateCampaign(automateSettings) {
        console.log(automateSettings)
    }

    async createCampaign(campaignSettings) {
        console.log(campaignSettings)
    }

    async getUser() {
        return await this.getResponse('user.get')
    }

    async getCampaigns() {
        const campaigns = await this.getResponse('campaigns.get')
        if (typeof campaigns !== 'undefined') {
            return this._unpackCampaigns(campaigns)
        }
    }

    async getCampaign(campaignVkId) {
        const campaign = await this.getResponse('campaigns.getDetails', {campaign_vk_id: campaignVkId})
        if (typeof campaign !== 'undefined') {
            return this._unpackCampaign(campaign)
        }
    }

    async getCabinets() {
        const cabinets = await this.getResponse('cabinets.get')
        if (typeof cabinets !== 'undefined') {
            return this._unpackCabinets(cabinets)
        }
    }

    async getGroups() {
        const groups = await this.getResponse('groups.get')
        if (typeof groups !== 'undefined') {
            return this._unpackGroups(groups)
        }
    }

    async getRetarget(param) {
        const retarget = await this.getResponse('retarget.get', param)
        if (typeof retarget !== 'undefined') {
            return this._unpackRetarget(retarget)
        }
    }

    async updateCampaignStats(campaignVkId) {
        const campaign = await this.getResponse('campaigns.updateStats', {campaign_vk_id: campaignVkId})
        if (typeof campaign !== 'undefined') {
            return this._unpackCampaign(campaign)
        }
    }

    async updateCabinets() {
        await this.getResponse('cabinets.update')
        return await this.getCabinets()
    }

    async updateRetarget() {
        await this.getResponse('retarget.update')
    }

    async getAds(campaignVkId) {
        const ads = await this.getResponse('ads.get', {campaign_vk_id: campaignVkId})
        if (typeof ads !== 'undefined') {
            return this._unpackAds(ads)
        }
    }

    async login(username, password) {
        const response = await fetch(`${this._apiBaseUrl}user.auth`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type'
            },
            body: JSON.stringify({username: username, password: password})
        })
        if (response.ok) {
            return await response.json()
        }
    }

    async register(username, password, name, email) {
        const response = await fetch(`${this._apiBaseUrl}user.create`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type'
            },
            body: JSON.stringify({username: username, password: password, name: name, email: email})
        })
        if (response.ok) {
            return await response.json()
        }
    }

    _unpackCampaigns = (campaigns) => {
        return campaigns.map((campaign) => {
            return {
                campaignVkId: campaign.campaign_vk_id,
                name: campaign.campaign_name,
                status: campaign.status,
                spent: campaign.spent,
                reach: campaign.reach,
                cpm: campaign.cpm,
                listens: campaign.listens,
                cpl: campaign.cpl,
                clicks: campaign.clicks,
                cpc: campaign.cpc,
                subscribes: campaign.subscribes,
                cps: campaign.cps,
                cover: campaign.release_cover_url
            }
        })
    }

    _unpackCampaign = (campaign) => {
        return {
            campaign: this._unpackCampaigns([campaign])[0],
            ads: this._unpackAds(campaign.ads)
        }
    }

    _unpackAds = (ads) => {
        return ads.map((ad) => {
            return {
                name: ad.ad_name,
                status: ad.status,
                approved: ad.approved,
                spent: ad.spent,
                listens: ad.listens,
                cpl: ad.cpl,
                reach: ad.reach,
                cpm: ad.cpm,
                clicks: ad.clicks,
                cpc: ad.cpc,
                subscribes: ad.subscribes,
                cps: ad.cps
            }
        })
    }

    _unpackCabinets = (cabinets) => {
        return cabinets.map((cabinet) => {
            return {
                cabinetType: cabinet.cabinet_type,
                cabinetVkId: cabinet.cabinet_vk_id,
                cabinetName: cabinet.cabinet_name,
                clientVkId: cabinet.client_vk_id,
                clientName: cabinet.client_name
            }
        })
    }

    _unpackGroups = (groups) => {
        return groups.map((group) => {
            return {
                groupName: group.group_name,
                groupVkId: group.group_vk_id,
                groupAvaUrl: group.ava_url
            }
        })
    }

    _unpackRetarget = (retarget) => {
        return retarget.map((item) => {
            return {
                retargetName: item.retarget_name,
                retargetVkId: item.retarget_vk_id,
                audienceCount: item.audience_count
            }
        })
    }
}