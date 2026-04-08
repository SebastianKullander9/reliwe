/*interface TextAreaProps {
	
}*/

export default function TextArea() {

	return (
		<div className="flex flex-col">
			<textarea
				className="bg-[var(--reliwe-green-accent)] rounded-3xl p-4 focus:outline-[var(--reliwe-green)]"
				rows={5}
				placeholder="Berätta gärna mer om dina önskemål"
			>
				
			</textarea>
		</div>
	);
};