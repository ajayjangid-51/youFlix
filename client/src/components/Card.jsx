import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import { fetchSuccess } from "../redux/videoSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
	width: ${(props) => props.type !== "sm" && "360px"};
	margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
	cursor: pointer;
	display: ${(props) => props.type === "sm" && "flex"};
	gap: 10px;
`;

const Image = styled.img`
	width: 100%;
	height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
	background-color: #999;
	flex: 1;
`;

const Details = styled.div`
	display: flex;
	margin-top: ${(props) => props.type !== "sm" && "16px"};
	gap: 12px;
	flex: 1;
`;

const ChannelImage = styled.img`
	width: 36px;
	height: 36px;
	border-radius: 50%;
	background-color: #999;
	display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
	font-size: 16px;
	font-weight: 500;
	color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
	font-size: 14px;
	color: ${({ theme }) => theme.textSoft};
	margin: 9px 0px;
`;

const Info = styled.div`
	font-size: 14px;
	color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [channel, setChannel] = useState({});
	// console.log("the videos are:-");
	// console.log(video);

	useEffect(() => {
		const fetchChannel = async () => {
			const res = await axios.get(`/users/find/${video.userId}`);
			setChannel(res.data);
		};
		fetchChannel();
	}, [video.userId]);

	return (
		<Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
			<Container
				type={type}
				/* onClick={() => {
				const fetchData = async () => {
					console.log("fetch data is called");
					try {
						const videoRes = await axios.get(`/videos/find/${video._id}`);
						const channelRes = await axios.get(
							`/users/find/${videoRes.data.userId}`
						);
						setChannel(channelRes.data);
						dispatch(fetchSuccess(videoRes.data));
						console.log(videoRes.data);
					} catch (err) {
						console.log("ohhh error in axios.get");
					}
					console.log("fetch vedio end");
				};
				fetchData();

				const routeChange = () => {
					console.log("ookay navigating start");
					let path = `newPath`;
					navigate(`/video/${video._id}`);
					console.log("navigating end");
				};
				// setTimeout(() => {
				routeChange();
				// }, 3000);
			}} */
			>
				<Image type={type} src={video.imgUrl} />
				<Details type={type}>
					<ChannelImage type={type} src={channel.img} />
					<Texts>
						<Title>{video.title}</Title>
						<ChannelName>{channel.name}</ChannelName>
						<Info>
							{video.views} views • {format(video.createdAt)}
						</Info>
					</Texts>
				</Details>
			</Container>
			//{" "}
		</Link>
	);
};

export default Card;
