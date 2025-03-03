"use client"
import { useState, useEffect } from "react"
import axios from "axios"

export default function SurahFilter() {
	const [surahName, setSurahName] = useState("")
	const [meal, setMeal] = useState("diyanet-isleri")
	const [ayah, setAyah] = useState("")
	const [result, setResult] = useState(null)
	const [error, setError] = useState(null)

	const fetchData = async () => {
		if (!surahName) return

		let url = `/api/search/${surahName}?meal=${meal}`
		if (ayah) {
			url += `&ayah=${ayah}`
		}

		try {
			const { data } = await axios.get(url)
			if (data.success) {
				setResult(data.result)
				setError(null)
			} else {
				setError(data.error)
			}
		} catch (err) {
			setError("Veri çekilirken hata oluştu")
		}
	}

	const handleFetchData = () => {
		fetchData()
	}

	// useEffect(() => {
	// 	fetchData()
	// }, [surahName, meal, ayah])

	return (
		<div>
			<h2>Sure Filtreleme</h2>
			<label>Sure Adı:</label>
			<input type="text" value={surahName} onChange={(e) => setSurahName(e.target.value)} placeholder="Örneğin: Al-Fatiha" />

			<label>Meal:</label>
			<input type="text" value={meal} onChange={(e) => setMeal(e.target.value)} placeholder="Örneğin: Diyanet" />

			<label>Ayet Numarası:</label>
			<input type="number" value={ayah} onChange={(e) => setAyah(e.target.value)} placeholder="Opsiyonel" />

			<button className="border-2 border-white mx-5 py-1.5 px-3" onClick={handleFetchData}>
				ara
			</button>

			{error && <p style={{ color: "red" }}>{error}</p>}

			{result && (
				<div>
					<h3>Sonuç:</h3>
					{ayah ? (
						<p>
							<strong>Ayet {result.meal.ayahNumber}:</strong> {result.meal.ayahText}
							<br />
							<strong>Arabic:</strong> {result.arabic.ayahText}
						</p>
					) : (
						<ul>
							{result.meal.map((item, index) => (
								<li key={index}>
									<strong>Ayet {item.ayahNumber}:</strong> {item.ayahText}
									<br />
									<strong>Arabic:</strong> {result.arabic[index].ayahText}
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	)
}
