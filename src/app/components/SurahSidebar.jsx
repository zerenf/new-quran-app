import SurahCard from "./SurahCard"

const SurahSidebar = ({ toggleSidebar }) => {
	const surahs = [
		{ number: 1, name: "Fâtiha", totalNumber: "7", originType: "Mekke" },
		{ number: 2, name: "Bakara", totalNumber: "286", originType: "Medine" },
		{ number: 3, name: "Âl-i İmran", totalNumber: "200", originType: "Medine" },
		{ number: 4, name: "Nisâ", totalNumber: "176", originType: "Medine" },
		{ number: 5, name: "Mâide", totalNumber: "120", originType: "Medine" },
		{ number: 6, name: "En'âm", totalNumber: "165", originType: "Mekke" },
		{ number: 7, name: "A'râf", totalNumber: "206", originType: "Mekke" },
		{ number: 8, name: "Enfâl", totalNumber: "75", originType: "Medine" },
		{ number: 9, name: "Tevbe", totalNumber: "129", originType: "Medine" },
		{ number: 10, name: "Yûnus", totalNumber: "109", originType: "Mekke" },
		{ number: 11, name: "Hûd", totalNumber: "123", originType: "Mekke" },
		{ number: 12, name: "Yûsuf", totalNumber: "111", originType: "Mekke" },
		{ number: 13, name: "Ra'd", totalNumber: "43", originType: "Medine" },
		{ number: 14, name: "İbrâhim", totalNumber: "52", originType: "Mekke" },
		{ number: 15, name: "Hicr", totalNumber: "99", originType: "Mekke" },
		{ number: 16, name: "Nahl", totalNumber: "128", originType: "Mekke" },
		{ number: 17, name: "İsrâ", totalNumber: "111", originType: "Mekke" },
		{ number: 18, name: "Kehf", totalNumber: "110", originType: "Mekke" },
		{ number: 19, name: "Meryem", totalNumber: "98", originType: "Meryem" },
		{ number: 20, name: "Tâ-Hâ", totalNumber: "135", originType: "Mekke" },
		{ number: 21, name: "Enbiyâ", totalNumber: "112", originType: "Mekke" },
		{ number: 22, name: "Hac", totalNumber: "78", originType: "Medine" },
		{ number: 23, name: "Mü'minûn", totalNumber: "118", originType: "Mekke" },
		{ number: 24, name: "Nûr", totalNumber: "64", originType: "Medine" },
		{ number: 25, name: "Furkân", totalNumber: "77", originType: "Mekke" },
		{ number: 26, name: "Şuarâ", totalNumber: "227", originType: "Mekke" },
		{ number: 27, name: "Neml", totalNumber: "93", originType: "Mekke" },
		{ number: 28, name: "Kasas", totalNumber: "88", originType: "Mekke" },
		{ number: 29, name: "Ankebût", totalNumber: "69", originType: "Mekke" },
		{ number: 30, name: "Rûm", totalNumber: "60", originType: "Mekke" },
		{ number: 31, name: "Lokmân", totalNumber: "34", originType: "Mekke" },
		{ number: 32, name: "Secde", totalNumber: "30", originType: "Mekke" },
		{ number: 33, name: "Ahzâb", totalNumber: "73", originType: "Medine" },
		{ number: 34, name: "Sebe'", totalNumber: "54", originType: "Mekke" },
		{ number: 35, name: "Fâtır", totalNumber: "45", originType: "Mekke" },
		{ number: 36, name: "Yâsin", totalNumber: "83", originType: "Mekke" },
		{ number: 37, name: "Sâffât", totalNumber: "182", originType: "Mekke" },
		{ number: 38, name: "Sâd", totalNumber: "88", originType: "Mekke" },
		{ number: 39, name: "Zümer", totalNumber: "75", originType: "Mekke" },
		{ number: 40, name: "Mü'min", totalNumber: "85", originType: "Mekke" },
		{ number: 41, name: "Fussilet", totalNumber: "54", originType: "Mekke" },
		{ number: 42, name: "Şûrâ", totalNumber: "53", originType: "Mekke" },
		{ number: 43, name: "Zuhruf", totalNumber: "89", originType: "Mekke" },
		{ number: 44, name: "Duhân", totalNumber: "59", originType: "Mekke" },
		{ number: 45, name: "Câsiye", totalNumber: "37", originType: "Mekke" },
		{ number: 46, name: "Ahkâf", totalNumber: "35", originType: "Mekke" },
		{ number: 47, name: "Muhammed", totalNumber: "38", originType: "Medine" },
		{ number: 48, name: "Fetih", totalNumber: "29", originType: "Medine" },
		{ number: 49, name: "Hucurât", totalNumber: "18", originType: "Medine" },
		{ number: 50, name: "Kâf", totalNumber: "45", originType: "Mekke" },
		{ number: 51, name: "Zâriyât", totalNumber: "60", originType: "Mekke" },
		{ number: 52, name: "Tûr", totalNumber: "49", originType: "Mekke" },
		{ number: 53, name: "Necm", totalNumber: "62", originType: "Mekke" },
		{ number: 54, name: "Kamer", totalNumber: "55", originType: "Mekke" },
		{ number: 55, name: "Rahmân", totalNumber: "78", originType: "Medine" },
		{ number: 56, name: "Vâkıa", totalNumber: "96", originType: "Mekke" },
		{ number: 57, name: "Hadîd", totalNumber: "29", originType: "Medine" },
		{ number: 58, name: "Mücâdele", totalNumber: "22", originType: "Medine" },
		{ number: 59, name: "Haşr", totalNumber: "24", originType: "Medine" },
		{ number: 60, name: "Mümtehine", totalNumber: "13", originType: "Medine" },
		{ number: 61, name: "Saff", totalNumber: "14", originType: "Medine" },
		{ number: 62, name: "Cum'a", totalNumber: "11", originType: "Medine" },
		{ number: 63, name: "Münâfikûn", totalNumber: "11", originType: "Medine" },
		{ number: 64, name: "Teğabün", totalNumber: "18", originType: "Medine" },
		{ number: 65, name: "Talâk", totalNumber: "12", originType: "Medine" },
		{ number: 66, name: "Tahrîm", totalNumber: "12", originType: "Medine" },
		{ number: 67, name: "Mülk", totalNumber: "30", originType: "Mekke" },
		{ number: 68, name: "Kalem", totalNumber: "52", originType: "Mekke" },
		{ number: 69, name: "Hâkka", totalNumber: "52", originType: "Mekke" },
		{ number: 70, name: "Meâric", totalNumber: "44", originType: "Mekke" },
		{ number: 71, name: "Nûh", totalNumber: "28", originType: "Mekke" },
		{ number: 72, name: "Cin", totalNumber: "28", originType: "Mekke" },
		{ number: 73, name: "Müzzemmil", totalNumber: "20", originType: "Mekke" },
		{ number: 74, name: "Müddessir", totalNumber: "56", originType: "Mekke" },
		{ number: 75, name: "Kıyamet", totalNumber: "40", originType: "Mekke" },
		{ number: 76, name: "İnsan", totalNumber: "31", originType: "Medine" },
		{ number: 77, name: "Mürselât", totalNumber: "50", originType: "Mekke" },
		{ number: 78, name: "Nebe'", totalNumber: "40", originType: "Mekke" },
		{ number: 79, name: "Nâziât", totalNumber: "46", originType: "Mekke" },
		{ number: 80, name: "Abese", totalNumber: "42", originType: "Mekke" },
		{ number: 81, name: "Tekvîr", totalNumber: "29", originType: "Mekke" },
		{ number: 82, name: "İnfitâr", totalNumber: "19", originType: "Mekke" },
		{ number: 83, name: "Mutaffifîn", totalNumber: "36", originType: "Mekke" },
		{ number: 84, name: "İnşikâk", totalNumber: "25", originType: "Mekke" },
		{ number: 85, name: "Bürûc", totalNumber: "22", originType: "Mekke" },
		{ number: 86, name: "Târık", totalNumber: "17", originType: "Mekke" },
		{ number: 87, name: "A'lâ", totalNumber: "19", originType: "Mekke" },
		{ number: 88, name: "Ğâşiye", totalNumber: "26", originType: "Mekke" },
		{ number: 89, name: "Fecr", totalNumber: "30", originType: "Mekke" },
		{ number: 90, name: "Beled", totalNumber: "20", originType: "Mekke" },
		{ number: 91, name: "Şems", totalNumber: "15", originType: "Mekke" },
		{ number: 92, name: "Leyl", totalNumber: "21", originType: "Mekke" },
		{ number: 93, name: "Duhâ", totalNumber: "11", originType: "Mekke" },
		{ number: 94, name: "İnşirâh", totalNumber: "8", originType: "Mekke" },
		{ number: 95, name: "Tîn", totalNumber: "8", originType: "Mekke" },
		{ number: 96, name: "Alak", totalNumber: "19", originType: "Mekke" },
		{ number: 97, name: "Kadir", totalNumber: "5", originType: "Mekke" },
		{ number: 98, name: "Beyyine", totalNumber: "8", originType: "Medine" },
		{ number: 99, name: "Zilzâl", totalNumber: "8", originType: "Medine" },
		{ number: 100, name: "Adiyât", totalNumber: "11", originType: "Mekke" },
		{ number: 101, name: "Kâria", totalNumber: "11", originType: "Mekke" },
		{ number: 102, name: "Tekâsür", totalNumber: "8", originType: "Mekke" },
		{ number: 103, name: "Asr", totalNumber: "3", originType: "Mekke" },
		{ number: 104, name: "Hümeze", totalNumber: "9", originType: "Mekke" },
		{ number: 105, name: "Fîl", totalNumber: "5", originType: "Mekke" },
		{ number: 106, name: "Kureyş", totalNumber: "4", originType: "Mekke" },
		{ number: 107, name: "Mâûn", totalNumber: "7", originType: "Mekke" },
		{ number: 108, name: "Kevser", totalNumber: "3", originType: "Mekke" },
		{ number: 109, name: "Kâfirûn", totalNumber: "6", originType: "Mekke" },
		{ number: 110, name: "Nasr", totalNumber: "3", originType: "Medine" },
		{ number: 111, name: "Tebbet", totalNumber: "5", originType: "Mekke" },
		{ number: 112, name: "İhlâs", totalNumber: "4", originType: "Mekke" },
		{ number: 113, name: "Felâk", totalNumber: "5", originType: "Mekke" },
		{ number: 114, name: "Nâs", totalNumber: "6", originType: "Mekke" },
	]

	return (
		<div className="h-[90vh] w-[338px] flex flex-col relative ">
			<p className="font-bold text-center text-[#616b76]">TÜM SURE OKU</p>
			<div className="flex-1 overflow-y-auto my-6">
				{surahs?.map((surah) => (
					<SurahCard key={surah.number} surah={surah} toggleSidebar={toggleSidebar} />
				))}
			</div>
			<div className="blur"></div>
		</div>
	)
}

export default SurahSidebar
