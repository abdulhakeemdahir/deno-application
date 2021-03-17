import { Typography } from "@material-ui/core";
import "./style.css";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
export default function Trending(props) {
	return (
		<div className='cardTrending'>
			<a href={props.link} className='textStyle'>
				<Typography variant='body3'>
					<TrendingUpIcon className='iconStyle' /> {props.hashTag}{" "}
				</Typography>
			</a>
		</div>
	);
}
