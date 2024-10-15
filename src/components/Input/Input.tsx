import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import './Input.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	fullWidth?: boolean;
	error?: boolean;
};

const Input = ({ label, fullWidth, error, ...props }: Props) => {
	return (
		<div className="input">
			<label className="input__label">{label}</label>
			<input className={classNames('input__input', { fullWidth , error: error })} {...props} />
		</div>
	);
};

export default Input;