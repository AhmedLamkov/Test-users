import './UsersProfile.scss';
import Input from '../Input';
import Button from '../Button';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { setactiveUserId, setUsers } from '../../store/Users';
import ApiService from '../../api/apiService';

interface Errors {
	name?: boolean;
	username?: boolean;
	email?: boolean;
	street?: boolean;
	city?: boolean;
	zipcode?: boolean;
	phone?: boolean;
	website?: boolean;
}

const UsersProfile = () => {
	const dispatch = useAppDispatch();
	const { activeUserId, users } = useAppSelector((state) => ({
		activeUserId: state.activeUserId,
		users: state.users,
	}));
	
	const [isEditing, setIsEditing] = useState(false);
	const [errors, setErrors] = useState<Errors>({});

	const hasErrors = useMemo(() => Object.values(errors).includes(true), [errors]);

	const [name, setName] = useState('');
	const [username, setusername] = useState('');
	const [email, setEmail] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [zipcode, setZipcode] = useState('');
	const [phone, setPhone]= useState('');
	const [website, setWebsite] = useState('');
	const [comment, setComment] = useState('');

	const startEditing = useCallback(() => {
		setIsEditing(true);
	}, []);


	const handleChangeField = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.currentTarget;
		if(!value) {
			setErrors(prev => ({ ...prev, [name]: true }))
		} else {
			setErrors(prev => ({ ...prev, [name]: undefined }))
		}

		switch (name) {
			case 'name':
				setName(value);
				break
			case 'username':
				setusername(value);
				break
			case 'email':
				setEmail(value);
				break
			case 'street':
				setStreet(value);
				break
			case 'city':
				setCity(value);
				break
			case 'zipcode':
				setZipcode(value);
				break
			case 'phone':
				setPhone(value);
				break
			case 'website':
				setWebsite(value);
				break
			case 'comment':
				setComment(value);
				break
		}
	}, []);

	const handleSetComment = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setComment(event.currentTarget.value);
	}, []);

	useEffect(() => {
		const activeUser = users?.find(user => user.id === activeUserId);

		if (!activeUser) return;

		setName(activeUser.name)
		setusername(activeUser.username)
		setEmail(activeUser.email)
		setStreet(activeUser.address.street)
		setCity(activeUser.address.city)
		setZipcode(activeUser.address.zipcode)
		setPhone(activeUser.phone)
		setWebsite(activeUser.website)
	}, [activeUserId, users]);

	const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!activeUserId || !users || hasErrors) return;
	
		ApiService.editUser({
			id: activeUserId,
			name,
			username,
			email,
			address: {
				street,
				zipcode,
				city,
			},
			phone,
			website,
		}, comment);

		const newUsers = users?.map(user => user.id === activeUserId
			? {
				...user,
				name,
				username,
				email,
				address: {
					...user.address,
					street,
					zipcode,
					city,
				},
				phone,
				website,
			}
			: user);

		dispatch(setUsers(newUsers));
		dispatch(setactiveUserId(undefined));
		setIsEditing(false);
	}, [activeUserId, city, comment, dispatch, email, hasErrors, name, phone, street, username, users, website, zipcode])

	if (!activeUserId) return null;

	const submittable = isEditing && !hasErrors;

	return (
		<div className='user-profile'>
			<div className='user-profile__block'>
				<h2 className='user-profile__title'>Профиль пользователя</h2>
				<Button size='large' onClick={startEditing}>Редактировать</Button>
			</div>
			<form className='user-profile__form' onSubmit={handleSubmit}>
				<Input label='Name' name='name' value={name} onChange={handleChangeField} disabled={!isEditing} error={errors.name}></Input>
				<Input label='User name' name='username' value={username} onChange={handleChangeField} disabled={!isEditing} error={errors.username}></Input>
				<Input type='email' label='Email' name='email' value={email} onChange={handleChangeField} disabled={!isEditing} error={errors.email}></Input>
				<Input label='Street' name='street' value={street} onChange={handleChangeField} disabled={!isEditing} error={errors.street}></Input>
				<Input label='City' name='city' value={city} onChange={handleChangeField} disabled={!isEditing} error={errors.city}></Input>
				<Input label='Zip code' name='zipcode' value={zipcode} onChange={handleChangeField} disabled={!isEditing} error={errors.zipcode}></Input>
				<Input type='tel' label='Phone' name='phone' value={phone} onChange={handleChangeField} disabled={!isEditing} error={errors.phone}></Input>
				<Input label='Website' name='website' value={website} onChange={handleChangeField} disabled={!isEditing} error={errors.website}></Input>
				<Input label='Comment' name='comment' value={comment} onChange={handleSetComment} disabled={!isEditing} fullWidth={true}></Input>
				<Button color='green' type='submit' disabled={!submittable}>Отправить</Button>
			</form>
		</div>
	);
};

export default UsersProfile;