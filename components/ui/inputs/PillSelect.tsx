"use client";

import { useState } from "react";

/*interface PillSelectProps {
	
}*/

const rooms = ["1 rok", "2 rok", "3 rok", "4 rok"]

export default function PillSelect() {
	const [selectedRoomAmount, setSelectedRoomAmount] = useState<string[]>([]);

	const toggle = (room: string) =>
		setSelectedRoomAmount(prev =>
			prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]
	);

	return (
		<div className="flex flex-col">
			<label className="pl-4 pb-4">
				Önskat antal rum
			</label>
			<div className="flex flex-row flex-wrap gap-4">
				{rooms.map((room, index) => (
					<button
						onClick={() => toggle(room)}
						className={`
							px-4 py-[10px] rounded-full cursor-pointer 
							${selectedRoomAmount.includes(room) ? "bg-[var(--reliwe-green)] text-[var(--reliwe-offwhite)]" : "hover:bg-[var(--reliwe-green-accent2)] bg-[var(--reliwe-green-accent)]"}
						`}
						key={room+index}
						type="button"
					>
						{room}
					</button>
				)) }
			</div>
		</div>
	);
};