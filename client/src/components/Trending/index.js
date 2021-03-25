import { Typography } from "@material-ui/core";
import "./style.css";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { Link } from "react-router-dom";
export default function Trending(props) {
	console.log(props);
	return (
		<div className='cardTrending'>
			{props?.hashTag ? (
				props.hashTag.map((tag, index) => (
					<Link to={`#${props.link}`} className='textStyle' key={index}>
						<Typography variant='body3'>
							<TrendingUpIcon className='iconStyle' /> {tag}{" "}
						</Typography>
					</Link>
				))
			) : (
				<Typography>No HashTag found</Typography>
			)}
		</div>
	);
}
