import React from "react";
import { Radar } from "react-chartjs-2";

import { Typography, Grid, Divider, CardContent } from "@material-ui/core";

import "./style.css";

export default function ChartCausesSupported(props) {
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
					<span className='authorStyle'> Causes Supporters:</span>
				</Typography>
				<Divider />
				<Grid container direction='row' spacing={1}>
					<CardContent>
						<Radar
							data={{
								labels: [
									"January",
									"February",
									"March",
									"April",
									"May",
									"June",
									"July",
									"August",
									"September",
									"October",
									"November",
									"December",
								],
								datasets: [
									{
										label: "Causes Supporters",
										data: [10, 5, 13, 17, 20, 10, 20, 10, 13, 13, 10, 12],
										backgroundColor: [
											"rgba(255, 99, 132, 0.2)",
											"rgba(54, 162, 235, 0.2)",
											"rgba(255, 206, 86, 0.2)",
											"rgba(75, 192, 192, 0.2)",
											"rgba(153, 102, 255, 0.2)",
											"rgba(255, 159, 64, 0.2)",
											"rgba(255, 99, 132, 0.2)",
											"rgba(54, 162, 235, 0.2)",
											"rgba(255, 206, 86, 0.2)",
											"rgba(75, 192, 192, 0.2)",
											"rgba(153, 102, 255, 0.2)",
											"rgba(255, 159, 64, 0.2)",
										],
										borderColor: [
											"rgba(255, 99, 132, 1)",
											"rgba(54, 162, 235, 1)",
											"rgba(255, 206, 86, 1)",
											"rgba(75, 192, 192, 1)",
											"rgba(153, 102, 255, 1)",
											"rgba(255, 159, 64, 1)",
											"rgba(255, 99, 132, 1)",
											"rgba(54, 162, 235, 1)",
											"rgba(255, 206, 86, 1)",
											"rgba(75, 192, 192, 1)",
											"rgba(153, 102, 255, 1)",
											"rgba(255, 159, 64, 1)",
										],
										borderWidth: 1,
									},
								],
							}}
							height={props.height}
							width={props.width}
							options={{
								maintainAspectRatio: false,
							}}
						/>
					</CardContent>
				</Grid>
			</Grid>
		</>
	);
}
