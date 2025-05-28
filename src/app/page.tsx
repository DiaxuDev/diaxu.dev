import { DiscordStatus } from "@/components/grid/DiscordStatus";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";

export default function Home() {
	return (
		<>
			<Header />
			<div className="mx-2 grid grid-cols-12 gap-4 sm:mx-8">
				<DiscordStatus className="col-span-8 col-start-1 row-span-2 sm:col-span-4" />
				<Card className="col-start-9 -col-end-1 justify-center sm:col-start-5">
					Delusional frontend dev thinking he&apos;s backend
				</Card>
			</div>
		</>
	);
}
