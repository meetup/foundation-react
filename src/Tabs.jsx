import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

/**
 * @module Tab
 */
class Tab extends React.Component {
	render() {
		const {
			url,
			name,
			isCurrent,
			...other
		} = this.props;

		const classNames = cx(
			'tabs-tab align--center atMedium_align--left',
			{'tabs-tab--selected': isCurrent}
		);

		return(
			<li
				className={classNames}
				{...other}
			>
				<Link to={url}>
					{name}
				</Link>
			</li>
		);
	}
}

/**
 * @module Tabs
 */
class Tabs extends React.Component {

	render() {
		const {
			className,
			tabList,
			activeTab,
			bordered,
			...other
		} = this.props;

		const classNames = cx(
			'tabs',
			className
		);

		return (
			<nav className={cx('padding--left padding--right tabs-container', {'tabs-container--bordered': bordered})}>
				<ul className={classNames} {...other}>
					{tabList.map((tab,i)=>{
						return (
							<Tab
								isCurrent={(activeTab === tab.id)}
								key={i}
								url={tab.url}
								name={tab.name}
							/>
						);
					})}
				</ul>
			</nav>
		);
	}
}

Tabs.propTypes = {
	tabList: React.PropTypes.array
};

export default Tabs;
