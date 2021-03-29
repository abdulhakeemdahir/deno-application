// Import all relevant packages and components
import React from "react";
import { Line } from "react-chartjs-2";
import { Typography, Grid, Divider } from "@material-ui/core";
import "./style.css";
// Create the component function and export for use
export default function ChartSupporters(props) {
	// Create the JSX for the component
	return (
		<>
			<Grid item className='card' xs={12}>
				<Grid container className='headerContainer'>
					<Grid item xs={9} sm={10}>
						<Typography
							variant='subtitle1'
							style={{
								fontWeight: "bold",
							}}
						>
							{props.title}
						</Typography>
					</Grid>
				</Grid>
				<Typography variant='body2' color='textSecondary' component='p'>
					<span className='authorStyle'> Supporters:</span>
				</Typography>
				<Divider />
				<Grid container direction='row' className='chartContainer2'>
					<Line
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
									label: "Supporters Over Time",
									data: [20, 22, 25, 15, 10, 30, 35, 41, 44, 47, 43, 35],
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
						options={{
							maintainAspectRatio: true,
						}}
					/>
				</Grid>
			</Grid>
		</>
	);
}
