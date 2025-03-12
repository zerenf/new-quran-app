import { create } from "zustand"
import axios from "axios"
import { result } from "lodash"

const useQuranStore = create((set, get) => ({
	selectedSurah: "",
	selectedAyah: "",
	result: [],
	error: null,
	selectedMeal: "Diyanet İşleri",
	mealOwner: "Diyanet İşleri",
	selectedMealData: null,
	clicked: {},
	surahNumber: "",
	loading: false,
	searchResult: [],

	mealsOwners: ["Ali Bulaç", "Abdulbakî Gölpınarlı", "Diyanet İşleri", "Diyanet Vakfı", "Elmalılı Hamdi Yazır", "Süleyman Ateş"],
	setSelectedMeal: (selectedMeal) => {
		set({ selectedMeal, mealOwner: selectedMeal })
	},

	setMealOwner: (mealOwner) => {
		set({ mealOwner })
	},

	setSelectedSurah: (selectedSurah) => set({ selectedSurah }),
	setSelectedAyah: (selectedAyah) => set({ selectedAyah }),
	setResult: (result) => set({ result }),
	setError: (error) => set({ error }),
	setSelectedMealData: (selectedMealData) => set({ selectedMealData }),
	setLoading: (loading) => set({ loading }),

	setClicked: (ayahNumber, status) =>
		set((state) => ({
			clicked: { ...state.clicked, [ayahNumber]: status },
		})),

	setSurahNumber: (surahNumber) => set({ surahNumber }),
	setSearchResult: (searchResult) => set({ searchResult }),

	fetchData: async (surahName, meal, ayah) => {
		const { setError, result, setResult, setSurahNumber, setLoading, setSelectedMeal, selectedMeal } = get()

		if (!surahName) {
			// Eğer sure seçilmediyse, sadece meal seçimini güncelle
			setSelectedMeal(meal)
			return
		}

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

		let url = `/api/search/${formattedSurahName}?meal=${formattedMealName || "diyanet-isleri"}`
		// if (ayah) {
		// 	url += `&ayah=${ayah}`
		// }

		try {
			setLoading(true)
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
			setLoading(false)
		}
	},

	fetchAllData: async () => {
		const { selectedMeal, setSearchResult, setLoading, setError, setSelectedMeal, selectedSurah } = get()

		const formattedSurahName = selectedSurah
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

		const formattedMealName = selectedMeal
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

		console.log("formattedMealName:", formattedMealName)

		let url = `/api/meals/${formattedMealName || "diyanet-isleri"}?surah=${formattedSurahName}`

		try {
			setLoading(true)

			const { data } = await axios.get(url)
			if (data.success) {
				setSearchResult(data.data)
				// console.log("data.data:", data.data)
				setError(null)
			} else {
				setError(data.error)
			}
		} catch (error) {
			setError("Veri çekilirken hata oluştu")
		} finally {
			setLoading(false)
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
