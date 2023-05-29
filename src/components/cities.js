import React, { Component } from 'react';
import axios from 'axios';

export default class Cities extends Component {
	state = {
		country: '',
		
		cities: []
	};

	readData() {
		this.setState({ country: this.props.match.params.country_name });
		axios
			.get(`http://localhost:8000/api/name/${this.props.match.params.country_name}/info`)
			.then((res) => {
				this.setState({ cities: res.data.data }); 
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	componentDidMount() {
		this.readData();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.cont !== this.props.match.params.cont) {
			this.readData();
		}
	}

	render() {
		const { country, cities } = this.state;
		if (cities.length === 0) {
			return (
				<div>
					<h1>Country: {country}</h1>
					<div>No data</div>
				</div>
			);
		} else {
			return (
				<div>
					<h1>Country: {country}</h1>
					<ul className="list-group">
						{cities.map((
							s 
						) => (
							<li className="list-group-item" key={s.name}>
								{s.name},&nbsp;{s.district}
							</li>
						))}
					</ul>
				</div>
			);
		}
	}
}
