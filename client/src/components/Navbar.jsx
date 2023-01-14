import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Upload from "./Upload";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import MaterialUisearch from "./MaterialUisearch";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { color } from "@mui/system";
import { pink } from "@mui/material/colors";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import { Avatar } from "@mui/material";
const Container = styled.div`
	position: sticky;
	top: 0;
	background-color: ${({ theme }) => theme.bgLighter};
	height: 10vh;
	display: flex;
	justify-content: space-between;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	/* justify-content: flex-end; */
	justify-content: space-between;
	height: 100%;
	/* border: 1px solid red; */
	/* padding: 0px 20px; */
	/* position: relative; */
`;

const Search = styled.div`
	width: 50%;
	position: absolute;
	left: 0px;
	right: 0px;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px;
	border: 1px solid #ccc;
	border-radius: 3px;
	color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
	border: none;
	background-color: transparent;
	outline: none;
	color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
	padding: 5px 15px;
	background-color: transparent;
	border: 1px solid #3ea6ff;
	color: #3ea6ff;
	border-radius: 3px;
	font-weight: 500;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const User = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	font-weight: 500;
	color: ${({ theme }) => theme.text};
`;

// const Avatar = styled.img`
// 	width: 32px;
// 	height: 32px;
// 	border-radius: 50%;
// 	background-color: #999;
// `;

const Navbar = ({ darkMode, setDarkMode }) => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [q, setQ] = useState("");
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const label = { inputProps: { "aria-label": "Size switch demo" } };
	return (
		<>
			<Container>
				<Wrapper>
					{/* <Search> */}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							navigate(`/search?q=${q}`);
						}}
						style={{
							flex: "1 1 0%",
							display: "flex",
							alignItems: "center",
							padding: "0vh 3vw",
						}}
					>
						<Input
							style={{
								flex: "1 1 0%",
								border: "1px solid rgb(204, 204, 204)",
								borderRadius: "1.5vh",
								padding: "1vh 2vw",
							}}
							placeholder="Search"
							onChange={(e) => setQ(e.target.value)}
						/>
						<SearchOutlinedIcon
							color="secondary"
							onClick={() => navigate(`/search?q=${q}`)}
						/>
					</form>
					{/* </Search> */}
					<div
						style={{
							display: "flex",
							padding: "0vh 3vh",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						{currentUser ? (
							<User>
								{/* <VideoCallOutlinedIcon  />
							{currentUser.name} */}
								<IconButton>
									<PublishRoundedIcon
										onClick={() => setOpen(true)}
										sx={{ color: darkMode ? pink[500] : "primary" }}
										titleAccess="upload video"
									/>
								</IconButton>
							</User>
						) : (
							<IconButton>
								<Link to="signin" style={{ textDecoration: "none" }}>
									{/* <Button>
								<AccountCircleOutlinedIcon />
								SIGN IN
							</Button> */}
									<PermIdentityRoundedIcon
										sx={{ color: darkMode ? pink[500] : "primary" }}
										titleAccess="signin"
									/>
								</Link>
							</IconButton>
						)}

						<IconButton>
							<LogoutIcon
								// color={darkMode ? "disabled" : "secondary"}
								// sx={darkMode && { color: pink[500] }}
								sx={{ color: darkMode ? pink[500] : "primary" }}
								onClick={() => dispatch(logout())}
								label="logout"
								titleAccess="logout"
							/>
						</IconButton>

						<MaterialUisearch
							darkMode={darkMode}
							// sx={darkMode && { color: pink[500] }}
							// color={darkMode ? "primary" : "disabled"}
							// color="secondary"
							setDarkMode={setDarkMode}
						/>
						{/* <Avatar /> */}
						{/* <Avatar src="hoihl"></Avatar> */}
						<Avatar src={currentUser?.img} />
					</div>
				</Wrapper>
			</Container>
			{open && <Upload setOpen={setOpen} />}
		</>
	);
};

export default Navbar;
