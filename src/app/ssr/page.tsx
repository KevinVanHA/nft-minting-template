"use client";

import { NavigationMenu } from "@/components/NavigationMenu"; // Import the NavigationMenu component
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import styles from "@/styles/cards.module.css"; // Import the CSS module

// Define the type for Card props
type CardProps = {
	title: string;
	description: string;
	href: string; // Add href prop for navigation
};

// Card Component
const Card = ({ title, description, href }: CardProps) => {
	const router = useRouter(); // Initialize useRouter

	const handleClick = () => {
		router.push(href); // Navigate to the specified route
	};

	return (
		<div className={styles.card} onClick={handleClick}>
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	);
};

// Home Component (Default Export)
export default function HomePage() {
	return (
		<div>
			{/* Use the NavigationMenu component */}
			<NavigationMenu />

			{/* Cards */}
			<div className={styles.cardContainer}>
				<Card
					title="Mint EAC Trait Collection"
					description="The main NFT collection of EAC"
					href="/eac" // Route for EAC Trait Collection
				/>
				<Card
					title="Mint Dark Ones Collection"
					description="Dark little creatures that earn you EAC"
					href="/darkones" // Route for Dark Ones
				/>
				<Card
					title="Mint Little Ones Collection"
					description="Little creatures that earn you EAC"
					href="/littleones" // Route for Little Ones
				/>
				<Card
					title="Mint Masterclass Collection"
					description="The masterclass NFT's of EAC"
					href="/masterclass" // Route for Masterclass
				/>
			</div>
		</div>
	);
}