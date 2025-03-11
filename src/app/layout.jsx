import "./globals.css"

export const metadata = {
	title: "Kur'an'ın Meali",
	description: "Detaylı Kur'an meali arama.",
}

export default function RootLayout({ children }) {
	return (
		<html>
			<body className="vsc-initialized">
				<div className="header-container">
					<div className="logo-container">
						<img src="/quran-logo.png" alt="Quran Logo" className="logo" />
					</div>
					<div className="header-title-container">
						<p className="header-text">
							كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِّيَدَّبَّرُوا آيَاتِهِ وَلِيَتَذَكَّرَ أُولُو الْأَلْبَابِ
						</p>

						<p className="header-text-meal">
							Sana bu mübarek Kitab'ı, ayetlerini derin derin düşünsünler ve aklı olanlar öğüt alsınlar diye indirdik.
						</p>
					</div>
				</div>
				{children}
			</body>
		</html>
	)
}
