import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "DiaxuDev",
	description: "Delusional frontend dev considering himself backend",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} min-h-svh w-full antialiased`}>
				<div
					aria-hidden
					className="fixed inset-0 -z-10 bg-[url(/grid.png)] bg-position-[-5px_-5px]"
					style={{
						maskImage:
							"radial-gradient(ellipse at center, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 90%)",
					}}
				/>
				{children}
			</body>
		</html>
	);
}
