import { readFile } from "fs/promises"
import path from "path"

export async function GET(req, { params }) {
	const { surahName, ayahNumber } = await params

	const filePath = path.join(process.cwd(), "src", "data", "surahs", `${surahName}.json`)

	try {
		const data = JSON.parse(await readFile(filePath, "utf-8"))

		const ayah = data[surahName].ayats.find((a) => a.ayahNumber === ayahNumber.toString())

		if (!ayah) return Response.json({ error: "Ayet bulunamadı." }, { status: 404 }, { success: false })

		return Response.json(ayah)
	} catch (error) {
		return Response.json({ error: "Ayet bulunamadı." }, { status: 404 }, { success: false })
	}
}
