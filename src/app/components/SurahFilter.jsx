"use client"
import { useState, useEffect } from "react"
import useQuranStore from "../stores/useQuranStore"
import AyahCard from "./AyahCard"
import CustomSelect from "./CustomSelect"
import Spinner from "./Spinner"

export default function SurahFilter({ isSidebarOpen }) {
	const [clicked, setClicked] = useState({})
	const [error, setError] = useState(null)
	const [searchTerm, setSearchTerm] = useState("")
	const [searchedTerm, setSearchedTerm] = useState("")
	const [searchError, setSearchError] = useState(false)
	const [searchStarted, setSearchStarted] = useState(false)
	const [searchLoading, setSearchLoading] = useState(false)

	const {
		fetchData,
		selectedSurah,
		selectedAyah,
		selectedMeal,
		setSelectedSurah,
		setSelectedAyah,
		setSelectedMeal,
		result,
		mealOwner,
		loading,
		searchResult,
		fetchAllData,
		mealsOwners,
	} = useQuranStore()

	// Sure isimleri dizisi
	const surahNames = [
		"Fâtiha",
		"Bakara",
		"Âl-i İmran",
		"Nisâ",
		"Mâide",
		"En'âm",
		"A'râf",
		"Enfâl",
		"Tevbe",
		"Yûnus",
		"Hûd",
		"Yûsuf",
		"Ra'd",
		"İbrâhîm",
		"Hicr",
		"Nahl",
		"İsrâ",
		"Kehf",
		"Meryem",
		"Tâ-Hâ",
		"Enbiyâ",
		"Hac",
		"Mü'minûn",
		"Nûr",
		"Furkân",
		"Şuarâ",
		"Neml",
		"Kasas",
		"Ankebût",
		"Rûm",
		"Lokmân",
		"Secde",
		"Ahzâb",
		"Sebe'",
		"Fâtır",
		"Yâsin",
		"Sâffât",
		"Sâd",
		"Zümer",
		"Mü'min",
		"Fussilet",
		"Şûrâ",
		"Zuhruf",
		"Duhân",
		"Câsiye",
		"Ahkâf",
		"Muhammed",
		"Fetih",
		"Hucurât",
		"Kâf",
		"Zâriyât",
		"Tûr",
		"Necm",
		"Kamer",
		"Rahmân",
		"Vâkıa",
		"Hadîd",
		"Mücâdele",
		"Haşr",
		"Mümtehine",
		"Saff",
		"Cum'a",
		"Münâfikûn",
		"Teğabün",
		"Talâk",
		"Tahrîm",
		"Mülk",
		"Kalem",
		"Hâkka",
		"Meâric",
		"Nûh",
		"Cin",
		"Müzzemmil",
		"Müddessir",
		"Kıyamet",
		"İnsan",
		"Mürselât",
		"Nebe'",
		"Nâziât",
		"Abese",
		"Tekvîr",
		"İnfitâr",
		"Mutaffifîn",
		"İnşikâk",
		"Bürûc",
		"Târık",
		"A'lâ",
		"Ğâşiye",
		"Fecr",
		"Beled",
		"Şems",
		"Leyl",
		"Duhâ",
		"İnşirâh",
		"Tîn",
		"Alak",
		"Kadir",
		"Beyyine",
		"Zilzâl",
		"Adiyât",
		"Kâria",
		"Tekâsür",
		"Asr",
		"Hümeze",
		"Fîl",
		"Kureyş",
		"Mâûn",
		"Kevser",
		"Kâfirûn",
		"Nasr",
		"Tebbet",
		"İhlâs",
		"Felâk",
		"Nâs",
	]

	// const mealMap = {
	// 	"ali-bulac": "Ali Bulaç",
	// 	"abdulbaki-golpinarli": "Abdulbakî Gölpınarlı",
	// 	"diyanet-isleri": "Diyanet İşleri",
	// 	"diyanet-vakfi": "Diyanet Vakfı",
	// 	"elmalili-hamdi": "Elmalılı Hamdi Yazır",
	// 	"suat-yildirim": "Suat Yıldırım",
	// 	"suleyman-ates": "Süleyman Ateş",
	// }

	// Kopyalama işlemi için fonksiyon
	const copyToClipboard = (text, ayahNumber) => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text).catch((err) => console.error("Clipboard API error:", err))
		} else {
			const textArea = document.createElement("textarea")
			textArea.value = text
			document.body.appendChild(textArea)
			textArea.select()
			try {
				document.execCommand("copy")
			} catch (err) {
				console.error("Kopyalama başarısız:", err)
			}
			document.body.removeChild(textArea)
		}

		setClicked((prev) => ({ ...prev, [ayahNumber]: true }))
		setTimeout(() => setClicked((prev) => ({ ...prev, [ayahNumber]: false })), 2000)
	}

	const handleFetchAllData = async () => {
		setSearchLoading(true)
		setSearchStarted(true)
		if (!searchTerm) {
			return setSearchError(true)
		}
		setSearchError(false)
		setSearchedTerm(searchTerm)

		await fetchAllData()
		setSearchLoading(false)
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

	useEffect(() => {
		// if (!selectedSurah) return

		setError(null)
		fetchData(selectedSurah, selectedMeal, selectedAyah).catch((err) => {
			if (err?.error === "Geçersiz ayet numarası!") {
				setError("Ayet bulunamadı!")
			} else {
				setError("Bir hata oluştu. Lütfen tekrar deneyin.")
			}
		})
	}, [selectedSurah, selectedMeal, selectedAyah])

	// console.log("selectedSurah:", selectedSurah)
	console.log("selectedMeal:", selectedMeal)

	return (
		<>
			<div className={`flex ${isSidebarOpen ? "justify-end" : "justify-center"} ${isSidebarOpen ? "mr-20" : ""} mt-28`}>
				<div className="w-auto p-4 bg-white rounded-lg shadow-md filter">
					<h2 className="text-xl sm:text-xl font-semibold text-center text-gray-800 mb-1 ">Detaylı Meal Arama</h2>

					<div className="filter-container">
						<div className="content">
							<div style={{ margin: "0px 16px" }}>
								<p style={{ fontSize: 14, marginBottom: -10 }}>Sure:</p>

								<CustomSelect options={surahNames} selected={selectedSurah} setSelected={setSelectedSurah} placeholder="Bir sure seçin" />
							</div>

							<div style={{ margin: "0px 16px" }}>
								<p style={{ fontSize: 14, marginBottom: -10 }}>Meal:</p>

								<CustomSelect
									options={mealsOwners}
									selected={selectedMeal}
									setSelected={setSelectedMeal}
									setSearchLoading={setSearchLoading}
									placeholder="Opsiyonel"
								/>
							</div>

							<div className="ayah-input-container">
								<label className="ayah-label">Ayet Numarası:</label>
								<input
									type="number"
									className="ayah-input"
									value={selectedAyah}
									onChange={(e) => setSelectedAyah(e.target.value)}
									placeholder="İsteğe bağlı..."
								/>
							</div>

							<div className="ayah-input-container">
								<label className="ayah-label">Kelime:</label>
								<input
									type="text"
									className="ayah-input"
									value={searchTerm}
									placeholder="Kelime ara..."
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								{searchError && <p className="text-red-500">Lütfen bir kelime giriniz.</p>}
							</div>

							<div style={{ margin: "0px 16px" }}>
								<button
									className="px-7 py-2 border cursor-pointer bg-green hover:bg-green-dark text-white rounded mb-[-12px] w-[100px]"
									onClick={handleFetchAllData}
								>
									Ara
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Arama Sonuçları */}
			<div className="flex justify-center my-10">
				<div className="mt-4 w-full max-w-2xl ml-[35px]">
					{searchLoading && <p className="text-gray-500"></p>}
					{!searchLoading && searchStarted && filteredAyats.length === 0 && (
						<p className="text-gray-500">Aradığınız kelimeye uygun ayet bulunamadı.</p>
					)}
					{!searchLoading &&
						filteredAyats.length > 0 &&
						filteredAyats.map((ayat, index) => (
							<div key={index} className="my-4 mx-3 p-2 bg-white rounded-xl max-w-3xl min-w-[315px]">
								<div className="w-full h-0.5 bg-green-dark opacity-30 my-3 rounded-full"></div>

								{/* Meal */}
								<div className="flex flex-col sm:flex-row items-start mt-2">
									<div className="flex flex-col">
										<p className="text-[14px] text-gray-500"> {mealOwner} </p>
										<p className="xs:leading-[35px] text-left text-[14px] sm:text-lg max-w-[600px]">
											{highlightText(ayat.ayahText, searchedTerm)}
										</p>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>

			{error && <p className="text-red-500">{error}</p>}

			{loading && <Spinner isSidebarOpen={isSidebarOpen} />}

			{!loading && result && !error && (
				<div className={`flex justify-center ${isSidebarOpen ? "justify-end" : "justify-center"} ${isSidebarOpen ? "mr-20" : ""} cards`}>
					<div className="my-10">
						{/* Eğer sadece tek bir ayet geldiyse doğrudan göster */}
						{result?.arabic?.arabicResult?.ayahText ? (
							<AyahCard
								ayah={result.arabic.arabicResult}
								meal={result.meal.turkishResult}
								surahNumber={result.arabic.surahNumber}
								copyToClipboard={copyToClipboard}
								clicked={clicked}
								mealOwner={mealOwner}
							/>
						) : (
							// Eğer tüm sure geldiyse map ile dön
							result?.arabic?.arabicResult?.map((ayah, index) => (
								<AyahCard
									key={ayah.ayahNumber}
									ayah={ayah}
									meal={result.meal.turkishResult[index]}
									surahNumber={result.arabic.surahNumber}
									copyToClipboard={copyToClipboard}
									clicked={clicked}
									mealOwner={mealOwner}
								/>
							))
						)}
					</div>
				</div>
			)}
		</>
	)
}
