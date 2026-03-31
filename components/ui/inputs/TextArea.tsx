/*interface TextAreaProps {
	
}*/

export default function TextArea() {

	return (
		<div className="flex flex-col">
			<label className="p-4">
				Övriga önskemål
			</label>
			<textarea
				className="bg-[var(--reliwe-green-accent)] rounded-3xl border border-[var(--reliwe-green-accent2)] p-4"
				rows={5}
				placeholder="Berätta gärna om dina önskemål, t.ex våningsplan, läge eller tillträde"
			>
				
			</textarea>
		</div>
	);
};