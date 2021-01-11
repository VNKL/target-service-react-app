import React from "react";
import UserAvatarImage from "./user-avatar-image";
import UserMenu from "./user-menu";
import Toolbar from "@material-ui/core/Toolbar";


const UserBlock = (props) => {

    const {user} = props

    return (
        <Toolbar>
            <UserMenu />
            <UserAvatarImage user={user}/>
        </Toolbar>
    )

}

export default UserBlock