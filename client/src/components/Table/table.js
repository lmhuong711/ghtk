import React from 'react';
import {
    Typography,
} from '@mui/material';
import { OutTable } from 'react-excel-renderer';
import './table.css';
import { Box } from "@mui/material"

function Table(props) {
    return (
        <Box className="TableBox">
            <OutTable
                data={props.rows}
                columns={props.cols}
                tableClassName="ExcelTable2007"
                tableHeaderRowClass="heading"
            />
        </Box>
    )
}

export default Table