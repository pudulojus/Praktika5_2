import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Countries extends Component {
	state = {
		continent: '',
		countries: []
	};

	readData() {
		this.setState({ continent: this.props.match.params.cont });
		axios
			.get(`http://localhost:8000/api/continent/${this.props.match.params.cont}/countries`)
			.then((res) => {
				this.setState({ countries: res.data.data });
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
		const { continent, countries } = this.state;
		if (countries.length === 0) {
			return (
				<div>
					<h1>Continent: {continent}</h1>
					<div>No data</div>
				</div>
			);
		} else {
			return (
				<div>
					<h1>Continent: {continent}</h1>
					<ul className="list-group">
						{countries.map((
							s 
						) => (
							<li className="list-group-item" key={s.riik}>
								{s.riik},&nbsp;{s.linn}
								<Link to={`/country/${s.riik}`}>Cities</Link>
							</li>
						))}
					</ul>
				</div>
			);
		}
	}
}
