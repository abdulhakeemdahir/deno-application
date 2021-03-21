import React from "react";
import { Bar } from "react-chartjs-2";

import { Typography, Grid, Divider, CardContent } from "@material-ui/core";

import "./style.css";

export default function ChartFollowers(props) {
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
					<span className='authorStyle'> Followers:</span>
				</Typography>
				<Divider />
				<Grid container direction='row' spacing={1}>
					<CardContent>
						<Bar
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
										label: "Followers Over Time",
										data: [
											1000,
											1115,
											1320,
											1000,
											900,
											1200,
											1300,
											1450,
											1500,
											1510,
											1600,
											2000,
										],
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
