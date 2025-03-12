import { useState } from "react"

const CustomSelect = ({ options, selected, setSelected, placeholder = "Seçiniz" }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState("")
	const [inputFocused, setInputFocused] = useState(false) // Odak durumu için state

	// Arama terimine göre filtreleme
	const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchQuery.toLowerCase()))

	return (
		<div className="custom-select-container">
			<div
				className="custom-select-box"
				onClick={() => {
					setIsOpen(!isOpen)
					setSearchQuery("") // Dropdown açıldığında arama terimini temizle
				}}
			>
				<span style={{ color: "#B4B4B8", fontSize: 16 }}>{selected || placeholder}</span>
				<svg className="custom-select-icon" viewBox="0 0 20 20" fill="currentColor">
					<path
						fillRule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</div>

			{isOpen && (
				<div className="custom-dropdown">
					<div className="flex justify-center items-center">
						<input
							type="text"
							placeholder="Ara..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onFocus={() => setInputFocused(true)}
							onBlur={() => setInputFocused(false)}
							style={{
								width: "90%",
								padding: "8px",
								border: `1px solid ${inputFocused ? "#d9eafd" : "#ccc"}`,
								borderRadius: "4px",
								margin: "4px auto",
								outline: "none",
							}}
						/>
					</div>

					<ul style={{ width: "90%", margin: "0 auto" }}>
						{filteredOptions.length > 0 ? (
							filteredOptions.map((option, index) => (
								<li
									key={index}
									onClick={() => {
										setSelected(option)
										setIsOpen(false)
									}}
									style={{
										backgroundColor: selected === option ? "#f0f0f0" : "white",
									}}
								>
									{option}
								</li>
							))
						) : (
							<li style={{ padding: "8px", color: "#999" }}>Sonuç bulunamadı.</li>
						)}
					</ul>
				</div>
			)}
		</div>
	)
}

export default CustomSelect
