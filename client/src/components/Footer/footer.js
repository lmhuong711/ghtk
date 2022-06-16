import React from "react";
import {
	Typography,
	Box,
} from '@mui/material'
import './footer.css';


const Footer = () => {
	return (
		<Box className="footer">
			<Typography>Trang web phục vụ tra cứu thông tin tuyển sinh</Typography>
			<Typography>Địa chỉ: <a href="https://goo.gl/maps/EhYtvT8QDeN6Mc7QA" target='_blank'>
				Số 8 Phạm Hùng, Phường Mễ Trì, Nam Từ Liêm, Hà Nội
			</a></Typography>
		</Box>
	);
};
export default Footer;
