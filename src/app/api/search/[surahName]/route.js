import { readFile } from "fs/promises"
import { NextResponse } from "next/server"
import path from "path"

export async function GET(req, { params }) {
	const { surahName } = await params
	const searchParams = req.nextUrl.searchParams

	const ayah = searchParams.get("ayah")
	const meal = searchParams.get("meal")

	const arabicFilePath = path.join(process.cwd(), "src", "data", "surahs", `${surahName}.json`)

	const mealFilePath = path.join(process.cwd(), "src", "data", "splited-meals", `${meal}`, `${surahName}.json`)

	try {
		const mealData = JSON.parse(await readFile(mealFilePath, "utf-8"))
		const turkishAyats = mealData[surahName].ayats

		const arabicData = JSON.parse(await readFile(arabicFilePath, "utf-8"))
		const arabichAyats = arabicData[surahName].ayats

		let turkishResult
		let arabicResult
		let finalResult

		if (ayah) {
			if (ayah > turkishAyats.length || ayah > arabichAyats.length) {
				return NextResponse.json({ success: false, error: "Geçersiz ayet numarası!" })
			}

			const turkishAyah = turkishAyats.find((a) => a.ayahNumber === String(ayah))
			turkishResult = turkishAyah

			const arabicAyah = arabichAyats.find((a) => a.ayahNumber === String(ayah))
			arabicResult = arabicAyah

			finalResult = {
				meal: turkishResult,
				arabic: arabicResult,
			}

			return NextResponse.json({ success: true, result: finalResult })
		}

		turkishResult = turkishAyats
		arabicResult = arabichAyats

		finalResult = {
			meal: turkishResult,
			arabic: arabicResult,
		}

		return NextResponse.json({ success: true, result: finalResult })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: "Veri bulunamadı" }, { status: 404 })
	}
}
