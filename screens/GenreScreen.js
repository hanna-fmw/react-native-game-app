import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline'
import { Entypo } from '@expo/vector-icons'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import axios from 'axios'
import { apiKey } from '../constants'
import { LinearGradient } from 'expo-linear-gradient'
import Loading from '../components/Loading'

const { width, height } = Dimensions.get('window')
const GenreScreen = () => {
	const { params: item } = useRoute()
	const navigation = useNavigation()

	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetchData()
		setIsLoading(false)
	}, [item])

	//Call API to fetch game genres
	const fetchData = async () => {
		try {
			const response = await axios.get(`https://api.rawg.io/api/games?genres=${item.slug}&key=${apiKey}`)
			const data = response.data
			setData(data.results)
			console.log('This is data', data)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	//Search on YT
	const handleYouTubeSearch = () => {
		Linking.openURL(`https://www.youtube.com/results?search_query=${item.name}+Games`)
		console.log(item)
	}

	return (
		<ScrollView contentContainerStyle={{ paddingBottom: 20 }} className='flex-1 bg-neutral-900'>
			{/* back button */}
			{isLoading ? (
				<Loading />
			) : (
				<View>
					<View className='w-full'>
						<SafeAreaView className='z-10 w-full flex-row justify-between items-center px-4 absolute '>
							<TouchableOpacity className='rounded-xl p-1'>
								<ArrowLeftCircleIcon size='40' color='white' strokeWidth='1.5' onPress={() => navigation.goBack()} />
							</TouchableOpacity>
						</SafeAreaView>

						{/* game background */}
						<View>
							<Image source={{ uri: `${item.image_background}` }} style={{ width: width, height: height * 0.55 }} />

							<LinearGradient
								colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
								style={{ width, height: height * 0.4 }}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 0.5, y: 1 }}
								className='absolute bottom-0'
							/>
						</View>
					</View>

					<View>
						{/* genre name*/}
						<Text style={{ marginTop: -(height * 0.05) }} className='text-white text-center z-20 mb-4 text-3xl font-bold'>
							{item.name}
						</Text>

						<View className='m-2'>
							{/* youtube search */}
							<TouchableOpacity onPress={handleYouTubeSearch}>
								<Text className='text-gray-400 text-sm mb-10 text-center'>
									Click <Entypo name='youtube' size={20} color='red' /> to watch more {item.name} videos on YouTube
								</Text>
							</TouchableOpacity>

							{/* <Image source={require('../assets/images/fortnite.png')} style={{ width: width, height: height * 0.45 }} /> */}

							{/* games of current genre */}
							<View className='flex-row flex-wrap justify-between'>
								{data.map((item, index) => {
									return (
										<View key={index} className='justify-center items-center mb-5'>
											<TouchableOpacity onPress={() => navigation.navigate('Game', item)}>
												<Image
													source={{ uri: `${item.background_image}` }}
													style={{ width: width * 0.3, height: height * 0.1 }}
													className='rounded-3xl'
												/>
											</TouchableOpacity>
											<Text className='text-gray-400 text-xs pt-1 '>{item.name.length > 14 ? item.name.slice(0, 14) + '...' : item.name}</Text>
										</View>
									)
								})}
							</View>
						</View>
					</View>
				</View>
			)}
		</ScrollView>
	)
}

export default GenreScreen
