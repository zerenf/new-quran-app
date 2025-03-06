"use client"
import { useState, useEffect } from "react"
import useQuranStore from "../stores/useQuranStore"
import AyahCard from "./AyahCard"
import CustomSelect from "./CustomSelect"
import Spinner from "./Spinner"

export default function SurahFilter({ isSidebarOpen }) {
	const [clicked, setClicked] = useState({})
	const [error, setError] = useState(null)
	// const [loading, setLoading] = useState(true)

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

	const mealMap = {
		"ali-bulac": "Ali Bulaç",
		"abdulbaki-golpinarli": "Abdulbakî Gölpınarlı",
		"diyanet-isleri": "Diyanet İşleri",
		"diyanet-vakfi": "Diyanet Vakfı",
		"elmalili-hamdi": "Elmalılı Hamdi Yazır",
		"suat-yildirim": "Suat Yıldırım",
		"suleyman-ates": "Süleyman Ateş",
	}

	console.log("mealOwner:", mealOwner)
	console.log("selectedMeal:", selectedMeal)

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
				console.error("Failed to copy text:", err)
			}
			document.body.removeChild(textArea)
		}

		setClicked((prev) => ({ ...prev, [ayahNumber]: true }))
		setTimeout(() => setClicked((prev) => ({ ...prev, [ayahNumber]: false })), 2000)
	}

	useEffect(() => {
		if (!selectedSurah) return // Kullanıcı sure adı girene kadar istek atma

		setError(null) // Yeni istek öncesi hatayı sıfırla
		fetchData(selectedSurah, selectedMeal, selectedAyah).catch((err) => {
			if (err?.error === "Geçersiz ayet numarası!") {
				setError("Ayet bulunamadı!")
			} else {
				setError("Bir hata oluştu. Lütfen tekrar deneyin.")
			}
		})
	}, [selectedSurah, selectedMeal, selectedAyah])

	// useEffect(()=> {
	// 	fetchData()
	// })

	// console.log("result?.arabic?.arabicResult:", result?.arabic?.arabicResult)
	// console.log("selectedSurah:", selectedSurah)
	// console.log("result?.arabic?:", result?.arabic)
	// console.log("result?.arabic?.arabicResult:", result?.arabic?.arabicResult)

	return (
		<>
			<div className={`flex ${isSidebarOpen ? "justify-end" : "justify-center"} ${isSidebarOpen ? "mr-20" : ""} mt-24`}>
				<div className="w-auto mx-3 p-3  bg-white rounded-lg shadow-md filter">
					<h2 className="text-xl sm:text-xl font-semibold text-center text-gray-800 mb-1 ">Meal Ara</h2>

					<div className="filter-container">
						<div className="content">
							<div style={{ margin: "0px 16px" }}>
								<p style={{ fontSize: 14, marginBottom: -10 }}>Sure:</p>

								<CustomSelect options={surahNames} selected={selectedSurah} setSelected={setSelectedSurah} placeholder="Bir sure seçin" />
							</div>

							<div style={{ margin: "0px 16px" }}>
								<p style={{ fontSize: 14, marginBottom: -10 }}>Meal:</p>

								<CustomSelect options={Object.values(mealMap)} selected={mealOwner} setSelected={setSelectedMeal} placeholder="Opsiyonel" />
							</div>

							<div className="ayah-input-container">
								<label className="ayah-label">Ayet Numarası:</label>
								<input
									type="number"
									className="ayah-input"
									value={selectedAyah}
									onChange={(e) => setSelectedAyah(e.target.value)}
									placeholder="Opsiyonel"
								/>
							</div>

							{/* <div className="ayah-input-container">
								<label className="ayah-label">Kelime Ara:</label>
								<input
									type="text"
									className="ayah-input"
									value={selectedAyah}
									onChange={(e) => setSelectedAyah(e.target.value)}
									placeholder="Kelime ara..."
								/>
							</div> */}
						</div>

						{/* <div className="text-center mt-3">
							<button className="search-button" onClick={() => fetchData(selectedSurah, selectedMeal, selectedAyah)}>
								Ara
							</button>
						</div> */}
					</div>
				</div>
			</div>

			{error && <p className="text-red-500">{error}</p>}

			{loading && <Spinner />}

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
