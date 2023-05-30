import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const Avatar = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;

const Input = styled.input`
	border: none;
	border-bottom: 1px solid ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.text};
	background-color: transparent;
	outline: none;
	padding: 5px;
	width: 100%;
`;

const Comments = ({ videoId }) => {
	const { currentUser } = useSelector((state) => state.user);
	const [cmtt, setcmt] = useState("");
	const [comments, setComments] = useState([]);

	const comt = useRef("");
	// comments = comments.reverse();

	useEffect(() => {
		const fetchComments = async () => {
			try {
				let res = await axios.get(`/comments/${videoId}`);
				// let arr = res.data;
				// arr = arr.reverse();
				setComments(res.data.reverse());
			} catch (err) {
				console.log(err);
			}
		};
		fetchComments();
	}, [videoId, comments]);

	//TODO: ADD NEW COMMENT FUNCTIONALITY

	return (
		<Container>
			<NewComment>
				<Avatar src={currentUser?.img} />
				<form
					// action="#"
					onSubmit={async (e) => {
						e.preventDefault();
						const addComment = async () => {
							const cmt = {
								userId: currentUser._id,
								videoId: videoId,
								desc: cmtt,
							};
							try {
								// console.log("⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕");
								// console.log(cmt);
								const res = await axios.post(`/comments`, cmt);
								// console.log("the response is ", res);
								// setComments(res.data);
								// setcmt(null);
								// setComments([...comments, cmtt]);
								// console.log(comments.length);
								setComments([cmtt, ...comments]);
								// console.log(comments.length);
								setcmt("");
								console.log("finish🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷");
							} catch (err) {
								setcmt("");
								console.log("thecomment err is", err);
							}
						};
						addComment();
					}}
				>
					<Input
						placeholder="Add a comment..."
						value={cmtt}
						onChange={(e) => setcmt(e.target.value)}
					/>
				</form>
			</NewComment>
			{comments?.map((comment) => (
				<Comment key={comment._id} comment={comment} />
			))}
		</Container>
	);
};

export default Comments;
