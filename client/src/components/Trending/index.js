import { Typography } from "@material-ui/core";
import "./style.css";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

const Trending = props => {
  return (
    <>
      {props.hashTag.map((tag, index) => (
        <div className="cardTrending" id={props.post}>
          <Typography variant="body3" className="textStyle">
            <TrendingUpIcon className="iconStyle" /> {tag}{" "}
          </Typography>
        </div>
      ))}
    </>
  );
};

export default Trending;
