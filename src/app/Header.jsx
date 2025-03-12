import styles from "./header.module.css"

const Header = () => {
	return (
		<div className={styles.headerContainer}>
			<div className={styles.logoContainer}>
				<img src="/quran-logo.png" alt="Quran Logo" className={styles.logo} />
			</div>
			<div className={styles.headerTitleContainer}>
				<p className={styles.headerText}>
					كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِّيَدَّبَّرُوا آيَاتِهِ وَلِيَتَذَكَّرَ أُولُو الْأَلْبَابِ
				</p>
				<p className={styles.headerTextMeal}>
					Sana bu mübarek Kitab'ı, ayetlerini derin derin düşünsünler ve aklı olanlar öğüt alsınlar diye indirdik. (38/29)
				</p>
			</div>
		</div>
	)
}

export default Header
