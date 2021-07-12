// Import all relevant packages and components
import { Typography } from "@material-ui/core";
import "./style.css";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { useHistory } from "react-router-dom";

const Trending = props => {
  const history = useHistory();
  const handleClick = id => {
    history.push(`/post/${id}`);
    //onClick={() => handleClick(props.post)}
  };
  return (
    <>
      {props.hashTag.map((tag, index) => (
        <div className='cardTrending' onClick={() => handleClick(props.post)}>
          <Typography variant='body3' className='textStyle'>
            <TrendingUpIcon className='iconStyle' /> {tag}{" "}
          </Typography>
        </div>
      ))}
    </>
  );
};

export default Trending;
