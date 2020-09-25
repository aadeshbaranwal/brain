import React from 'react';
import './FaceRecognition.css'

const FaceRecognition=({imageUrl,box}) => {
	return(
		<div className="center" style={{margin: '10px', justifyContent: 'center'}}>
			<div style={{position:'absolute'}} >
				<img alt='' id="inputImage" src={imageUrl} width='500px' height='auto' />
				<div className="faceBox" style={{
													top:box.topRow,
												 	bottom:box.bottomRow,
												 	left:box.leftCol,
												 	right:box.rightCol
												}} >
				</div>
			</div>
		</div>

	)
}

export default FaceRecognition; 