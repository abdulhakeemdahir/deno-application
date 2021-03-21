import React from "react";
import { Pie } from "react-chartjs-2";

import { Typography, Grid, Divider, CardContent } from "@material-ui/core";

import "./style.css";

export default function ChartFollowAndSupport(props) {
	return (
		<>
			<Grid item className='card' xs={12}>
				<Grid container className='headerContainer'>
					<Grid item xs={9} sm={10}>
						<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
							{props.title}
						</Typography>
					</Grid>
				</Grid>
				<Typography variant='body2' color='textSecondary' component='p'>
					<span className='authorStyle'> Supporters And Followers:</span>
				</Typography>
				<Divider />
				<Grid container direction='row' spacing={1}>
					<CardContent>
						<Pie
							data={{
								labels: ["Supporters", "Followers"],
								datasets: [
									{
										label: "Supporters Over Time",
										data: [35, 2000],
										backgroundColor: [
											"rgba(255, 99, 132, 0.2)",
											"rgba(54, 162, 235, 0.2)",
										],
										borderColor: [
											"rgba(255, 99, 132, 1)",
											"rgba(54, 162, 235, 1)",
										],
										borderWidth: 1,
									},
								],
							}}
							height={400}
							width={400}
							options={{
								maintainAspectRatio: true,
							}}
						/>
					</CardContent>
				</Grid>
			</Grid>
		</>
	);
}
