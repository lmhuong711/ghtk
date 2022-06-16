import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './search.css';
import Snackbar from '../../components/Snackbar/snackbar';

function Search() {
  const [state, setState] = React.useState({
    open: false,
    message: null,
    severity: null,
    data: []
  });

  function searchHandler() {
    var params = {
      "studentCode": document.getElementById("studentCode").value,
      "fullname": document.getElementById("fullname").value,
    }
    var url = "http://localhost:3000/student?" + new URLSearchParams(params);
    fetch(url, {
      method: 'get',
    }).then(
      res => res.json(),
      err => console.log(err)
    ).then(result => {
      var sev = 'error';
      if (result.message.includes('Thành công!')) sev = 'success';
      setState(prev => ({
        ...prev,
        message: result.message,
        open: true,
        severity: sev,
        data: result.data
      }));
    }, error => {
      setState(prev => ({
        ...prev,
        message: error,
        open: true,
        severity: "error",
      }));
    })
  }

  return (
    <Box>
      <Box className='searchArea'>
        <Box className='searchArea' sx={{ flexDirection: 'column' }}>
          <TextField
            id="studentCode"
            label="Mã học sinh"
            helperText="Ví dụ: 020316HEO"
            variant="standard"
            color='secondary'
          />
          <TextField
            id="fullname"
            label="Họ và tên"
            helperText="Ví dụ: Lê Minh Heo"
            variant="standard"
            color='secondary'
          />
        </Box>
        <Box>
          <Button variant="contained" color='secondary' endIcon={<SendIcon />} onClick={searchHandler}>Tìm</Button>
        </Box>
      </Box>
      <Snackbar state={state} setState={setState} />
    </Box>
  )
}

export default Search