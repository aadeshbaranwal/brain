import React from 'react';
import './Navigation.css'

const Navigation=({onRouteChange,isSignedIn}) => {
	if(isSignedIn==='home'){
		return (
			<nav className="navigation">
				<p onClick={ ()=>onRouteChange('signin') }   className="nav-inner">Sign Out</p>

			</nav>
		)
	}
	else{
		return (
			<div>
				<nav className='center navigation' >
					<p onClick={ ()=>onRouteChange('signin') }   className="nav-inner">Sign In</p>
				</nav>
					<nav className='center navigation' style={{display:'inlineBlock'}}>
						<p onClick={ ()=>onRouteChange('register') }   className="nav-inner">Register</p>

					</nav>
			</div>
		)
	}
}

export default Navigation;