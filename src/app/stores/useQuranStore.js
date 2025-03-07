import { create } from "zustand"
import axios from "axios"

const useQuranStore = create((set, get) => ({
	selectedSurah: "",
	selectedAyah: "",
	result: [],
	error: null,
	selectedMeal: "diyanet-isleri",
	mealOwner: "Diyanet İşleri",
	selectedMealData: null,
	clicked: {},
	surahNumber: "",
	loading: false, // Loading durumu eklendi

	mealMap: {
		"ali-bulac": "Ali Bulaç",
		"abdulbaki-golpinarli": "Abdulbakî Gölpınarlı",
		"diyanet-isleri": "Diyanet İşleri",
		"diyanet-vakfi": "Diyanet Vakfı",
		"elmalili-hamdi-yazir": "Elmalılı Hamdi Yazır",
		"suleyman-ates": "Süleyman Ateş",
	},

	setSelectedMeal: (selectedMeal) => {
		const { mealMap } = get()
		const mealOwner = mealMap[selectedMeal] || "Bilinmeyen Meal"
		set({ selectedMeal, mealOwner })
	},

	setSelectedSurah: (selectedSurah) => set({ selectedSurah }),
	setSelectedAyah: (selectedAyah) => set({ selectedAyah }),
	setResult: (result) => set({ result }),
	setError: (error) => set({ error }),
	setSelectedMealData: (selectedMealData) => set({ selectedMealData }),
	setLoading: (loading) => set({ loading }), // Loading state'i setleme fonksiyonu

	setClicked: (ayahNumber, status) =>
		set((state) => ({
			clicked: { ...state.clicked, [ayahNumber]: status },
		})),

	setSurahNumber: (surahNumber) => set({ surahNumber }),

	fetchData: async (surahName, meal, ayah) => {
		const { setError, setResult, setSurahNumber, setLoading, setSelectedMeal } = get()

		if (!surahName) return

		const formattedSurahName = surahName
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/â/g, "a")
			.replace(/î/g, "i")
			.replace(/û/g, "u")
			.replace(/ğ/g, "g")
			.replace(/ü/g, "u")
			.replace(/ş/g, "s")
			.replace(/ı/g, "i")
			.replace(/ö/g, "o")
			.replace(/ç/g, "c")
			.replace(/-i-/g, "i-")
			.replace(/[^a-z0-9]/g, "")

		const formattedMealName = meal
			.replace(/\s+/g, "-")
			.toLowerCase()
			.replace(/â/g, "a")
			.replace(/î/g, "i")
			.replace(/û/g, "u")
			.replace(/ğ/g, "g")
			.replace(/ü/g, "u")
			.replace(/ş/g, "s")
			.replace(/ı/g, "i")
			.replace(/ö/g, "o")
			.replace(/ç/g, "c")
			.replace(/[^a-z0-9-]/g, "")

		setSelectedMeal(formattedMealName)

		let url = `/api/search/${formattedSurahName}?meal=${formattedMealName || "diyanet-isleri"}`
		if (ayah) {
			url += `&ayah=${ayah}`
		}

		try {
			setLoading(true) // Veri çekme başlamadan önce yükleniyor durumuna al
			const { data } = await axios.get(url)
			if (data.success) {
				setResult(data.result)
				setError(null)
			} else {
				setError(data.error)
			}
		} catch (err) {
			setError("Veri çekilirken hata oluştu")
		} finally {
			setLoading(false) // İşlem tamamlandığında yükleniyor durumunu kaldır
		}
	},

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

		set((state) => ({
			clicked: { ...state.clicked, [ayahNumber]: true },
		}))

		setTimeout(() => {
			set((state) => ({
				clicked: { ...state.clicked, [ayahNumber]: false },
			}))
		}, 2000)
	},
}))

export default useQuranStore
