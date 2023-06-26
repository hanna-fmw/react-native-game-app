import { View, Text } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import * as Progress from 'react-native-progress'

const { width, height } = Dimensions.get('window')

const Loading = () => {
	return (
		<View style={{ height, width }} className='absolute flex-row justify-center items-center'>
			<Progress.CircleSnail thickness={10} size={150} color={['#fb7f7f', '#FFB278', '#FFDB7E']} style={{ marginTop: -180 }} />
		</View>
	)
}

export default Loading
