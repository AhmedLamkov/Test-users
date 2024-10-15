export interface User {
	id: number;
  name: string;
	username:string;
	email: string;
	address: {
		street: string;
		zipcode: string;
		city: string;
	};
	phone: string;
	website: string;
	company: {	
		name: string;
	};
}

export type sortBy = 'company' | 'city'

export interface UsersState {
	users?: User[],
	activeUserId?: number,
	sortBy?: 'company' | 'city';
}