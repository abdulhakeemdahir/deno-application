import { Typography } from "@material-ui/core";
import "./style.css";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
export default function Trending(props) {
	return (
		<div className='cardTrending'>
			<a href={props.link} className='textStyle'>
				<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
					<TrendingUpIcon className='iconStyle' /> {props.hashTag}{" "}
				</Typography>
			</a>
		</div>
	);
}
