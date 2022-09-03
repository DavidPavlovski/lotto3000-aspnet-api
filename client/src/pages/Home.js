import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
	return (
		<div>
			<h1>Home page</h1>
			<ul>
				<li>
					<Link to={'/user'}>user panel</Link>
				</li>
				<li>
					<Link to={'/adminpanel'}>admin panel</Link>
				</li>
			</ul>
		</div>
	);
}

export default Home;
