import React from 'react';
import brain from './brain.png';
import './Logo.css';
import Tilt from 'react-tilt';

export const Logo=() => {
	return (
		
		<Tilt className="Tilt" options={{ max : 75 }} style={{ height: 150, width: 150 }} >
 			<div className="Tilt-inner">
				<img alt='logo' src={brain} />	
		 	</div>
		</Tilt>

	)
}

export default Logo ;