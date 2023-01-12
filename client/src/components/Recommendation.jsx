import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
	/* border: 1px solid blue; */
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	/* align-items: flex-start; */
	margin-left: 3vw;

	flex: 2;
	/* overflow-y: scroll; */
`;

const Recommendation = ({ tags }) => {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		const fetchVideos = async () => {
			// const res = await axios.get(`/videos/tags?tags=${tags}`);
			const res = await axios.get(`/videos/random`);
			setVideos(res.data);
		};
		fetchVideos();
	}, [tags]);

	return (
		<Container>
			{videos.map((video) => (
				<Card type="sm" key={video._id} video={video} />
			))}
		</Container>
	);
};

export default Recommendation;
