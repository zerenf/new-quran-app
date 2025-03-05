import { create } from "zustand"
import axios from "axios"

const useQuranStore = create((set, get) => ({
	selectedSurah: "",
	selectedAyah: "",
	result: [],
	error: null,
	selectedMeal: "", // Seçilen meal anahtarı
	mealOwner: "Diyanet İşleri", // Meal sahibinin adı
	selectedMealData: null,
	clicked: {},
	surahNumber: "",

	// mealMap objesi
	mealMap: {
		"ali-bulac": "Ali Bulaç",
		"abdulbaki-golpinarli": "Abdulbakî Gölpınarlı",
		"diyanet-isleri": "Diyanet İşleri",
		"diyanet-vakfi": "Diyanet Vakfı",
		"elmalili-hamdi": "Elmalılı Hamdi Yazır",
		"suat-yildirim": "Suat Yıldırım",
		"suleyman-ates": "Süleyman Ateş",
	},

	// selectedMeal değiştiğinde mealOwner'ı güncelle
	setSelectedMeal: (selectedMeal) => {
		const { mealMap } = get()
		const mealOwner = mealMap[selectedMeal] || "Bilinmeyen Meal" // mealMap'ten meal sahibini bul
		set({ selectedMeal, mealOwner }) // Hem selectedMeal hem de mealOwner'ı güncelle
	},

	setSelectedSurah: (selectedSurah) => set({ selectedSurah }),
	setSelectedAyah: (selectedAyah) => set({ selectedAyah }),
	setResult: (result) => set({ result }),
	setError: (error) => set({ error }),
	setSelectedMealData: (selectedMealData) => set({ selectedMealData }),

	setClicked: (ayahNumber, status) =>
		set((state) => ({
			clicked: { ...state.clicked, [ayahNumber]: status },
		})),

	setSurahNumber: (surahNumber) => set({ surahNumber }),

	fetchData: async (surahName, meal, ayah) => {
		const { setError, setResult, setSurahNumber } = get()

		if (!surahName) return

		// Sure ismini backend'in beklediği formata dönüştürme
		const formattedSurahName = surahName
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/â/g, "a") // â -> a
			.replace(/î/g, "i") // î -> i
			.replace(/û/g, "u") // û -> u
			.replace(/ğ/g, "g") // ğ -> g
			.replace(/ü/g, "u") // ü -> u
			.replace(/ş/g, "s") // ş -> s
			.replace(/ı/g, "i") // ı -> i
			.replace(/ö/g, "o") // ö -> o
			.replace(/ç/g, "c") // ç -> c
			.replace(/[^a-z0-9-]/g, "") // Diğer tüm karakterleri, tireyi hariç tutarak temizle

		const formattedMealName = meal
			.replace(/\s+/g, "-")
			.toLowerCase()
			.replace(/â/g, "a") // â -> a
			.replace(/î/g, "i") // î -> i
			.replace(/û/g, "u") // û -> u
			.replace(/ğ/g, "g") // ğ -> g
			.replace(/ü/g, "u") // ü -> u
			.replace(/ş/g, "s") // ş -> s
			.replace(/ı/g, "i") // ı -> i
			.replace(/ö/g, "o") // ö -> o
			.replace(/ç/g, "c") // ç -> c
			.replace(/[^a-z0-9-]/g, "")

		let url = `/api/search/${formattedSurahName}?meal=${formattedMealName || "diyanet-isleri"}`
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
	},

	// Kopyalama işlemi
	copyToClipboard: (text, ayahNumber) => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text).catch((err) => {
				console.error("Clipboard API error:", err)
			})
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

		// Kopyalama durumunu güncelle
		set((state) => ({
			clicked: { ...state.clicked, [ayahNumber]: true },
		}))

		// 2 saniye sonra kopyalama durumunu sıfırla
		setTimeout(() => {
			set((state) => ({
				clicked: { ...state.clicked, [ayahNumber]: false },
			}))
		}, 2000)
	},
}))

export default useQuranStore
