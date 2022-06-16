import React from 'react'
import {
  Typography,
  Box,
  Input,
  Button,
  Link,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SendIcon from '@mui/icons-material/Send';
import { ExcelRenderer } from 'react-excel-renderer';
import Table from '../../components/Table/table';
import './upload.css'
import Snackbar from '../../components/Snackbar/snackbar';

const fileAccept = [
  '.csv',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel'
];
const colTitle = 'STT,Trường Tiểu học,Quận/Huyện,Mã học sinh,Lớp,Họ và tên,Ngày sinh,,,Giới,Nơi sinh,Dân tộc,Hộ khẩu thường trú,Điện thoại liên hệ,Điểm sơ tuyển vòng 1,,,,,,,,Ghi chú,,,,,,,Ngày,Tháng,Năm,,,,,,Tổng điểm năm lớp 1,Tổng điểm năm lớp 2,Tổng điểm năm lớp 3,Tổng điểm năm lớp 4,Tổng điểm năm lớp 5,Tổng điểm kết quả 5 năm,Điểm ưu tiên,Tổng điểm sơ tuyển';

function Upload() {
  const [state, setState] = React.useState({
    open: false,
    message: null,
    rows: null,
    cols: null,
    data: null,
    severity: null,
    loading: null,
  });
  var fileHandler = (event) => {
    let fileObj = event.target.files[0];
    if (fileObj) ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else if (fileAccept.indexOf(fileObj.type) <= -1) {
        setState(prev => ({
          ...prev,
          message: 'Sai định dạng file',
          open: true,
          severity: "error",
          rows: null,
        }))
      } else {
        setState(prev => ({
          ...prev,
          cols: resp.cols,
          rows: resp.rows,
        }));
      }
    });
  }

  var sendHandler = (e) => {
    if (!state.rows) {
      setState(prev => ({
        ...prev,
        message: 'Chưa tải file đúng định dạng lên',
        open: true,
        severity: "error",
      }))
    } else {
      if (state.rows[3] && state.rows[4] && [...state.rows[3], ...state.rows[4]].join(',') === colTitle) {
        setState({
          ...state,
          open: false,
        });
        // handle send data
        var vdata = state.rows.slice(5).map(ee => {
          var e = [...ee];
          e[6] = [...e].slice(6, 9).join('/');
          e[14] = [...e].slice(14, 22).map(el => el ? el : 0).join(',');
          e = [...e.slice(1, 7), ...e.slice(9, 15), ...e.slice(22)];
          return e;
        });
        fetch("http://localhost:3000/student", {
          method: 'post',
          body: JSON.stringify(vdata),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(
          res => res.json(),
          err => console.log(err)
        ).then(result => {
          var sev = 'error';
          if (result.includes('Thành công!')) sev = 'success';
          setState(prev => ({
            ...prev,
            message: result,
            open: true,
            severity: sev,
          }));
        }, error => {
          setState(prev => ({
            ...prev,
            message: error,
            open: true,
            severity: "error",
          }));
        })
      } else setState(prev => ({
        ...prev,
        message: 'File sai dữ liệu',
        open: true,
        severity: "error",
      }))
    }
  }

  return (
    <Box>
      <Box className='HelpBar'>
        <Link href='/sample.xlsx' download><Button variant="outlined" startIcon={<FileDownloadIcon />} color='secondary'>Tải bản mẫu</Button></Link>
        <Input
          type="file"
          onChange={(e) => fileHandler(e)}
          style={{ "padding": "10px" }}
          inputProps={{
            accept: fileAccept.join(',')
          }}
          color='secondary'
        />
        <Button variant="contained" color='secondary' endIcon={<SendIcon />} onClick={sendHandler}>Gửi</Button>
      </Box>
      {
        state.rows && state.cols ?
          <>
            <Typography variant='h6' sx={{ fontStyle: 'italic', color: '#6464af' }}>Bản xem trước</Typography>
            <Table
              rows={state.rows}
              cols={state.cols}
            />
          </> : null
      }
      <Snackbar state={state} setState={setState} />
    </Box >
  )
}

export default Upload