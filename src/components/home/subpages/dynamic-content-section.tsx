
import '../../../styles/dynamic-content/dynamic-content-section.css';

export default function DynamicContentSection({ currentPage }: { currentPage: JSX.Element }) {
	return <div className="dynamic-content-section">{currentPage}</div>;
}
