import React from "react";
import {
    Snackbar as SB,
} from '@mui/material'
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbar = (props) => {
    const closeHandler = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setState({ ...props.state, open: false });
    };
    return (
        <SB
            open={props.state.open}
            onClose={closeHandler}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={closeHandler} severity={props.state.severity} >
                {props.state.message}
            </Alert>
        </SB>
    );
};
export default Snackbar;
