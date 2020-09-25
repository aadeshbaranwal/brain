import React,{Component} from 'react';
import './App.css';
import Logo from './Logo';
import Clarifai from 'clarifai'
import Navigation from './Navigation';
import SignIn from './SignIn';
import Rank from './Rank';
import ImageLinkForm from './ImageLinkForm';
import FaceRecognition from './FaceRecognition';
import Register from './Register';
import Particles from 'react-particles-js';
import tachyons from 'tachyons';
    
const app = new Clarifai.App({
 apiKey: 'ef7b15bf25cf47ae8ff1f7f87bca3565'
});

const params1=	{
				    "particles": {
				        "number": {

			            "value": 120
				        },
				        "size": {
				            "value": 2
				        }
				    },
				    "interactivity": {
				        "events": {
				            "onhover": {
				                "enable": false,
				                "mode": "repulse"
				            }
				        }
					}
				}

class App extends Component {
	constructor(){
		super();

		this.state={
			input : '',
			imageUrl : '',
			box : {},
			route :'signin',  //state can have three values:signin, register, home
			user : {
				id:'',
				name:'',
				email:'',
				entries:0,
				joined:''
			}
		}

		this.initialState={...this.state}
	}

	getInitialState=() => (
		{
			input : '',
			imageUrl : '',
			box : {},
			route :'signin',  //state can have three values:signin, register, home
			user : {
				id:'',
				name:'',
				email:'',
				entries:0,
				joined:''
			}
		}
	)

	updateUser=(data) => {
		this.setState({
			user : {
				id:data.id,
				name:data.name,
				email:data.email,
				entries:data.entries,
				joined:data.joined
			}	
		})
	}

	calculateFaceLocation=(data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image=document.getElementById('inputImage');
		const width=Number(image.width);
		const height=Number(image.height);

		return {
			leftCol:clarifaiFace.left_col*width,
			rightCol:width-clarifaiFace.right_col*width,
			topRow:clarifaiFace.top_row*height,
			bottomRow:height-clarifaiFace.bottom_row*height
		}
	}

	displayBox(box){
		this.setState({box:box});
	}

	onInputChange = (event) => {
		this.setState({input:event.target.value});
	}

	onButtonSubmit = (event) => {
		this.setState({imageUrl:this.state.input});
		app.models
		.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
		.then( response => {
				if(response){
					fetch('http://localhost:3001/image',{
						method:'put',
						headers:{'Content-type':'application/json'},
						body:JSON.stringify({
							id:this.state.user.id
						})
					})
					.then(response => response.json())
					.then(count => {
						this.setState(Object.assign(this.state.user,{entries:count}))
					})
				}

				this.displayBox(this.calculateFaceLocation(response))
			})
		.catch(err => console.log(err));
	}

	onRouteChange = (route)=>{
		this.setState({route:route})

		if(route==='signin'){
			this.updateUser(this.initialState)
		}
	}

	render() {
	    return (
		    <div className="App" >
		    	<Particles className="particles" params={params1} />
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.route} />
		    	{	
		    		this.state.route==='signin' ?
		    		<SignIn updateUser={this.updateUser} onRouteChange={this.onRouteChange} />
		    			:
			    	(	this.state.route==='home' ? 
			    		<div>
							<Logo />
							<Rank name={this.state.user.name} entries={this.state.user.entries} />
							<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
							<FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} /> 
						</div>
						:
						<Register updateUser={this.updateUser} onRouteChange={this.onRouteChange} />
					)	
				}
		    </div>
	    );
	}
}

export default App;