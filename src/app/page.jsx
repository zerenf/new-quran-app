// "use client"
// import { useState, useEffect } from "react"
// import SurahSidebar from "./components/SurahSidebar"
// import SurahFilter from "./components/SurahFilter"
// import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs"

// export default function Home() {
// 	const [isSidebarOpen, setIsSidebarOpen] = useState(true)

// 	// Ekran genişliğine göre sidebar durumunu ayarlama
// 	useEffect(() => {
// 		const handleResize = () => {
// 			// Eğer ekran genişliği 768px'in altındaysa, sidebar başlangıçta kapalı olsun
// 			if (window.innerWidth < 768) {
// 				setIsSidebarOpen(false)
// 			} else {
// 				setIsSidebarOpen(true)
// 			}
// 		}

// 		// İlk yükleme ve pencere boyutu değiştikçe çalışacak
// 		handleResize()
// 		window.addEventListener("resize", handleResize)

// 		// Temizlik: resize event listener'ını kaldır
// 		return () => window.removeEventListener("resize", handleResize)
// 	}, [])

// 	const toggleSidebar = () => {
// 		setIsSidebarOpen((prev) => !prev)
// 	}

// 	return (
// 		<div className="flex">
// 			{/* Sidebar */}
// 			<div className={`bg-gray-900 p-1 pt-8 relative duration-300 ${isSidebarOpen ? "w-80" : "w-16"}`}>
// 				{/* Sidebar Kontrol Butonu */}
// 				<button
// 					onClick={toggleSidebar}
// 					className="absolute -right-4 top-9 w-11 h-11 bg-gray-900 text-white flex items-center justify-center rounded-full border-2 border-gray-900"
// 				>
// 					{isSidebarOpen ? <BsArrowLeftSquare size={24} /> : <BsArrowRightSquare size={24} />}
// 				</button>

// 				{/* Sidebar İçeriği */}
// 				<div className="overflow-hidden">
// 					<div
// 						className={`transition-all duration-300 ease-in-out transform ${
// 							isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
// 						}`}
// 					>
// 						<SurahSidebar toggleSidebar={toggleSidebar} />
// 					</div>
// 				</div>
// 			</div>

// 			{/* İçerik */}
// 			<div className={`h-screen flex-1 p-7 transition-all duration-300`}>
// 				<SurahFilter />
// 			</div>
// 		</div>
// 	)
// }

"use client"
import { useState, useEffect } from "react"
import SurahSidebar from "./components/SurahSidebar"
import SurahFilter from "./components/SurahFilter"
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs"

export default function Home() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	// Ekran genişliğine göre sidebar durumunu ayarlama
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 991) {
				setIsSidebarOpen(false)
			} else {
				setIsSidebarOpen(true)
			}
		}

		handleResize()
		window.addEventListener("resize", handleResize)

		return () => window.removeEventListener("resize", handleResize)
	}, [])

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev)
	}

	return (
		<div className="flex">
			<div>
				{/* Sidebar */}
				<div
					className={`bg-[#D9EAFD] sidebar p-1 pt-8 fixed top-14 left-0 h-screen transition-all duration-300 ${
						isSidebarOpen ? "w-[350px]" : "w-16"
					}`}
				>
					{/* Sidebar Kontrol Butonu */}
					<button
						onClick={toggleSidebar}
						className="absolute -right-4 top-6 w-10 h-10 bg-[#717a84] text-white flex items-center justify-center rounded-full"
					>
						{isSidebarOpen ? <BsArrowLeftSquare size={24} /> : <BsArrowRightSquare size={24} />}
					</button>

					{/* Sidebar İçeriği */}
					<div className="overflow-hidden">
						<div
							className={`transition-all duration-300 ease-in-out transform ${
								isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
							}`}
						>
							<SurahSidebar toggleSidebar={toggleSidebar} />
						</div>
					</div>
				</div>
			</div>

			<div>
				{/* İçerik */}
				<div className={"h-screen w-screen flex-1"}>
					<SurahFilter isSidebarOpen={isSidebarOpen} />
				</div>
			</div>
		</div>
	)
}
