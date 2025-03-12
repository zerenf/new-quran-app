"use client"
import { useState, useEffect } from "react"
import SurahSidebar from "./components/SurahSidebar"
import SurahFilter from "./components/SurahFilter"
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs"
import { FaArrowCircleRight } from "react-icons/fa"
import { FaArrowCircleLeft } from "react-icons/fa"

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
					className={`bg-[#D9EAFD] sidebar p-1 pt-13 fixed top-15 left-0 h-screen transition-all duration-300 ${
						isSidebarOpen ? "w-[335px]" : "w-6"
					}`}
				>
					{/* Sidebar Kontrol Butonu */}
					<button
						onClick={toggleSidebar}
						className="absolute -right-4 top-13 w-10 h-10 bg-primary text-grey-dark flex items-center justify-center rounded-full cursor-pointer z-10"
					>
						{isSidebarOpen ? <FaArrowCircleLeft size={26} /> : <FaArrowCircleRight size={26} />}
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
