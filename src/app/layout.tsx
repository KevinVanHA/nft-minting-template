import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from '@/components/Navbar';
import { ToastProvider } from "@/components/ui/toast";
import { QueryProvider } from "@/components/QueryProvider";
import { ThirdwebProviderWrapper } from "@/components/ThirdwebProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Off The Grass NFTs",
	description: "Mint your very own Blasted Buck",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ToastProvider>
					<Toaster position="bottom-center" />
					<QueryProvider>
          				<ThirdwebProviderWrapper><Navbar /></ThirdwebProviderWrapper>
						<ThirdwebProviderWrapper>{children}</ThirdwebProviderWrapper>
					</QueryProvider>
				</ToastProvider>
			</body>
		</html>
	);
}
