import { LuCopy, LuCopyCheck } from "react-icons/lu"

export default function AyahCard({ ayah, meal, surahName, surahNumber, copyToClipboard, clicked, mealOwner }) {
	return (
		<div className="flex flex-col mx-2 bg-white my-4 relative rounded-xl max-w-3xl min-w-[300px]">
			<button
				onClick={() => copyToClipboard(ayah.ayahText, ayah.ayahNumber + "_arabic")}
				className="ml-2 p-2 bg-gray-100 rounded hover:bg-gray-300 transition cursor-pointer absolute right-0 top-0 m-3"
			>
				{clicked[ayah.ayahNumber + "_arabic"] ? <LuCopyCheck /> : <LuCopy />}
			</button>

			<div className="my-10 px-3">
				<div className="flex flex-col  items-start xs:items-center">
					{/* Arapça Ayet */}
					<p className=" text-green border-b border-green sm:w-auto text-[14px] sm:text-lg">
						{surahName} / {ayah.ayahNumber}
					</p>

					<p className="w-full text-right leading-[35px] p-2 font-arabic text-[18px] sm:text-lg">{ayah.ayahText}</p>
				</div>

				<div className="w-full h-0.5 bg-green-dark opacity-30 my-3 rounded-full"></div>

				{/* Meal */}
				<div className="flex flex-col sm:flex-row items-start mt-2 relative">
					<button
						onClick={() => copyToClipboard(meal.ayahText, meal.ayahNumber + "_meal")}
						className="ml-2 p-2 bg-gray-100 rounded hover:bg-gray-300 transition cursor-pointer absolute right-0 top-0 m-3"
					>
						{clicked[meal.ayahNumber + "_meal"] ? <LuCopyCheck /> : <LuCopy />}
					</button>
					<div className="flex flex-col">
						<p className="text-[14px] text-gray-500"> {mealOwner} </p>
						<p className="xs:leading-[35px] text-left text-[16px] sm:text-lg max-w-[600px]">{meal.ayahText}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
