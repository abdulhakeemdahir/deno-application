import { Typography } from "@material-ui/core";
import "./style.css";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { Link } from "react-router-dom";
export default function Trending(props) {
	return (
		<>
			{props.hashTag.map((tag, index) => (
				<div className='cardTrending' id={props.post}>
					<Link to={`#${props.link}`} className='textStyle' key={index}>
						<Typography variant='body3'>
							<TrendingUpIcon className='iconStyle' /> {tag}{" "}
						</Typography>
					</Link>
				</div>
			))}
		</>
	);
}
