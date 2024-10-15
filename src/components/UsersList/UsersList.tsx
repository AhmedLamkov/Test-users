import { useAppSelector } from '../../hooks/store';
import './UsersList.scss';
import UserItem from '../UserItem';
import { useMemo } from 'react';
	
const UsersList = () => {
	const { users, sortBy, activeUserId } = useAppSelector(state => ({
		users: state.users,
		sortBy: state.sortBy,
		activeUserId: state.activeUserId,
	}));

	const sortedUsers = useMemo(() => {
		return users?.concat().sort((prev, next) => {
			if (sortBy === 'city') {
				return prev.address.city.localeCompare(next.address.city);
			}

			if (sortBy === 'company') {
				return prev.company.name.localeCompare(next.company.name);
			}

			return 0;
		});
	}, [users, sortBy]);

	if (activeUserId) return null;

	return (
		<div className="user-list">
			<h1 className="user-list__title">Список пользователей</h1>
			<div className="user-list__wrapper">
				{sortedUsers?.map((user) => (
					<UserItem user={user} key={user.id}/>
				))}
			</div>
			<div className='user-list__result'>Найдено {users?.length ?? 0} пользователей</div>
		</div>
	);
};

export default UsersList;