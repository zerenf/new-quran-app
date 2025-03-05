"use client"

import React from "react"
import useQuranStore from "../stores/useQuranStore"

const SurahCard = ({ surah }) => {
	const { selectedSurahNumber, setSelectedSurahNumber, fetchMeals, meals } = useQuranStore()

	return (
		<div
			className="bg-white flex items-center p-4 h-[70px] m-5 rounded-lg cursor-pointer border-2 border-white hover:border-2 hover:border-green transition duration-500"
			onClick={() => {
				setSelectedSurahNumber(surah.number), fetchMeals()
			}}
		>
			<div className="flex-shrink-0 w-9 h-9 bg-green rounded-full flex items-center justify-center text-white font-medium">
				{surah.number}
			</div>
			<div className="ml-4 flex-1">
				<h3 className="text-sm font-medium text-gray-800">{surah.name}</h3>
				<p className="text-xs text-gray-500">7 Ayet</p>
			</div>
			<div className="text-sm text-gray-500">Mekke</div>
		</div>
	)
}

export default SurahCard
