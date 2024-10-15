import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import './Button.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: 'regular' | 'large';
	color?: 'green' | 'blue';
};


const Button = ({ size = 'regular', color = 'blue', ...props  }: Props) => {
	return (
		<button {...props} className={classNames(size, color)}></button>
	);
};

export default Button;