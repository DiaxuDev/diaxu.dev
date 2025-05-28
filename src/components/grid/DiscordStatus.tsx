"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DiscordStatusProps {
	className?: string;
}

const STATUS: Record<LanyardData["discord_status"], { text: string; color: string }> = {
	online: {
		text: "ONLINE",
		color: "var(--color-green-500)",
	},
	idle: {
		text: "IDLE",
		color: "var(--color-yellow-500)",
	},
	dnd: {
		text: "DO NOT DISTURB",
		color: "var(--color-red-500)",
	},
	offline: {
		text: "OFFLINE",
		color: "var(--color-gray-500)",
	},
};

export function DiscordStatus({ className }: DiscordStatusProps) {
	const [data, setData] = useState<LanyardData | null>(null);

	useEffect(() => {
		const ws = new WebSocket("wss://api.lanyard.rest/socket");
		let heartbeat: ReturnType<typeof setInterval>;

		ws.addEventListener("message", (ev) => {
			const msg = JSON.parse(ev.data);

			if (msg.op === 0) setData(msg.d);
			else if (msg.op === 1) {
				ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: "1306635810187247658" } }));
				heartbeat = setInterval(() => {
					ws.send(JSON.stringify({ op: 3 }));
				}, msg.d.heartbeat_interval);
			}
		});

		return () => {
			clearInterval(heartbeat);
			ws.close();
		};
	}, []);

	if (!data) return null;

	return (
		<Card className={className} style={{ "--status-color": STATUS[data.discord_status].color } as React.CSSProperties}>
			<CardContent className="flex flex-col">
				<div className="flex items-center gap-2">
					<span className="size-4 rounded-full bg-(--status-color)" aria-hidden></span>
					<p className="text-2xl font-bold text-(--status-color)">{STATUS[data.discord_status].text}</p>
				</div>
				{data.activities.filter((a) => a.name !== "Spotify").length > 0 && (
					<>
						<div className="border-primary my-2 w-full border-b" aria-hidden />
						<DiscordActivity activity={data.activities[0]} />
					</>
				)}
			</CardContent>
		</Card>
	);
}

function DiscordActivity({ activity }: { activity: LanyardData["activities"][number] }) {
	const cover = activity.assets?.large_image
		? getDiscordAppAsset(activity.application_id!, activity.assets?.large_image)
		: "https://dcdn.dstn.to/app-icons/" + activity.application_id;

	return (
		<div className="flex gap-4">
			<div className="relative">
				<img src={cover} alt="Application cover" className="size-12 min-w-12 rounded-lg" />
				{activity.assets?.small_image && (
					<img
						src={getDiscordAppAsset(activity.application_id!, activity.assets.small_image)}
						alt="Small application cover"
						className="absolute right-0 bottom-0 size-5 translate-x-1/2 -translate-y-1/2 rounded-full"
					/>
				)}
			</div>
			<div>
				<p className="font-bold">{activity.name}</p>
				<p className="line-clamp-1 text-sm text-gray-300">{activity.details}</p>
				<p className="line-clamp-1 text-sm text-gray-300">{activity.state}</p>
				{/* {activity.timestamps?.start && (
											<p className="text-sm text-gray-300">
												{formatRelativeTimestamp(
													time - activity.timestamps.start,
												)}{" "}
												elapsed
											</p>
										)} */}
			</div>
		</div>
	);
}

function getDiscordAppAsset(applicationId: string, asset: string) {
	// Discord can return either normal asset or media proxy (mp:)
	if (asset.startsWith("mp:")) return `https://media.discordapp.net/${asset.slice("mp:".length)}`;
	return `https://cdn.discordapp.com/app-assets/${applicationId}/${asset}.png`;
}

enum ActivityType {
	Playing,
	Streaming,
	Listening,
	Watching,
	Custom,
	Competing,
}

type LanyardData = {
	discord_status: "online" | "idle" | "dnd" | "offline";
	discord_user: {
		id: string;
		avatar: string;
		global_name: string;
	};
	activities: {
		id: string;
		name: string;
		type: ActivityType;
		url?: string | null;
		created_at: number;
		timestamps?: {
			start?: number;
			end?: number;
		};
		sync_id?: string;
		platform?: string;
		application_id?: string;
		details?: string | null;
		state?: string | null;
		emoji?: {
			name: string;
			id?: string;
			animated?: boolean;
		};
		session_id?: string;
		party?: {
			id?: string;
			size?: [currentSize: number, maxSize: number];
		};
		assets?: {
			large_image?: string;
			large_text?: string;
			small_image?: string;
			small_text?: string;
		};
		secrets?: {
			join?: string;
			spectate?: string;
			match?: string;
		};
		instance?: boolean;
		flags?: number;
		buttons?: string[];
	}[];
};
