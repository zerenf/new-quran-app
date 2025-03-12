import "./globals.css"
import Header from "./Header"

export const metadata = {
	title: "Kur'an'ın Meali",
	description: "Detaylı Kur'an meali arama.",
}

export default function RootLayout({ children }) {
	return (
		<html>
			<body className="vsc-initialized">
				<Header />
				{children}
			</body>
		</html>
	)
}
