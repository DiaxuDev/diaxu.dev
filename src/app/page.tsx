import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { ClockIcon, MapPinIcon } from "lucide-react";

export default function Home() {
	return (
		<div className="grid grid-cols-1 gap-8 px-8 md:grid-cols-[auto_1fr]">
			<Header />
			<aside className="flex flex-col gap-6">
				<Card className="gap-2">
					<p className="flex items-center gap-2">
						<MapPinIcon />
						<span>Poland</span>
					</p>
					<p className="flex items-center gap-2">
						<ClockIcon />
						<span>{new Date().toLocaleTimeString("pl", { timeZone: "europe/warsaw" })}</span>
					</p>
				</Card>
			</aside>
			<main>
				<Card>
					<CardContent>Delusional frontend dev considering himself backend</CardContent>
				</Card>
			</main>
		</div>
	);
}
