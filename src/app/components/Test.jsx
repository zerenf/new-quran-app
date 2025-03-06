// import React, { useState } from "react"
// import useQuranStore from "../stores/useQuranStore"

// const Test = () => {
// 	const { searchResult, fetchAllData } = useQuranStore()
// 	const [searchTerm, setSearchTerm] = useState("")
// 	const [error, setError] = useState(false)
// 	const [searchStarted, setSearchStarted] = useState(false) // Arama başlatıldığında true olacak

// 	console.log("searchResult:", searchResult)

// 	const handleFetchAllData = () => {
// 		if (!searchTerm) {
// 			return setError(true)
// 		}
// 		setSearchStarted(true) // Arama başlatıldığında true
// 		fetchAllData()
// 		setError(false)
// 	}

// 	// ✅ Kelimeyi Vurgulayan Fonksiyon
// 	const highlightText = (text, searchTerm) => {
// 		if (!searchTerm) return text

// 		const regex = new RegExp(`(${searchTerm})`, "gi")
// 		const parts = text.split(regex)

// 		return parts.map((part, index) =>
// 			part.toLowerCase() === searchTerm.toLowerCase() ? (
// 				<span key={index} className="bg-yellow-300 text-black font-bold px-1 rounded">
// 					{part}
// 				</span>
// 			) : (
// 				part
// 			)
// 		)
// 	}

// 	// 📌 Ayetlerde kelime arama fonksiyonu
// 	const filteredAyats = Object.values(searchResult)
// 		.flatMap((surah) => surah.ayats)
// 		.filter((ayat) => ayat.ayahText.includes(searchTerm))
// 		.map((ayat) => {
// 			return {
// 				...ayat,
// 			}
// 		})

// 	return (
// 		<div className="flex flex-col items-center gap-4 p-4">
// 			<h1 className="text-3xl font-semibold">TEST</h1>

// 			{/* Arama Kutusu */}
// 			<input
// 				type="text"
// 				placeholder="Kelime ara..."
// 				className="px-4 py-2 border rounded w-80"
// 				value={searchTerm}
// 				onChange={(e) => setSearchTerm(e.target.value)}
// 			/>
// 			{error && <p>Lütfen bir kelime giriniz.</p>}

// 			{/* Verileri çekme butonu */}
// 			<button className="px-6 py-2 border cursor-pointer bg-blue-500 text-white rounded" onClick={handleFetchAllData}>
// 				Verileri Getir
// 			</button>

// 			{/* Sonuçları Göster */}
// 			<div className="mt-4 w-full max-w-2xl">
// 				{searchStarted && filteredAyats?.length === 0 && <p className="text-gray-500">Aradığınız kelimeye uygun ayet bulunamadı.</p>}
// 				{filteredAyats?.length > 0 && searchStarted
// 					? filteredAyats?.map((ayat, index) => (
// 							<div key={index} className="p-4 border rounded my-2">
// 								<p className="text-lg font-bold">
// 									{ayat.surahName} ({ayat.surahNumber}:{ayat.ayahNumber})
// 								</p>
// 								<p className="text-gray-700">{highlightText(ayat.ayahText, searchTerm)}</p>
// 							</div>
// 					  ))
// 					: null}
// 			</div>
// 		</div>
// 	)
// }

// export default Test

import React, { useState } from "react"
import useQuranStore from "../stores/useQuranStore"

const Test = () => {
	const { searchResult, fetchAllData } = useQuranStore()
	const [searchTerm, setSearchTerm] = useState("")
	const [searchedTerm, setSearchedTerm] = useState("") // ✅ Arama işlemi için kullanılan state
	const [error, setError] = useState(false)
	const [searchStarted, setSearchStarted] = useState(false) // Arama başlatıldığında true olacak

	const handleFetchAllData = () => {
		if (!searchTerm) {
			return setError(true)
		}
		setSearchStarted(true)
		setSearchedTerm(searchTerm) // ✅ Butona basınca arama başlasın
		fetchAllData()
		setError(false)
	}

	const highlightText = (text, searchTerm) => {
		if (!searchTerm) return text

		const regex = new RegExp(`(${searchTerm})`, "gi")
		const parts = text.split(regex)

		return parts.map((part, index) =>
			part.toLowerCase() === searchTerm.toLowerCase() ? (
				<span key={index} className="bg-primary text-black font-bold px-1 rounded">
					{part}
				</span>
			) : (
				part
			)
		)
	}

	const filteredAyats = Object.values(searchResult)
		.flatMap((surah) => surah.ayats)
		.filter((ayat) => ayat.ayahText.includes(searchedTerm))
		.map((ayat) => {
			return {
				...ayat,
			}
		})

	return (
		<div className="flex flex-col items-center gap-4 p-4">
			<h1 className="text-3xl font-semibold">TEST</h1>

			{/* Arama Kutusu */}
			<input
				type="text"
				placeholder="Kelime ara..."
				className="px-4 py-2 border rounded w-80"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			{error && <p>Lütfen bir kelime giriniz.</p>}

			{/* Verileri çekme butonu */}
			<button className="px-6 py-2 border cursor-pointer bg-blue-500 text-white rounded" onClick={handleFetchAllData}>
				Verileri Getir
			</button>

			{/* Sonuçları Göster */}
			<div className="mt-4 w-full max-w-2xl">
				{searchStarted && filteredAyats?.length === 0 && <p className="text-gray-500">Aradığınız kelimeye uygun ayet bulunamadı.</p>}
				{filteredAyats?.length > 0 && searchStarted
					? filteredAyats?.map((ayat, index) => (
							<div key={index} className="p-4 border rounded my-2">
								<p className="text-lg font-bold">
									{ayat.surahName} ({ayat.surahNumber}:{ayat.ayahNumber})
								</p>
								<p className="text-gray-700">{highlightText(ayat.ayahText, searchedTerm)}</p>
							</div>
					  ))
					: null}
			</div>
		</div>
	)
}

export default Test
