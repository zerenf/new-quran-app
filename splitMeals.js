import { promises as fs } from "fs"
import path from "path"

async function splitMeals() {
	// 'data/meals' klasöründeki tüm meal dosyalarını alıyoruz
	const mealsDir = path.join(process.cwd(), "src", "data", "all-meals")
	const mealFiles = await fs.readdir(mealsDir)

	// Her bir meal dosyası için işlemi yapıyoruz
	for (const file of mealFiles) {
		const filePath = path.join(mealsDir, file)

		// Dosyayı okuyoruz
		const data = await fs.readFile(filePath, "utf-8")

		// JSON verisini parse ediyoruz
		const meals = JSON.parse(data)

		// Meal adını dosya adından alıyoruz (örneğin: diyanet-isler.json)
		const mealName = path.basename(file, ".json")

		// Her meal içindeki her surayı ayrı bir dosya olarak kaydediyoruz
		for (const surahName in meals) {
			const surahData = meals[surahName]

			// Surenin adını küçük harflere çevirip Türkçe karakterleri kaldırıyoruz
			const surahKey = surahName
				.toLowerCase()
				.replace(/[^a-z0-9-]/g, "")
				.replace(/ğ/g, "g")
				.replace(/ü/g, "u")
				.replace(/ş/g, "s")
				.replace(/ı/g, "i")
				.replace(/ö/g, "o")
				.replace(/ç/g, "c")

			// Yeni JSON objesini oluşturuyoruz
			const newSurahData = {
				[surahKey]: {
					surahNumber: surahData.surahNumber,
					surahNameTr: surahData.surahName,
					ayats: surahData.ayats,
				},
			}

			// Yeni JSON dosyasının kaydedileceği yol
			const surahFilePath = path.join(process.cwd(), "src", "data", "splited-meals3", mealName, `${surahKey}.json`)

			// Eğer meal içindeki folder yoksa, oluşturuyoruz
			await fs.mkdir(path.dirname(surahFilePath), { recursive: true })

			// Surayı JSON dosyası olarak kaydediyoruz
			await fs.writeFile(surahFilePath, JSON.stringify(newSurahData, null, 2), "utf-8")
		}

		console.log(`${mealName} mealinin tüm sureleri başarıyla ayrıldı.`)
	}
}

splitMeals().catch((err) => {
	console.error("Hata:", err)
})
