import "./SortPanel.scss";
import Button from "../Button";
import { useAppDispatch } from "../../hooks/store"; 
import { useCallback, MouseEvent } from "react";
import { sortBy } from "../../types";
import { setSortBy } from "../../store/Users";

const SortPanel = () => {
	const dispatch = useAppDispatch();

	const handleSort = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		dispatch(setSortBy(event.currentTarget.value as sortBy));
	}, [dispatch]);

	return (
		<div className="sort-panel">
			<h2 className="sort-panel__title">Сортировка</h2>
			<Button onClick={handleSort} value="city">По городу</Button>
			<Button onClick={handleSort} value="company">По компании</Button>
		</div>
	);
};

export default SortPanel;