import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

function GenreList({ genres }) {
	const navigation = useNavigation()
	const handleClick = (item) => {
		navigation.navigate('Genre', item)
	}

	return (
		<>
			<Text className='text-white text-xl mx-4 mb-5'>Genres</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
				{genres.map((item, index) => {
					return <GenreCard key={index} item={item} handleClick={handleClick} />
				})}
			</ScrollView>
		</>
	)
}
export default GenreList

const GenreCard = ({ item, handleClick }) => {
	console.log('Genre Name och annat', item, item.name)
	return (
		<View className='space-y-1 mr-4 items-center'>
			<Pressable onPress={() => handleClick(item)}>
				<Image
					source={{ uri: `${item.image_background}` }}
					style={{
						width: width * 0.4,
						height: height * 0.25,
					}}
					className='rounded-3xl'
				/>
			</Pressable>
			<Text className='text-neutral-300 ml-1'>{item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name}</Text>
		</View>
	)
}
