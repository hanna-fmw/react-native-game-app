import axios from 'axios'
import Lottie from 'lottie-react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { View, Dimensions, Text, TextInput, Pressable, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XCircleIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { Image } from 'react-native'
import Loading from '../components/Loading'
import { apiKey } from '../constants'

const { width, height } = Dimensions.get('window')

const SearchScreen = () => {
	const navigation = useNavigation()

	const [resultList, setResultList] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	const searchEndpoint = `https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}&page=2`

	useEffect(() => {
		fetchResults()
	}, [searchTerm])

	const fetchResults = async () => {
		try {
			const response = await axios.get(searchEndpoint)
			const data = response.data
			console.log('Get search results', data.results[0].name)
			if (data && searchTerm.length > 2) setResultList(data.results)
			setIsLoading(false)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss()
			}}>
			<SafeAreaView className='bg-black flex-1 pt-5'>
				<View className='flex-row justify-between items-center mx-4 mb-3 border border-gray-400 rounded-full'>
					<TextInput
						value={searchTerm}
						placeholder='Search Game'
						placeholderTextColor={'gray'}
						className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
						onChangeText={(text) => setSearchTerm(text)}
					/>
					<Pressable
						onPress={() => {
							navigation.navigate('Home')
						}}
						className='m-2'>
						<XCircleIcon color={'rgb(248 113 113)'} size={35} />
					</Pressable>
				</View>

				{isLoading ? (
					<Loading />
				) : resultList.length > 0 ? (
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} className='space-y-3'>
						<Text className='text-white font-semibold ml-1'>Results ({resultList.length})</Text>
						<View className='flex-row justify-between flex-wrap'>
							{resultList.map((item, index) => {
								return (
									<Pressable
										onPress={() => {
											navigation.push('Game', item)
										}}
										key={index}>
										<View className='space-y-2 mb-4'>
											<Image
												source={{ uri: `${item?.background_image}` }}
												style={{ width: width * 0.45, height: height * 0.3 }}
												className='rounded-3xl'
											/>
											<Text className='text-gray-300 ml-1'>{item?.name?.length > 21 ? item.name.slice(0, 21) + '...' : item.name}</Text>
										</View>
									</Pressable>
								)
							})}
						</View>
					</ScrollView>
				) : (
					<View className='flex-1 justify-center items-center ml-8'>
						<Lottie source={require('../assets/images/data.json')} autoPlay loop style={{ width: '70%' }} />
					</View>
				)}
			</SafeAreaView>
		</TouchableWithoutFeedback>
	)
}

export default SearchScreen
