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
						<h1 className="header-text">
							كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِّيَدَّبَّرُوا آيَاتِهِ وَلِيَتَذَكَّرَ أُولُو الْأَلْبَابِ
						</h1>
					</div>
				</div>
				{children}
			</body>
		</html>
	)
}
