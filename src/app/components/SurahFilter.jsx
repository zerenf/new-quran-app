"use client"
import { useState } from "react"
import useQuranStore from "../stores/useQuranStore"
import AyahCard from "./AyahCard"
import CustomSelect from "./CustomSelect"
import Spinner from "./Spinner"
import WordCard from "./WordCard"
import { PiArrowFatLineLeftLight, PiArrowFatLineRightLight } from "react-icons/pi"

export default function SurahFilter({ isSidebarOpen }) {
	const [clicked, setClicked] = useState({})
	const [error, setError] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")
	const [searchTerm, setSearchTerm] = useState("")
	const [searchedTerm, setSearchedTerm] = useState("")
	const [searchError, setSearchError] = useState(false)
	const [searchStarted, setSearchStarted] = useState(false)
	const [searchLoading, setSearchLoading] = useState(false)
	const [hasNextAyah, setHasNextAyah] = useState(false)
	const [ayah, setAyah] = useState("")

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

	const copyToClipboard = (text, key) => {
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

		setClicked((prev) => ({ ...prev, [key]: true }))
		setTimeout(() => setClicked((prev) => ({ ...prev, [key]: false })), 1000)
	}

	const handleSearch = async () => {
		setSearchLoading(true)
		setSearchStarted(true)
		setSearchError(false)
		setSelectedAyah(ayah)

		if (searchTerm) {
			setSearchedTerm(searchTerm)

			await fetchAllData()
			setSearchLoading(false)
			setSearchStarted(true)

			return
		}

		setError(null)
		await fetchData(selectedSurah, selectedMeal, selectedAyah)

		setSearchLoading(false)
	}

	let filteredAyats

	if (searchResult?.ayats) {
		filteredAyats = searchResult?.ayats?.filter((ayah) => ayah.ayahText.includes(searchedTerm)).map((ayah) => ({ ...ayah }))
	} else {
		filteredAyats = Object.values(searchResult)
			.flatMap((surah) => surah.ayats)
			.filter((ayat) => ayat.ayahText.includes(searchedTerm))
			.map((ayat) => ({ ...ayat }))
	}

	const handleNextAyah = () => {
		if (selectedAyah < result?.arabic?.arabicResult.length) {
			setSelectedAyah(Number(selectedAyah) + 1)
		}
	}

	const handlePreviousAyah = () => {
		if (selectedAyah > 1) {
			setSelectedAyah(Number(selectedAyah) - 1)
		}
	}

	// console.log("result?.arabic?.arabicResult:", result?.arabic?.arabicResult)
	// console.log("result?.arabic?.arabicResult?.[selectedAyah - 1]:", result?.arabic?.arabicResult?.[selectedAyah - 1])

	// const currentAyah = result?.arabic?.arabicResult?.[selectedAyah - 1]
	// console.log("currentAyah:", currentAyah)
	// console.log("selectedAyah:", selectedAyah)
	console.log("selectedMeal:", selectedMeal)

	return (
		<>
			<div className={`flex ${isSidebarOpen ? "justify-end" : "justify-center"} ${isSidebarOpen ? "mr-20" : ""} mt-40`}>
				<div className="w-auto p-4 bg-white rounded-lg shadow-md filter">
					<h2 className="text-xl sm:text-xl font-semibold text-center text-gray-600 mb-1 ">Detaylı Meal Arama</h2>

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
									setSearchTerm={setSearchTerm}
									handleSearch={handleSearch}
								/>
							</div>

							<div className="ayah-input-container">
								<label className="ayah-label">Ayet Numarası:</label>
								<input
									type="number"
									className="ayah-input"
									value={ayah}
									onChange={(e) => setAyah(e.target.value)}
									onKeyDown={(e) => {
										if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
											e.preventDefault()
										}
									}}
									placeholder="İsteğe bağlı..."
									min={1}
									max={result?.arabic?.arabicResult.length}
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
								{/* {searchError && <p className="text-red-500">Lütfen bir kelime giriniz.</p>} */}
							</div>

							<div style={{ margin: "0px 16px" }}>
								<button
									className="px-7 py-2 border cursor-pointer bg-green hover:bg-green-dark text-white rounded mb-[-12px] w-[100px]"
									onClick={handleSearch}
								>
									Ara
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{error && <p className="text-red-500 text-center mt-2">{error}</p>}
			{errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}

			{loading && <Spinner isSidebarOpen={isSidebarOpen} />}

			<div className="flex justify-center my-10">
				<div className="mt-4 w-full max-w-2xl ml-[35px]">
					{filteredAyats.length > 0 && (
						<div className="mx-2 text-[14px]">
							<span style={{ fontWeight: 900 }}> {searchedTerm} </span>
							kelimesi
							<span style={{ borderBottom: "1px solid #ccc" }}> {selectedMeal} mealine göre</span>
							<span style={{ fontWeight: 900 }}> {selectedSurah ? selectedSurah : "Kur'an'da"}</span>
							{selectedSurah && " suresinin"}
							{selectedSurah && " suresinin"}
							<span style={{ fontWeight: 900 }}> {filteredAyats.length} </span>
							yerde geçmektedir.
						</div>
					)}

					{searchLoading && <p className="text-gray-500"></p>}
					{!searchLoading && searchedTerm && searchStarted && filteredAyats.length === 0 && (
						<p className="text-gray-500 text-center">Aradığınız kelimeyi içeren ayet bulunamadı.</p>
					)}

					{!searchLoading &&
						filteredAyats.length > 0 &&
						filteredAyats.map((ayah, index) => (
							<WordCard
								key={index}
								ayah={ayah}
								mealOwner={mealOwner}
								searchedTerm={searchedTerm || ""}
								clicked={clicked}
								copyToClipboard={copyToClipboard}
							/>
						))}
				</div>
			</div>

			{!loading && result && !error && (
				<div className={`flex ${isSidebarOpen ? "justify-end" : "justify-center"} ${isSidebarOpen ? "mr-20" : ""} cards`}>
					<div className="mb-10">
						{selectedAyah && selectedAyah <= result?.arabic?.arabicResult?.length && (
							<div className="flex justify-center">
								<div className={`w-full max-w-2xl mr-6 text-end`}>
									{selectedAyah > 1 && (
										<button className="border p-1 cursor-pointer" onClick={handlePreviousAyah}>
											<PiArrowFatLineLeftLight />
										</button>
									)}
									{/* İleri butonu sadece son ayette değilse göster */}
									{selectedAyah < result?.arabic?.arabicResult?.length && (
										<button className="border p-1 cursor-pointer ml-2" onClick={handleNextAyah}>
											<PiArrowFatLineRightLight />
										</button>
									)}
								</div>
							</div>
						)}
						{selectedAyah ? (
							selectedAyah <= result?.arabic?.arabicResult?.length ? (
								<AyahCard
									ayah={result.arabic.arabicResult[selectedAyah - 1]}
									meal={result.meal.turkishResult[selectedAyah - 1]}
									surahNumber={result.arabic.surahNumber}
									surahName={result.arabic.surahNameTr}
									copyToClipboard={copyToClipboard}
									clicked={clicked}
									mealOwner={mealOwner}
								/>
							) : (
								<p>Geçersiz ayet numarası.</p>
							)
						) : !searchedTerm ? ( // Eğer searchTerm yoksa çalışsın
							result?.arabic?.arabicResult?.map((ayah, index) => (
								<AyahCard
									key={ayah.ayahNumber}
									ayah={ayah}
									meal={result.meal.turkishResult[index]}
									surahNumber={result.arabic.surahNumber}
									surahName={result.arabic.surahNameTr}
									copyToClipboard={copyToClipboard}
									clicked={clicked}
									mealOwner={mealOwner}
								/>
							))
						) : null}

						{/* {selectedAyah ? (
							selectedAyah <= result?.arabic?.arabicResult?.length ? (
								<AyahCard
									ayah={result.arabic.arabicResult[selectedAyah - 1]}
									meal={result.meal.turkishResult[selectedAyah - 1]}
									surahNumber={result.arabic.surahNumber}
									surahName={result.arabic.surahNameTr}
									copyToClipboard={copyToClipboard}
									clicked={clicked}
									mealOwner={mealOwner}
								/>
							) : (
								<p>Geçersiz ayet numarası.</p>
							)
						) : (
							result?.arabic?.arabicResult?.map((ayah, index) => (
								<AyahCard
									key={ayah.ayahNumber}
									ayah={ayah}
									meal={result.meal.turkishResult[index]}
									surahNumber={result.arabic.surahNumber}
									surahName={result.arabic.surahNameTr}
									copyToClipboard={copyToClipboard}
									clicked={clicked}
									mealOwner={mealOwner}
								/>
							))
						)} */}
					</div>
				</div>
			)}
		</>
	)
}
