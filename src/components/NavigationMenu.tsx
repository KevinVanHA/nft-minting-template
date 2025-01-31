// NavigationMenu.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "@/styles/nav.module.css";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";

export function NavigationMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.nav}>
            {/* Logo */}
            <div className={styles.logoContainer}>
                <img
                    src="/EVIL-ALIEN-COLLECTION-WHITE.png"
                    alt="Logo"
                    className={styles.logo}
                />
            </div>
            {/* Hamburger Menu Icon */}
            <div className={styles.hamburgerMenu} onClick={toggleMenu}>
                {isMenuOpen ? <X className={styles.icon} /> : <Menu className={styles.icon} />}
            </div>
            {/* Navigation Links and ConnectButton */}
            <ul className={`${styles.navList} ${isMenuOpen ? styles.open : ""}`}>
                <li className={styles.navItem}>
                    <Link href="https://www.eacnft.com" className={styles.navLink}>
                        Home
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/eac" className={styles.navLink}>
                        Mint EAC Trait Collection
                    </Link>
                    <div className={styles.dropdown}>
                        {/* Dropdown content */}
                    </div>
                </li>
                <li className={styles.navItem}>
                    <Link href="/littleones" className={styles.navLink}>
                        Mint Little Ones
                    </Link>
                    <div className={styles.dropdown}>
                        {/* Dropdown content */}
                    </div>
                </li>
                <li className={styles.navItem}>
                    <Link href="/darkones" className={styles.navLink}>
                        Mint Dark Ones
                    </Link>
                    <div className={styles.dropdown}>
                        {/* Dropdown content */}
                    </div>
                </li>
                <li className={styles.navItem}>
                    <Link href="/masterclass" className={styles.navLink}>
                        Mint Masterclass
                    </Link>
                    <div className={styles.dropdown}>
                        {/* Dropdown content */}
                    </div>
                </li>
                {/* ConnectButton inside the mobile menu */}
                <li className={styles.mobileConnectButton}>
                    <ConnectButton client={client} />
                </li>
            </ul>
            {/* ConnectButton for larger screens */}
            <div className={styles.connectButtonContainer}>
                <ConnectButton client={client} />
            </div>
        </nav>
    );
}