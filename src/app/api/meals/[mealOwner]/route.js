import { error } from "console"
import { read } from "fs"
import { readFile } from "fs/promises"
import path from "path"

export async function GET(req, { params }) {
	const { mealOwner } = await params

	const searchParams = req.nextUrl.searchParams

	const surah = searchParams.get("surah")

	console.log("surah:", surah)

	const filePath = path.join(process.cwd(), "src", "data", "all-meals-new2", `${mealOwner}.json`)

	try {
		const data = JSON.parse(await readFile(filePath, "utf-8"))

		if (surah) {
			const response = data[surah]

			return Response.json({ success: true, data: response })

		}

		return Response.json({ success: true, data })
	} catch (error) {
		return Response.json({ error: "Meal bulunamadı." }, { status: 404 })
	}
}
