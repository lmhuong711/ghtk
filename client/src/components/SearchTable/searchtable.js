import * as React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
    Typography,
    Divider,
} from '@mui/material';
import './searchtable.css'


const column = {
    0: {
        title: "STT"
    },
    1: {
        title: "Trường Tiểu học"
    },
    2: {
        title: "Quận/Huyện"
    },
    3: {
        title: "Mã học sinh"
    },
    4: {
        title: "Lớp"
    },
    5: {
        title: "Họ và tên"
    },
    6: {
        title: "Ngày sinh"
    },
    7: {
        title: "Giới tinh"
    },
    8: {
        title: "Điện thoại liên hệ"
    },
    9: {
        title: "Điểm sơ tuyển vòng 1",
        detail: {
            0: "Điểm lớp 1",
            1: "Điểm lớp 2",
            2: "Điểm lớp 3",
            3: "Điểm lớp 4",
            4: "Điểm lớp 5",
            5: "Tổng 5 năm",
            6: "Điểm ưu tiên",
            7: "Tổng điểm sơ tuyển",
        }
    },
    10: {
        title: "Ghi chú"
    },
}

export default function SearchTable(props) {
    React.useEffect(() => {
        console.log(props.data);
    }, [props.data])
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className='tablehead'>
                    <TableRow>
                        {Object.keys(column).map(e => {
                            return column[e].detail ?
                                <TableCell align="center" className='headercell' sx={{ padding: '0px' }}>
                                    <Stack direction="column"
                                        divider={<Divider orientation="horizentical" flexItem />}
                                    >
                                        <Typography>{column[e].title}</Typography>
                                        <Stack direction="row"
                                            display='flex'
                                            divider={<Divider orientation="vertical" flexItem />}
                                        >
                                            {Object.keys(column[e].detail).map(el => {
                                                return <Typography className='pdct' flex={1}>{column[e].detail[el]}</Typography>
                                            })}
                                        </Stack>
                                    </Stack>
                                </TableCell>
                                :
                                <TableCell className='headercell' sx={{ padding: '0px' }}><Typography className='pdct'>{column[e].title}</Typography></TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row, index) => (
                        <TableRow key={row.studentCode}>
                            <TableCell align="right" className='headercell' sx={{ padding: '0px' }} ><Typography className='pdct' flex={1} >{index + 1}</Typography></TableCell>
                            {
                                Object.keys(row).map(e => {
                                    return e == "marks" ?

                                        <TableCell align="center" sx={{ padding: '0px' }} className='headercell' >
                                            <Stack display={'flex'} direction="row"
                                                divider={<Divider orientation="vertical" flexItem />}
                                                sx={{ height: '100%' }}
                                            >{row[e].split(',').map(el => <Typography className='pdct' flex={1} >{el}</Typography>)}</Stack>
                                        </TableCell>
                                        :
                                        <TableCell align="center" className='headercell' sx={{ padding: '0px' }}><Typography className='pdct'>{row[e]}</Typography></TableCell>
                                })
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
