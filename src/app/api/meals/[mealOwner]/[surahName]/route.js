import { error } from "console"
import { read } from "fs"
import { readFile } from "fs/promises"
import path from "path"

export async function GET(req, { params }) {
	const { mealOwner, surahName } = await params

	const { searchParams } = new URL(req.url)
	const ayahNumber = searchParams.get("ayah")

	const filePath = path.join(process.cwd(), "src", "data", "meals", `${mealOwner}.json`)

	try {
		const data = JSON.parse(await readFile(filePath, "utf-8"))

		const surah = data[surahName]

		if (!surah) {
			return Response.json({ error: "Sure bulunamadı." }, { status: 404 })
		}

		if (ayahNumber) {
			const ayah = surah.ayats.find((a) => a.ayahNumber === ayahNumber)

			if (ayah) {
				return Response.json({ success: true, ayah })
			} else {
				return Response.json({ error: "Ayet bulunamadı." }, { status: 404 })
			}
		} else {
			return Response.json({ success: true, ayats: surah.ayats })
		}
	} catch (error) {
		return Response.json({ error: "Meal bulunamadı." }, { status: 404 })
	}
}
