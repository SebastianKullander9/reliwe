interface InfoRowProps {
	title: string;
	text: string;
}

export default function InfoRow({ title, text }: InfoRowProps) {
	return (
		<div className="flex flex-row justify-between border-b border-[var(--reliwe-green-accent3)] py-4">
			<p className="text-[var(--reliwe-green-accent3)]">
				{title}
			</p>
			<p className="text-[var(--reliwe-offwhite)]">
				{text}
			</p>
		</div>
	);
};