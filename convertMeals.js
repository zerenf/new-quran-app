

import fs from "fs"
import path from "path"

// Türkçe Kuran surelerinin isimleri ve anahtarları
const surahNames = {
	1: { name: "Fâtiha", key: "fatiha" },
	2: { name: "Bakara", key: "bakara" },
	3: { name: "Âl-i İmran", key: "ali-imran" },
	4: { name: "Nisâ", key: "nisa" },
	5: { name: "Mâide", key: "maide" },
	6: { name: "En'âm", key: "enam" },
	7: { name: "A'râf", key: "araf" },
	8: { name: "Enfâl", key: "enfal" },
	9: { name: "Tevbe", key: "tevbe" },
	10: { name: "Yûnus", key: "yunus" },
	11: { name: "Hûd", key: "hud" },
	12: { name: "Yûsuf", key: "yusuf" },
	13: { name: "Ra'd", key: "rad" },
	14: { name: "İbrâhîm", key: "ibrahim" },
	15: { name: "Hicr", key: "hicr" },
	16: { name: "Nahl", key: "nahl" },
	17: { name: "İsrâ", key: "isra" },
	18: { name: "Kehf", key: "kehf" },
	19: { name: "Meryem", key: "meryem" },
	20: { name: "Tâ-Hâ", key: "taha" },
	21: { name: "Enbiyâ", key: "enbiya" },
	22: { name: "Hac", key: "hac" },
	23: { name: "Mü'minûn", key: "muminun" },
	24: { name: "Nûr", key: "nur" },
	25: { name: "Furkân", key: "furkan" },
	26: { name: "Şuarâ", key: "suara" },
	27: { name: "Neml", key: "neml" },
	28: { name: "Kasas", key: "kasas" },
	29: { name: "Ankebût", key: "ankebut" },
	30: { name: "Rûm", key: "rum" },
	31: { name: "Lokmân", key: "lokman" },
	32: { name: "Secde", key: "secde" },
	33: { name: "Ahzâb", key: "ahzab" },
	34: { name: "Sebe'", key: "sebe" },
	35: { name: "Fâtır", key: "fatir" },
	36: { name: "Yâsin", key: "yasin" },
	37: { name: "Sâffât", key: "saffat" },
	38: { name: "Sâd", key: "sad" },
	39: { name: "Zümer", key: "zumer" },
	40: { name: "Mü'min", key: "mumin" },
	41: { name: "Fussilet", key: "fussilet" },
	42: { name: "Şûrâ", key: "sura" },
	43: { name: "Zuhruf", key: "zuhruf" },
	44: { name: "Duhân", key: "duhan" },
	45: { name: "Câsiye", key: "casiye" },
	46: { name: "Ahkâf", key: "ahkaf" },
	47: { name: "Muhammed", key: "muhammed" },
	48: { name: "Fetih", key: "fetih" },
	49: { name: "Hucurât", key: "hucurat" },
	50: { name: "Kâf", key: "kaf" },
	51: { name: "Zâriyât", key: "zariyat" },
	52: { name: "Tûr", key: "tur" },
	53: { name: "Necm", key: "necm" },
	54: { name: "Kamer", key: "kamer" },
	55: { name: "Rahmân", key: "rahman" },
	56: { name: "Vâkıa", key: "vakia" },
	57: { name: "Hadîd", key: "hadid" },
	58: { name: "Mücâdele", key: "mucadele" },
	59: { name: "Haşr", key: "hasr" },
	60: { name: "Mümtehine", key: "mumtehine" },
	61: { name: "Saff", key: "saff" },
	62: { name: "Cum'a", key: "cuma" },
	63: { name: "Münâfikûn", key: "munafikun" },
	64: { name: "Teğabün", key: "tegabun" },
	65: { name: "Talâk", key: "talak" },
	66: { name: "Tahrîm", key: "tahrim" },
	67: { name: "Mülk", key: "mulk" },
	68: { name: "Kalem", key: "kalem" },
	69: { name: "Hâkka", key: "hakka" },
	70: { name: "Meâric", key: "mearic" },
	71: { name: "Nûh", key: "nuh" },
	72: { name: "Cin", key: "cin" },
	73: { name: "Müzzemmil", key: "muzzemmil" },
	74: { name: "Müddessir", key: "muddessir" },
	75: { name: "Kıyamet", key: "kiyamet" },
	76: { name: "İnsan", key: "insan" },
	77: { name: "Mürselât", key: "murselat" },
	78: { name: "Nebe'", key: "nebe" },
	79: { name: "Nâziât", key: "naziat" },
	80: { name: "Abese", key: "abese" },
	81: { name: "Tekvîr", key: "tekvir" },
	82: { name: "İnfitâr", key: "infitar" },
	83: { name: "Mutaffifîn", key: "mutaffifin" },
	84: { name: "İnşikâk", key: "insikak" },
	85: { name: "Bürûc", key: "buruc" },
	86: { name: "Târık", key: "tarik" },
	87: { name: "A'lâ", key: "ala" },
	88: { name: "Ğâşiye", key: "gasiye" },
	89: { name: "Fecr", key: "fecr" },
	90: { name: "Beled", key: "beled" },
	91: { name: "Şems", key: "sems" },
	92: { name: "Leyl", key: "leyl" },
	93: { name: "Duhâ", key: "duha" },
	94: { name: "İnşirâh", key: "insirah" },
	95: { name: "Tîn", key: "tin" },
	96: { name: "Alak", key: "alak" },
	97: { name: "Kadir", key: "kadir" },
	98: { name: "Beyyine", key: "beyyine" },
	99: { name: "Zilzâl", key: "zilzal" },
	100: { name: "Âdiyât", key: "adiyat" },
	101: { name: "Kâria", key: "karia" },
	102: { name: "Tekâsür", key: "tekasur" },
	103: { name: "Asr", key: "asr" },
	104: { name: "Hümeze", key: "humeze" },
	105: { name: "Fîl", key: "fil" },
	106: { name: "Kureyş", key: "kureys" },
	107: { name: "Mâûn", key: "maun" },
	108: { name: "Kevser", key: "kevser" },
	109: { name: "Kâfirûn", key: "kafirun" },
	110: { name: "Nasr", key: "nasr" },
	111: { name: "Tebbet", key: "tebbet" },
	112: { name: "İhlâs", key: "ihlas" },
	113: { name: "Felâk", key: "felak" },
	114: { name: "Nâs", key: "nas" },
}

const mealsDir = path.join(process.cwd(), "src",  "data", "meals-txt")

const convert = async () => {
	try {
		// Klasördeki tüm dosyaları oku
		const files = fs.readdirSync(mealsDir)

		files.forEach((file) => {
			if (file.endsWith(".txt")) {
				const mealName = path.basename(file, ".txt")
				const filePath = path.join(mealsDir, file)
				const txtData = fs.readFileSync(filePath, "utf-8")

				// TXT verisini satırlara ayır
				const lines = txtData.trim().split("\n")

				// Her surayı gruplamak için bir nesne
				const surahs = {}

				lines.forEach((line) => {
					const parts = line.split("|")
					if (parts.length >= 3) {
						const surahNum = parts[0].trim()
						const ayahNum = parts[1].trim()
						const ayahText = parts.slice(2).join("|").trim()

						const surahKey = surahNames[surahNum].key // Sure anahtarını al

						if (!surahs[surahKey]) {
							surahs[surahKey] = {
								surahNumber: surahNum,
								surahName: surahNames[surahNum].name,
								ayats: [],
							}
						}
						surahs[surahKey].ayats.push({
							ayahNumber: ayahNum,
							ayahText: ayahText,
							surahNumber: surahNum,
							surahName: surahNames[surahNum].name
						})
					}
				})

				// JSON dosyasının yolu ve adı
				const jsonFilePath = path.join(mealsDir, `${mealName}.json`)

				// JSON dosyasına yazma
				fs.writeFileSync(jsonFilePath, JSON.stringify(surahs, null, 2))
				console.log(`${mealName}.json dosyası başarıyla oluşturuldu!`)
			}
		})
	} catch (error) {
		console.error("Dönüştürme hatası:", error.message)
	}
}

convert()
