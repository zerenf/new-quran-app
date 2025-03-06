import { useState } from "react"

const CustomSelect = ({ options, selected, setSelected, placeholder = "Seçiniz" }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="custom-select-container">
			<div className="custom-select-box" onClick={() => setIsOpen(!isOpen)}>
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
				<ul className="custom-dropdown">
					{options.map((option, index) => (
						<li
							key={index}
							onClick={() => {
								setSelected(option)
								setIsOpen(false)
							}}
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default CustomSelect
