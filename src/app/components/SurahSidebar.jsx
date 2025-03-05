import SurahCard from "./SurahCard"

const SurahSidebar = () => {
	const surahs = [
		{ number: 1, name: "Fâtiha Suresi", totalNumber: "7", originType: "Mekki" },
		{ number: 2, name: "Bakara Suresi", totalNumber: "286", originType: "Medeni" },
		{ number: 3, name: "Âl-i İmran Suresi", totalNumber: "200", originType: "Medeni" },
		{ number: 4, name: "Nisâ Suresi", totalNumber: "176", originType: "Medeni" },
		{ number: 5, name: "Mâide Suresi", totalNumber: "120", originType: "Medeni" },
		{ number: 6, name: "En'âm Suresi", totalNumber: "165", originType: "Mekki" },
		{ number: 7, name: "A'râf Suresi", totalNumber: "206", originType: "Mekki" },
		{ number: 8, name: "Enfâl Suresi", totalNumber: "75", originType: "Medeni" },
		{ number: 9, name: "Tevbe Suresi", totalNumber: "129", originType: "Medeni" },
		{ number: 10, name: "Yûnus Suresi", totalNumber: "109", originType: "Mekki" },
		{ number: 11, name: "Hûd Suresi", totalNumber: "123", originType: "Mekki" },
		{ number: 12, name: "Yûsuf Suresi", totalNumber: "111", originType: "Mekki" },
		{ number: 13, name: "Ra'd Suresi", totalNumber: "43", originType: "Medeni" },
		{ number: 14, name: "İbrâhim Suresi", totalNumber: "52", originType: "Mekki" },
		{ number: 15, name: "Hicr Suresi", totalNumber: "", originType: "" },
		{ number: 16, name: "Nahl Suresi", totalNumber: "", originType: "" },
		{ number: 17, name: "İsrâ Suresi", totalNumber: "", originType: "" },
		{ number: 18, name: "Kehf Suresi", totalNumber: "", originType: "" },
		{ number: 19, name: "Meryem Suresi", totalNumber: "", originType: "" },
		{ number: 20, name: "Tâ-Hâ Suresi", totalNumber: "", originType: "" },
		{ number: 21, name: "Enbiyâ Suresi", totalNumber: "", originType: "" },
		{ number: 22, name: "Hac Suresi", totalNumber: "", originType: "" },
		{ number: 23, name: "Mü'minûn Suresi", totalNumber: "", originType: "" },
		{ number: 24, name: "Nûr Suresi", totalNumber: "", originType: "" },
		{ number: 25, name: "Furkân Suresi", totalNumber: "", originType: "" },
		{ number: 26, name: "Şuarâ Suresi", totalNumber: "", originType: "" },
		{ number: 27, name: "Neml Suresi", totalNumber: "", originType: "" },
		{ number: 28, name: "Kasas Suresi", totalNumber: "", originType: "" },
		{ number: 29, name: "Ankebût Suresi", totalNumber: "", originType: "" },
		{ number: 30, name: "Rûm Suresi", totalNumber: "", originType: "" },
		{ number: 31, name: "Lokmân Suresi", totalNumber: "", originType: "" },
		{ number: 32, name: "Secde Suresi", totalNumber: "", originType: "" },
		{ number: 33, name: "Ahzâb Suresi", totalNumber: "", originType: "" },
		{ number: 34, name: "Sebe' Suresi", totalNumber: "", originType: "" },
		{ number: 35, name: "Fâtır Suresi", totalNumber: "", originType: "" },
		{ number: 36, name: "Yâsin Suresi", totalNumber: "", originType: "" },
		{ number: 37, name: "Sâffât Suresi", totalNumber: "", originType: "" },
		{ number: 38, name: "Sâd Suresi", totalNumber: "", originType: "" },
		{ number: 39, name: "Zümer Suresi", totalNumber: "", originType: "" },
		{ number: 40, name: "Mü'min Suresi", totalNumber: "", originType: "" },
		{ number: 41, name: "Fussilet Suresi", totalNumber: "", originType: "" },
		{ number: 42, name: "Şûrâ Suresi", totalNumber: "", originType: "" },
		{ number: 43, name: "Zuhruf Suresi", totalNumber: "", originType: "" },
		{ number: 44, name: "Duhân Suresi", totalNumber: "", originType: "" },
		{ number: 45, name: "Câsiye Suresi", totalNumber: "", originType: "" },
		{ number: 46, name: "Ahkâf Suresi", totalNumber: "", originType: "" },
		{ number: 47, name: "Muhammed Suresi", totalNumber: "", originType: "" },
		{ number: 48, name: "Fetih Suresi", totalNumber: "", originType: "" },
		{ number: 49, name: "Hucurât Suresi", totalNumber: "", originType: "" },
		{ number: 50, name: "Kâf Suresi", totalNumber: "", originType: "" },
		{ number: 51, name: "Zâriyât Suresi", totalNumber: "", originType: "" },
		{ number: 52, name: "Tûr Suresi", totalNumber: "", originType: "" },
		{ number: 53, name: "Necm Suresi", totalNumber: "", originType: "" },
		{ number: 54, name: "Kamer Suresi", totalNumber: "", originType: "" },
		{ number: 55, name: "Rahmân Suresi", totalNumber: "", originType: "" },
		{ number: 56, name: "Vâkıa Suresi", totalNumber: "", originType: "" },
		{ number: 57, name: "Hadîd Suresi", totalNumber: "", originType: "" },
		{ number: 58, name: "Mücâdele Suresi", totalNumber: "", originType: "" },
		{ number: 59, name: "Haşr Suresi", totalNumber: "", originType: "" },
		{ number: 60, name: "Mümtehine Suresi", totalNumber: "", originType: "" },
		{ number: 61, name: "Saff Suresi", totalNumber: "", originType: "" },
		{ number: 62, name: "Cum'a Suresi", totalNumber: "", originType: "" },
		{ number: 63, name: "Münâfikûn Suresi", totalNumber: "", originType: "" },
		{ number: 64, name: "Teğabün Suresi", totalNumber: "", originType: "" },
		{ number: 65, name: "Talâk Suresi", totalNumber: "", originType: "" },
		{ number: 66, name: "Tahrîm Suresi", totalNumber: "", originType: "" },
		{ number: 67, name: "Mülk Suresi", totalNumber: "", originType: "" },
		{ number: 68, name: "Kalem Suresi", totalNumber: "", originType: "" },
		{ number: 69, name: "Hâkka Suresi", totalNumber: "", originType: "" },
		{ number: 70, name: "Meâric Suresi", totalNumber: "", originType: "" },
		{ number: 71, name: "Nûh Suresi", totalNumber: "", originType: "" },
		{ number: 72, name: "Cin Suresi", totalNumber: "", originType: "" },
		{ number: 73, name: "Müzzemmil Suresi", totalNumber: "", originType: "" },
		{ number: 74, name: "Müddessir Suresi", totalNumber: "", originType: "" },
		{ number: 75, name: "Kıyamet Suresi", totalNumber: "", originType: "" },
		{ number: 76, name: "İnsan Suresi", totalNumber: "", originType: "" },
		{ number: 77, name: "Mürselât Suresi", totalNumber: "", originType: "" },
		{ number: 78, name: "Nebe' Suresi", totalNumber: "", originType: "" },
		{ number: 79, name: "Nâziât Suresi", totalNumber: "", originType: "" },
		{ number: 80, name: "Abese Suresi", totalNumber: "", originType: "" },
		{ number: 81, name: "Tekvîr Suresi", totalNumber: "", originType: "" },
		{ number: 82, name: "İnfitâr Suresi", totalNumber: "", originType: "" },
		{ number: 83, name: "Mutaffifîn Suresi", totalNumber: "", originType: "" },
		{ number: 84, name: "İnşikâk Suresi", totalNumber: "", originType: "" },
		{ number: 85, name: "Bürûc Suresi", totalNumber: "", originType: "" },
		{ number: 86, name: "Târık Suresi", totalNumber: "", originType: "" },
		{ number: 87, name: "A'lâ Suresi", totalNumber: "", originType: "" },
		{ number: 88, name: "Ğâşiye Suresi", totalNumber: "", originType: "" },
		{ number: 89, name: "Fecr Suresi", totalNumber: "", originType: "" },
		{ number: 90, name: "Beled Suresi", totalNumber: "", originType: "" },
		{ number: 91, name: "Şems Suresi", totalNumber: "", originType: "" },
		{ number: 92, name: "Leyl Suresi", totalNumber: "", originType: "" },
		{ number: 93, name: "Duhâ Suresi", totalNumber: "", originType: "" },
		{ number: 94, name: "İnşirâh Suresi", totalNumber: "", originType: "" },
		{ number: 95, name: "Tîn Suresi", totalNumber: "", originType: "" },
		{ number: 96, name: "Alak Suresi", totalNumber: "", originType: "" },
		{ number: 97, name: "Kadir Suresi", totalNumber: "", originType: "" },
		{ number: 98, name: "Beyyine Suresi", totalNumber: "", originType: "" },
		{ number: 99, name: "Zilzâl Suresi", totalNumber: "", originType: "" },
		{ number: 100, name: "Adiyât Suresi", totalNumber: "", originType: "" },
		{ number: 101, name: "Kâria Suresi", totalNumber: "", originType: "" },
		{ number: 102, name: "Tekâsür Suresi", totalNumber: "", originType: "" },
		{ number: 103, name: "Asr Suresi", totalNumber: "", originType: "" },
		{ number: 104, name: "Hümeze Suresi", totalNumber: "", originType: "" },
		{ number: 105, name: "Fîl Suresi", totalNumber: "", originType: "" },
		{ number: 106, name: "Kureyş Suresi", totalNumber: "", originType: "" },
		{ number: 107, name: "Mâûn Suresi", totalNumber: "", originType: "" },
		{ number: 108, name: "Kevser Suresi", totalNumber: "", originType: "" },
		{ number: 109, name: "Kâfirûn Suresi", totalNumber: "", originType: "" },
		{ number: 110, name: "Nasr Suresi", totalNumber: "", originType: "" },
		{ number: 111, name: "Tebbet Suresi", totalNumber: "", originType: "" },
		{ number: 112, name: "İhlâs Suresi", totalNumber: "", originType: "" },
		{ number: 113, name: "Felâk Suresi", totalNumber: "", originType: "" },
		{ number: 114, name: "Nâs Suresi", totalNumber: "", originType: "" },
	]

	return (
		<div className="h-[90vh] w-[300px] flex flex-col relative ">
			<p className="p-4 text-lg font-semibold">SurahSidebar</p>
			<div className="flex-1 overflow-y-auto ">
				{surahs?.map((surah) => (
					<SurahCard key={surah.number} surah={surah} />
				))}
			</div>
			<div className="blur"></div>
		</div>
	)
}

export default SurahSidebar
