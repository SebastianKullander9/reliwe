interface InfoRowProps {
	title: string;
	text: string;
}

export default function InfoRow({ title, text }: InfoRowProps) {
	return (
		<div className="flex flex-row justify-between border-b border-[var(--reliwe-green)]/25 p-4">
			<p className="font-semibold">
				{title}
			</p>
			<p>
				{text}
			</p>
		</div>
	);
};