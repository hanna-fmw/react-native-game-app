import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import GameList from '../components/GameList'
import GenreList from '../components/GenreList'
import axios from 'axios'
import { apiKey } from '../constants'

const popularEndpoint = `https://api.rawg.io/api/games?key=${apiKey}`
const genresEndpoint = `https://api.rawg.io/api/genres?key=${apiKey}`

function HomeScreen() {
	const navigation = useNavigation()
	const [isLoading, setIsLoading] = useState(true)
	const [popularGames, setPopularGames] = useState([])
	const [genres, setGenres] = useState([])

	useEffect(() => {
		fetchPopular()
		fetchGenres()
	}, [])

	const fetchPopular = async () => {
		try {
			const response = await axios.get(popularEndpoint)
			const data = response.data
			// console.log('get popular games', data.results)
			if (data && data.results) setPopularGames(data.results)
			setIsLoading(false)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	const fetchGenres = async () => {
		try {
			const response = await axios.get(genresEndpoint)
			const data = response.data
			// console.log('get game genres', data.results)
			if (data && data.results) setGenres(data.results)
			setIsLoading(false)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<View className='flex-1 bg-neutral-900'>
			<SafeAreaView>
				<StatusBar style='light' />
				<View className='flex-row mx-4 pt-8'>
					<Text className='mx-auto'>
						<Text className='text-[#ED6A6A] text-4xl font-bold tracking-widest'>G</Text>
						<Text className='text-[#f16f6f] text-3xl font-bold tracking-widest'>a</Text>
						<Text className='text-[#fb7f7f] text-3xl font-bold tracking-widest'>m</Text>
						<Text className='text-[#DE7E30] text-3xl font-bold tracking-widest'>e</Text>
						<Text className='text-[#FFB278] text-4xl font-bold tracking-widest'>L</Text>
						<Text className='text-[#FFB278] text-3xl font-bold tracking-widest'>o</Text>
						<Text className='text-[#FFCB7C] text-3xl font-bold tracking-widest'>o</Text>
						<Text className='text-[#FFCB7C] text-3xl font-bold tracking-widest'>k</Text>
						<Text className='text-[#FFDB7E] text-3xl font-bold tracking-widest'>u</Text>
						<Text className='text-[#FFDB7E] text-3xl font-bold tracking-widest'>p</Text>
					</Text>

					<TouchableOpacity onPress={() => navigation.navigate('Search')}>
						<MagnifyingGlassIcon size={30} strokeWidth='2' color='white' />
					</TouchableOpacity>
				</View>
			</SafeAreaView>
			{isLoading ? (
				<Loading />
			) : (
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
					{/* Game carousel */}
					<GameList popularGames={popularGames} />
				</ScrollView>
			)}
			{isLoading ? (
				<Loading />
			) : (
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
					<GenreList genres={genres} />
				</ScrollView>
			)}
		</View>
	)
}

export default HomeScreen
