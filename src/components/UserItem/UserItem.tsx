import './UserItem.scss';
import { User } from '../../types';
import { MouseEvent, useCallback } from 'react';
import { useAppDispatch } from '../../hooks/store';
import { setactiveUserId } from '../../store/Users';

interface Props {
	user: User;
}

const UserItem = ({ user }: Props) => {
	const dispatch = useAppDispatch();

	const handleClick = useCallback((event: MouseEvent<HTMLElement>)=> {
		const userId = event.currentTarget.dataset.userId;
		userId && dispatch(setactiveUserId(parseInt(userId)));
	}, [dispatch]);

	return (
		<div className="user" onClick={handleClick} data-user-id={user.id}>
			<div className='user__content'>
				<div className='user__data'>
					<div className="user__text">
						<span className="user__description">ФИО:</span>
						<span className="user__name">{user.name}</span>
					</div>
					<div className="user__text">
						<span className="user__description">город:</span>
						<span className="user__name">{user.address.city}</span>
					</div>
					<div className="user__text">
						<span className="user__description">компания:</span>
						<span className="user__name">{user.company.name}</span>
					</div>
				</div>
				<div className="user__details">Подробнее</div>
			</div>
		</div>
	);
};

export default UserItem;