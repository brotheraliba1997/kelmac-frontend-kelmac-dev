import type { Metadata } from "next";
import { Inter, Inter_Tight, Hedvig_Letters_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { PageTransitionWrapper } from "@/components/layout/PageTransitionWrapper";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});
const interTight = Inter_Tight({
	subsets: ["latin"],
	variable: "--font-inter-tight",
});
const hedvig = Hedvig_Letters_Serif({
	subsets: ["latin"],
	variable: "--font-hedvig",
});

export const metadata: Metadata = {
	title: "Kelmac Group",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.variable} ${interTight.variable} ${hedvig.variable} antialiased`}
			>
				<ProgressBar />
				<Header />
				<PageTransitionWrapper>{children}</PageTransitionWrapper>
				<Footer />
			</body>
		</html>
	);
}
