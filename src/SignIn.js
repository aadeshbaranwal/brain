import React from 'react';
import Text from'./Text.js';

class SignIn extends React.Component {
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
			loginStatus:''	//2 states possible:failure/''
		}
	}

	onEmailChange = (event) => {
		this.setState({email:event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password:event.target.value})
	}


	onSubmitChange = (event) => {
		event.preventDefault();

		const wrong="wrong password";
		const unableToLogin="unable to login";

		fetch('http://localhost:3001/signin', {
			method:'post',
			headers:{'Content-Type': 'application/json'},
			body: JSON.stringify ({
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json())
		.then(user => {
				if(user.id) {
					this.props.updateUser(user);
					this.props.onRouteChange('home')
				}

				else {
					this.setState({loginStatus:user})
				}
			}
		)
	}

	render() {
		const {onRouteChange}=this.props.onRouteChange;

		return (
			<div className="center">
			{//	<div className="mt3" >
			//		{document.write(this.state.loginStatus)}
			//	</div>
			}	
				<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
					<main className="pa4 black-80">
					  <form className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
					      </div>
					    </fieldset>
					    <div>
					      <input onClick={this.onSubmitChange} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
					    </div>
					    <div className="lh-copy mt3">
					      <a onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db">Register</a>
					    </div>
					    <Text para={this.state.loginStatus} />

					  </form>
					</main>
				</article>
			</div>
		)
	}
}

export default SignIn;