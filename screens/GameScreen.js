import React from 'react'
import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline'
import { StarIcon } from 'react-native-heroicons/solid'
import { Entypo } from '@expo/vector-icons'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import axios from 'axios'
import { apiKey } from '../constants'
import { LinearGradient } from 'expo-linear-gradient'
import Loading from '../components/Loading'
import { useRef } from 'react'
import ViewShot from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'

const { width, height } = Dimensions.get('window')

const GameScreen = () => {
	const { params: item } = useRoute()
	const detailEndpoint = `https://api.rawg.io/api/games/${item.id}?key=${apiKey}`
	const navigation = useNavigation()
	const [isFavourite, setIsFavourite] = useState(false)
	const [gameDetails, setGameDetails] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		fetchDetails()
	}, [item])

	//Call API to fetch game details
	const fetchDetails = async () => {
		try {
			const response = await axios.get(detailEndpoint)
			const data = response.data
			setGameDetails(data)
			setIsLoading(false)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	//Search on YT
	const handleYouTubeSearch = () => {
		Linking.openURL(`https://www.youtube.com/results?search_query=${item.name}`)
		console.log(item)
	}

	//Take snapshot
	const viewShot = useRef()
	shareGame = () => {
		viewShot.current.capture().then((uri) => {
			Sharing.shareAsync('file://' + uri)
		}),
			(error) => console.error('screenshot error', error)
	}

	return (
		<ScrollView contentContainerStyle={{ paddingBottom: 20 }} className='flex-1 bg-neutral-900'>
			<ViewShot ref={viewShot} options={{ format: 'jpg', quality: 0.9 }}>
				<View className='w-full'>
					{/* back, favourite and share buttons */}
					<SafeAreaView className='z-10 w-full flex-row justify-between items-center px-4 absolute '>
						<TouchableOpacity className='rounded-xl p-1'>
							<ArrowLeftCircleIcon size='40' color='white' strokeWidth='2' onPress={() => navigation.goBack()} />
						</TouchableOpacity>
						<View className='flex-row'>
							<TouchableOpacity className='rounded-xl p-1'>
								<StarIcon size='35' color={isFavourite ? 'orange' : 'white'} onPress={() => setIsFavourite((prev) => !isFavourite)} />
							</TouchableOpacity>
							<TouchableOpacity onPress={shareGame} className='p-1'>
								<Entypo name='share-alternative' size={30} color='white' />
							</TouchableOpacity>
						</View>
					</SafeAreaView>

					{/* game background */}
					<View>
						<Image source={{ uri: `${item?.background_image}` }} style={{ width: width, height: height * 0.45 }} />

						{/* dummy image: <Image source={require('../assets/images/fortnite.png')} style={{ width: width, height: height * 0.45 }} /> */}

						<LinearGradient
							colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
							style={{ width, height: height * 0.4 }}
							start={{ x: 0.5, y: 0 }}
							end={{ x: 0.5, y: 1 }}
							className='absolute bottom-0'
						/>
					</View>
				</View>

				{/* game details */}
				<View>
					{/* game name*/}
					<Text style={{ marginTop: -(height * 0.09) }} className='text-white text-center z-20 text-3xl font-bold tracking-wide mb-5'>
						{item?.name}
					</Text>

					{/* genre */}
					<View className='flex-row justify-center'>
						{item.genres.map((genre, index) => {
							let isNotLastChild = index + 1 !== item.genres.length
							let dotToggle = isNotLastChild ? '• ' : ''
							return (
								<Text key={index} className='text-gray-400 text-center font-semibold text-base mb-2'>
									{genre?.name} {dotToggle}
								</Text>
							)
						})}
					</View>
					<Text className='text-gray-400 text-center font-semibold text-base mb-5'>{item?.released?.split('-')[0] || ''}</Text>

					{/* game description*/}
					<Text className='text-gray-400 mx-4 tracking-wide mb-5'>{gameDetails?.description_raw}</Text>

					{/* screenshots */}
					<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
						{item?.short_screenshots?.map((screenshot, index) => {
							return (
								<Image
									key={index}
									source={{ uri: `${screenshot.image}` }}
									style={{
										width: width * 0.4,
										height: height * 0.2,
									}}
									className='rounded-3xl mr-2 mb-5'
								/>
							)
						})}
					</ScrollView>

					{/* youtube search */}
					<TouchableOpacity onPress={handleYouTubeSearch}>
						<Text className='text-gray-400 text-sm mb-10 text-center'>
							Click <Entypo name='youtube' size={20} color='red' /> to watch more on YouTube
						</Text>
					</TouchableOpacity>
				</View>
			</ViewShot>
		</ScrollView>
	)
}

export default GameScreen
