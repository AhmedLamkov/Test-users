import { User } from "../types";

export class ApiService {
	static async getUsers() {
		const response = await fetch('https://jsonplaceholder.typicode.com/users');

		return response.json();
	}

	static async editUser(user: Omit<User, 'company'>, comment?: string) {
		fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				...user,
				comment,
			})
		})
		.then((response) => response.json())
		.then((json) => console.log(json));
	}
}

export default ApiService;
