import { LuCopy, LuCopyCheck } from "react-icons/lu"

export default function AyahCard({ ayah, meal, surahNumber, copyToClipboard, clicked, mealOwner }) {
	console.log("mealOwner:", mealOwner)
	return (
		<div className="flex flex-col mx-3 bg-white my-4 relative rounded-xl max-w-3xl min-w-[300px]">
			<button
				onClick={() => copyToClipboard(meal.ayahText, meal.ayahNumber)}
				className="ml-2 p-2 bg-gray-100 rounded hover:bg-gray-300 transition cursor-pointer absolute right-0 top-0 m-3"
			>
				{clicked[ayah.ayahNumber] ? <LuCopyCheck /> : <LuCopy />}
			</button>

			<div className="my-10 px-3">
				<div className="flex flex-row items-start xs:items-center">
					{/* Arapça Ayet */}
					<p className="text-green font-bold sm:w-auto p-2 rounded text-[14px] sm:text-lg">
						{surahNumber}:{ayah.ayahNumber}
					</p>
					<p className="flex-1 text-right leading-[35px] p-2 font-arabic text-[16px] sm:text-lg">{ayah.ayahText}</p>
				</div>

				<div className="w-full h-0.5 bg-green-dark opacity-30 my-3 rounded-full"></div>

				{/* Meal */}
				<div className="flex flex-col sm:flex-row items-start mt-2">
					<div className="flex flex-col">
						<p className="text-[14px] text-gray-500"> {mealOwner} </p>
						<p className="xs:leading-[35px] text-left text-[14px] sm:text-lg max-w-[600px]">{meal.ayahText}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
