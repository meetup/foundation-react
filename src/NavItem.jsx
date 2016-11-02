import React from 'react';
import cx from 'classnames';

/**
 * Navigation item component using SQ2 styles
 * @see {@link http://meetup.github.io/sassquatch2/}
 * @module NavItem
 */
class NavItem extends React.Component {
	render() {
		const {
			className,
			children,
			...other
		} = this.props;

		const classNames = cx(
			'row-item',
			'row-item--shrink',
			'row-item--alignMiddle',
			'padding--right',
			'text--big',
			className
		);

		return (
			<li
				className={classNames}
				{...other}>
					{children}
			</li>
		);
	}
}

export default NavItem;
