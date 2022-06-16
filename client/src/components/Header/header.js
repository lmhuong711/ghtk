import React from "react";
import {
	Typography,
	Box,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material'
import './header.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();

	const [alignment, setAlignment] = React.useState('upload');
	React.useEffect(() => {
		navigate('/' + alignment);
	}, [alignment])

	return (
		<Box className="header">
			<ToggleButtonGroup
				className="buttgroup"
				color="secondary"
				value={alignment}
				exclusive
				onChange={(e, v) => v ? setAlignment(v) : null}
			>
				<ToggleButton value="upload">Thêm dữ liệu</ToggleButton>
				<ToggleButton value="search">Tìm kiếm</ToggleButton>
			</ToggleButtonGroup>
			<Typography variant='h4'>TRA CỨU THÔNG TIN TUYỂN SINH</Typography>
			<Box
				component="img"
				className="logo"
				alt="logo"
				src={require("../../assets/photos/logo.png")}
			/>
		</Box>
	);
};
export default Header;
