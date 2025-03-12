"use client"

import React, { useEffect } from "react"
import useQuranStore from "../stores/useQuranStore"

const SurahCard = ({ surah, toggleSidebar }) => {
	const {
		selectedSurahNumber,
		setSelectedSurahNumber,
		fetchMeals,
		meals,
		selectedSurah,
		setSelectedSurah,
		setSelectedAyah,
		fetchData,
		result,
		selectedMeal,
	} = useQuranStore()
	// console.log("surah.name:", surah.name)

	const handleFetchSurah = () => {
		setSelectedSurah(surah.name)
		fetchData(surah.name, selectedMeal)
	}

	// console.log("result:", result)
	// console.log("selectedSurah:", selectedSurah)

	return (
		<div
			className="bg-white flex items-center p-4 h-[70px] m-5 rounded-lg cursor-pointer border-2 border-white hover:border-2 hover:border-green transition duration-500"
			onClick={() => {
				handleFetchSurah(), setSelectedSurah(surah.name), toggleSidebar(), setSelectedAyah("")
			}}
		>
			<div className="flex-shrink-0 w-9 h-9 bg-[#9AA6B2] rounded-full flex items-center justify-center text-white font-medium">
				{surah.number}
			</div>
			<div className="ml-4 flex-1">
				<h3 className="text-sm font-medium text-gray-800">{surah.name}</h3>
				<p className="text-xs text-gray-500"> {surah.totalNumber} </p>
			</div>
			<div className="text-sm text-gray-500">{surah.originType}</div>
		</div>
	)
}

export default SurahCard
