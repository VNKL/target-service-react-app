import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import Button from "@material-ui/core/Button";


const AutomatesPage = () => {
    return (

        <Grid container >

            <Grid item xs={12}>
                <Link component={RouterLink} to='/new_automate' underline='none'>
                    <Button variant='contained'
                            color='secondary'
                    >
                        Запустить новую автоматизацию
                    </Button>
                </Link>
            </Grid>



        </Grid>

    )
}

export default AutomatesPage