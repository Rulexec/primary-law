import React from 'react';
import cn from 'classnames';

export { Hx };

function Hx(props) {
	let { level, className, classes, children } = props;

	let HComponent;

	switch (level) {
		case 1:
			HComponent = function H1(props) {
				return (
					<h1 className={cn(className, classes.h1)} {...props}>
						{props.children}
					</h1>
				);
			};
			break;
		case 2:
			HComponent = function H1(props) {
				return (
					<h2 className={cn(className, classes.h2)} {...props}>
						{props.children}
					</h2>
				);
			};
			break;
		case 3:
			HComponent = function H1(props) {
				return (
					<h3 className={cn(className, classes.h3)} {...props}>
						{props.children}
					</h3>
				);
			};
			break;
		case 4:
		default:
			HComponent = function H1(props) {
				return (
					<h4 className={cn(className, classes.h4)} {...props}>
						{props.children}
					</h4>
				);
			};
			break;
	}

	return <HComponent>{children}</HComponent>;
}
Hx.defaultProps = {
	classes: {},
};
