"use client"

import { useEffect } from "react"
import useQuranStore from "../stores/useQuranStore"

export default function QuranSearch() {
	const {
		selectedSurah,
		selectedAyah,
		result,
		error,
		setSelectedSurah,
		setSelectedAyah,
		setResult,
		setError,
		fetchQuranData,
		fetchMeals,
		meals,
		selectedMeal,
		setSelectedMeal,
		fetchSingleMeal,
		selectedMealData,
	} = useQuranStore()

	const handleSurahChange = (e) => setSelectedSurah(e.target.value)
	const handleAyahChange = (e) => setSelectedAyah(e.target.value)

	const mealMap = {
		"ali-bulac": "Ali Bulaç",
		"abdulbaki-golpinarli": "Abdulbakî Gölpınarlı",
		"diyanet-isleri": "Diyanet İşleri",
		"diyanet-vakfi": "Diyanet Vakfı",
		"elmalili-hamdi": "Elmalılı Hamdi Yazır",
		"suat-yildirim": "Suat Yıldırım",
		"suleyman-ates": "Süleyman Ateş",
	}

	const handleMealChange = (e) => {
		const { value } = e.target
		setSelectedMeal(value)
	}
	// console.log("selectedMeal:", selectedMeal)

	const handleFetchSingleMeal = () => {
		fetchSingleMeal(selectedMeal, selectedAyah)
	}

	// console.log("selectedSurah:", selectedSurah)
	// console.log("selectedAyah:", selectedAyah)

	const handleFetchQuranData = () => {
		fetchQuranData()
	}

	// console.log("selectedMealData:", selectedMealData)

	const handleClick = () => {
		fetchSingleMeal("ali-bulac")
	}
	// console.log("meals[selectedMeal][selectedSurah]:", meals[selectedMeal]?.[selectedSurah - 1]["ayats"][selectedAyah - 1])

	// console.log("selectedSurah", selectedSurah)
	// console.log("selectedMealData[selectedSurah]", selectedMealData?.[selectedSurah - 1])

	return (
		<div className="p-4 max-w-md mx-auto border rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-4">Kur'an-ı Kerim Arama</h2>
			<input
				type="number"
				placeholder="Sure Numarası"
				value={selectedSurah}
				onChange={handleSurahChange}
				className="w-full p-2 mb-2 border rounded"
			/>
			<input
				type="number"
				placeholder="Ayet Numarası (Opsiyonel)"
				value={selectedAyah}
				onChange={handleAyahChange}
				className="w-full p-2 mb-2 border rounded"
			/>
			<select value={selectedMeal} onChange={handleMealChange} className="w-full p-2 mb-2 border rounded">
				<option value="">{selectedMeal ? mealMap[selectedMeal] : "Meal seçiniz"}</option>

				{Object.keys(mealMap)
					.sort()
					.map((mealCode) => (
						<option key={mealCode} value={mealCode}>
							{mealMap[mealCode]}
						</option>
					))}
			</select>

			<button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" onClick={handleFetchSingleMeal}>
				Ara
			</button>
			<button className="border-2 p-4" onClick={handleClick}>
				tıkla
			</button>

			{error && <p className="text-red-500 mt-2">Hata: {error}</p>}

			{/* <p>
				{selectedMealData?.["ayahNumber"]}: {selectedMealData?.["ayahText"]}
			</p> */}

			{/* {result && (
				<>
					{result.ayah?.ayahNumber ? (
						<div className="mt-4 p-2 border rounded bg-gray-100">
							<div className="flex justify-between items-center my-2">
								<p className="whitespace-nowrap">
									{result?.surahNumber} : {result?.ayah?.ayahNumber}
								</p>
								<h3 className="font-arabic text-lg text-right leading-[35px]">{result?.ayah?.ayahText}</h3>
							</div>
						</div>
					) : (
						result?.ayats?.length > 0 && (
							<div className="mt-4 p-2 border rounded bg-gray-100">
								{result.ayats.map((ayah, index) => (
									<div key={index} className="my-2 flex justify-between items-center">
										<p className="whitespace-nowrap">
											{result.surahNumber} : {ayah?.ayahNumber}
										</p>
										<p className="font-arabic text-right">{ayah?.ayahText}</p>
									</div>
								))}
							</div>
						)
					)}
				</>
			)} */}

			{selectedMealData?.surahNumber ? (
				selectedMealData["ayats"].map((ayah, index) => (
					<p key={index}>
						{ayah.ayahNumber}: {ayah.ayahText}
					</p> // Doğrudan ayahText alınmalı!
				))
			) : (
				<p>
					{selectedMealData?.ayahNumber}: {selectedMealData?.ayahText}
				</p>
			)}
		</div>
	)
}
