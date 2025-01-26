"use client";

import Link from "next/link";
import styles from "@/styles/nav.module.css"; // Import the CSS module
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";

export function NavigationMenu() {
	return (
		<nav className={styles.nav}>
			{/* Add the logo */}
			<div className={styles.logoContainer}>
				<img
					src="/EVIL-ALIEN-COLLECTION-WHITE.png" // Replace with the path to your logo
					alt="Logo"
					className={styles.logo}
				/>
			</div>

			{/* Navigation Links */}
			<ul className={styles.navList}>
				<li className={styles.navItem}>
					<Link href="https://www.eacnft.com" className={styles.navLink}>
						Home
					</Link>
				</li>
				<li className={styles.navItem}>
					<Link href="/eac" className={styles.navLink}>
						Mint EAC Trait Collection
					</Link>
				</li>
				<li className={styles.navItem}>
					<Link href="/littleones" className={styles.navLink}>
						Mint Little Ones
					</Link>
				</li>
				<li className={styles.navItem}>
					<Link href="/darkones" className={styles.navLink}>
						Mint Dark Ones
					</Link>
				</li>
				<li className={styles.navItem}>
					<Link href="/masterclass" className={styles.navLink}>
						Mint Masterclass
					</Link>
				</li>
			</ul>

			{/* ConnectButton in the top-right corner */}
			<div className={styles.connectButtonContainer}>
				<ConnectButton client={client} />
			</div>
		</nav>
	);
}