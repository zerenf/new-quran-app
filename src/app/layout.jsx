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
					<div style={{ position: "absolute", left: 10, top: 10 }}>
						<img src="/quran-logo.png" alt="" style={{ width: 40 }} />
					</div>
					<div style={{ flex: 1 }}>
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
