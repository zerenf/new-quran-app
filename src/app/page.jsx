import AyahCard from "./components/AyahCard"
import QuranSearch from "./components/QuranSearch"
import SurahFilter from "./components/SurahFilter"
import SurahSidebar from "./components/SurahSidebar"

export default function Home() {
	return (
		<>
			<div className="flex">
				<div>
					<SurahSidebar />
				</div>
				<div className="mt-14 w-full">
					<SurahFilter />
				</div>
			</div>
		</>
	)
}
