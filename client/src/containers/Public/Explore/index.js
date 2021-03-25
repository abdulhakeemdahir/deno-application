import React, { useEffect, useState } from "react";
import {
	Typography,
	Grid,
	CssBaseline,
	Dialog,
	Fade,
	Backdrop,
	Button,
} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
import "./style.css";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Nav from "../../../components/Navigation";
import News from "../../../components/News";
import SiteInfo from "../../../components/SiteInfo";
import Gradient from "../../../components/Gradient";
import Trending from "../../../components/Trending";
import Causes from "../../../components/Causes";
import Footer from "../../../components/Footer";
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
// import Splash from "../../../components/Splash";
import { useCauseContext } from "../../../utils/GlobalStates/CauseContext";
import { usePostContext } from "../../../utils/GlobalStates/PostContext";

import {
	CAUSE_LOADING,
	POST_LOADING,
	ADD_CAUSE,
	ADD_POST,
} from "../../../utils/actions/actions.js";

import API from "../../../utils/api";
import { Close } from "@material-ui/icons";

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};
// const useStyles = makeStyles(theme => ({}));
const Explore = () => {
	const [causeState, causeDispatch] = useCauseContext();
	const [postState, postDispatch] = usePostContext();

	useEffect(() => {
		async function fetchAllPostsAndCauses() {
			await causeDispatch({ type: CAUSE_LOADING });
			const causes = await API.getAllCauses();

			await causeDispatch({
				type: ADD_CAUSE,
				payload: {
					causes: causes.data,
					loading: false,
				},
			});

			await postDispatch({ type: POST_LOADING });
			const postInfo = await API.getAllPost();

			await postDispatch({
				type: ADD_POST,
				payload: {
					posts: postInfo.data,
					loading: false,
				},
			});
		}

		fetchAllPostsAndCauses();
	}, []);

	const [trendingState] = useState([
		{
			hashTag: "Save the Dolphins",
			url: "#",
		},
		{
			hashTag: "Save the Elephants",
			url: "#",
		},
		{
			hashTag: "Save the Whales",
			url: "#",
		},
	]);

	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const [open, setOpen] = React.useState(true);

	// const handleOpen = () => {
	// 	setOpen(true);
	// };

	// handleOpen();

	const handleClose = () => {
		setOpen(false);
		console.log(open);
	};

	const { width } = useWindowDimensions();
	return (
		<div className='Main'>
			<CssBaseline>
				<Dialog
					aria-labelledby='transition-modal-title'
					aria-describedby='transition-modal-description'
					open={open}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<Fade in={open}>
						<SiteInfo />
					</Fade>
					<Button
						size='large'
						className='analyticsButton'
						fullWidth
						onClick={handleClose}
					>
						<Close />
						Close Modal
					</Button>
				</Dialog>
				<Nav />
				<Grid
					container
					direction='row'
					justify='center'
					className={"container"}
					xs={12}
					lg={10}
					xl={8}
				>
					{width > 600 ? (
						<>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={3} className='card-container'>
									<Typography variant='subtitle2'>TRENDING</Typography>
									{trendingState.map((card, index) => (
										<Trending
											hashTag={card.hashTag}
											link={card.url}
											key={index}
										/>
									))}
								</Grid>
								<Grid item xs={12} sm={6} className='card-container'>
									<Typography variant='subtitle2'>NEWS FEED</Typography>
									{postState.posts.map(card => {
										return (
											<News
												key={card._id}
												id={card._id}
												title={card.title}
												author={card.author.firstName}
												link={card.url}
												image={card.imageUrl}
												post={card.content}
												hashTag={card.hashtag}
												comments={card.comments}
											/>
										);
									})}
								</Grid>
								<Grid item xs={12} sm={3} className='card-container'>
									<Typography variant='subtitle2'>CAUSES</Typography>
									{postState.posts.map(card => {
										return (
											<Causes
												key={card._id}
												id={card._id}
												title={card.title}
												author={card.author.firstName}
												link={card.url}
												image={card.imageUrl}
												post={card.content}
												hashTag={card.hashtag}
												comments={card.comments}
											/>
										);
									})}
								</Grid>
							</Grid>
						</>
					) : (
						<>
							<Tabs
								value={value}
								onChange={handleChange}
								aria-label='simple tabs example'
							>
								<Tab label='News' {...a11yProps(0)} />
								<Tab label='Trending' {...a11yProps(1)} />
								<Tab label='Causes' {...a11yProps(2)} />
							</Tabs>
							<TabPanel value={value} index={0}>
								<Grid item xs={12}>
									{postState.posts.map(card => {
										return (
											<News
												key={card._id}
												id={card._id}
												title={card.title}
												author={card.author.firstName}
												link={card.url}
												image={card.imageUrl}
												post={card.content}
												hashTag={card.hashtag}
												comments={card.comments}
											/>
										);
									})}
								</Grid>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<Grid item xs={12}>
									{trendingState.map(card => (
										<Trending hashTag={card.hashTag} link={card.url} />
									))}
								</Grid>
							</TabPanel>
							<TabPanel value={value} index={2}>
								<Grid item xs={12}>
									{causeState.causes.map(card => {
										return (
											<Causes
												key={card._id}
												id={card._id}
												title={card.title}
												author={card.author.firstName}
												link={card.url}
												image={card.imageUrl}
												post={card.content}
												hashTag={card.hashtag}
											/>
										);
									})}
								</Grid>
							</TabPanel>
						</>
					)}
				</Grid>
				<Gradient />
				{/* <Splash /> */}
				<Footer />
			</CssBaseline>
		</div>
	);
};
export default Explore;
