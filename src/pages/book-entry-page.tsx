import AddByBook from '../components/home/subpages/data-entry/add-by-book';

export default function AddByBookPage() {
	const inputs = [ 'Material Name', 'Material Image', 'Material Number', 'Material Book Link' ];
	return (
		<div className="dynamic-subpage">
			<AddByBook {...{ inputs }} />
		</div>
	);
}
