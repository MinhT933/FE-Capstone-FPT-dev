import React from 'react'
import {Button as MuiButton} from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    root: {
        // marginRight: theme.spacing(0.5)
        spacing:5
    },
    label: {
        textTransform: 'none'
    }
}))

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();

    return (
        <MuiButton
            variant= "contained"
            size= "large"
            color="primary"
            onClick={onClick}
            {...other}
            classes={{ root: classes.root, label: classes.label }}>
            {text}
        </MuiButton>
    )
}
