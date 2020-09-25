import React from 'react';
import './ImageLinkForm.css';

export const ImageLinkForm=( {onInputChange,onButtonSubmit} ) => {

	return (
		<div className='form'>
			<p>This app detects faces. Give it a shot!</p>
			<div className='center'>
				<input type='tex' onChange={onInputChange}/>
				<button onClick={onButtonSubmit}>Submit</button>
			</div>
		</div>	
	)

}

export default ImageLinkForm;