import React from "react";
import ApiService from "../../../services/api-service";


const ProfilePage = () => {

    const api = new ApiService()
    const user = api.getUser()
    console.log(user)

    return <h1>Profile Page</h1>
}


export default ProfilePage