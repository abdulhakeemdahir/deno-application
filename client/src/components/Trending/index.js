// Import all relevant packages and components
import { Typography } from "@material-ui/core";
import "./style.css";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { Link } from "react-router-dom";
// Create the component function and export for use
export default function Trending(props) {
	// Create the JSX for the component
	return (
		<>
			{props.hashTag.map((tag, index) => (
				<div className='cardTrending' id={props.post}>
					{/* <Link to={`#${props.link}`} className='textStyle' key={index}> */}
					<Typography variant='body3' className='textStyle'>
						<TrendingUpIcon className='iconStyle' /> {tag}{" "}
					</Typography>
					{/* </Link> */}
				</div>
			))}
		</>
	);
}
