import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";
import { AuthProvider } from './contexts/AuthContext'

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Twitter Autoblocker",
	description: "Automatically block negative tweets on Twitter",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="min-h-screen bg-white text-gray-900 flex flex-col">
					<header className="border-b border-gray-200">
						<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
							<div className="flex items-center space-x-4">
								<Twitter className="h-8 w-8 text-blue-500" />
								<h1 className="text-xl font-bold">Auto Blocker</h1>
							</div>
							<a href="/dashboard">
								<Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-50">
									Tableau de bord
								</Button>
								</a>
						</div>
					</header>

					<main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
						{children}
					</main>
				</div>
			</body>
		</html>
		</AuthProvider>
	);
}
