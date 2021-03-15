import { Typography } from "@material-ui/core";
import "./style.css";
import WhatshotIcon from "@material-ui/icons/Whatshot";

export default function Trending(props) {
	return (
		<div className='cardTrending'>
			<a href={props.link} className='textStyle'>
				<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
					<WhatshotIcon className='iconStyle' /> {props.hashTag}{" "}
				</Typography>
			</a>
		</div>
	);
}
