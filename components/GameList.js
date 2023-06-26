import React from 'react'
import { View, Text, Pressable, Dimensions, Image, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

function GameList({ popularGames }) {
	const navigation = useNavigation()
	const handleClick = (item) => {
		navigation.navigate('Game', item)
	}

	return (
		<View>
			<Text className='text-white text-xl mx-4 mb-5'>Popular Games</Text>
			<Carousel
				data={popularGames}
				renderItem={({ item }) => <GameCard item={item} handleClick={handleClick} />}
				inactiveSlideOpacity={0.6}
				sliderWidth={width}
				itemWidth={width * 0.6}
				slideStyle={{ display: 'flex', alignItems: 'center' }}
			/>
		</View>
	)
}
export default GameList

const GameCard = ({ item, handleClick }) => {
	// console.log('item poster', item.background_image)

	return (
		<View className='space-y-1 mr-4 items-center'>
			<Pressable onPress={() => handleClick(item)}>
				<Image
					source={{ uri: `${item.background_image}` }}
					style={{
						width: width * 0.6,
						height: height * 0.4,
					}}
					className='rounded-3xl'
				/>
			</Pressable>
			<Text className='text-neutral-300 ml-1'>{item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name}</Text>
		</View>
	)
}
