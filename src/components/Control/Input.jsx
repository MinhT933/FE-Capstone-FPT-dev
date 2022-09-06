import React from 'react'
import { TextField } from '@mui/material';

export default function Input(props) {
  console.log(props);
    const {name, label, values, onChange}= props
  return (
    <TextField
            variant="outlined"
            label={label}
            name={name}
            value={values}
            onChange={onChange}
          />
  )
}
