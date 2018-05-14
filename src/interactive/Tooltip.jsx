import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import FloatingPosition from '../utils/components/FloatingPosition';

/**
 * @module Tooltip
 */
class Tooltip extends React.PureComponent {
	constructor(props) {
		super(props);

		this.onBlur = this.onBlur.bind(this);
		this.closeContent = this.closeContent.bind(this);
		this.openContent = this.openContent.bind(this);

		this.state = {
			isActive: props.isActive || false,
		};

	}

	closeContent(e) {
		this.setState(() => ({ isActive: false }));

		if (this.props.onBlur) {
			this.props.onBlur(e);
		}
		if (this.props.onMouseLeave) {
			this.props.onMouseLeave(e);
		}
	}

	openContent(e) {
		this.setState(() => ({isActive: true}));

		if (this.props.onFocus) {
			this.props.onFocus(e);
		}
		if (this.props.onMouseEnter) {
			this.props.onMouseEnter(e);
		}
	}

	onBlur(e) {
		setTimeout(() => {
			if (!this.contentRef.contains(document.activeElement)) {
				this.closeContent(e);
			}
		}, 1);
	}

	render() {
		const {
			className,
			trigger,
			content,
			align, // eslint-disable-line no-unused-vars
			maxWidth,
			minWidth,
			noPortal,
			id,
			direction,
			manualToggle,
			...other
		} = this.props;

		// Do not pass along to children
		delete other.isActive;

		const classNames = {
			dropdown: cx(
				className,
				"popup", {
					"popup--noPortal": noPortal
				}
			)
		};

		const isActive = manualToggle
			? this.props.isActive
			: this.state.isActive;

		const getTrigger = () => {
			return this.triggerRef;
		};

		const getContent = () => {
			return this.contentRef;
		};

		return(
			<div
				className={classNames.dropdown}
				onMouseLeave={this.closeContent}
				{...other}
			>
				<div
					ref={el => (this.triggerRef = el)}
					className="popup-trigger"
					onFocus={this.openContent}
					onBlur={this.onBlur}
					onMouseEnter={this.openContent}
					aria-labelledby={id}
				>
					{trigger}
				</div>
				{ isActive &&
					<FloatingPosition
						getTrigger={getTrigger}
						getContent={getContent}
						noPortal={noPortal}
						align={align}
						direction={direction}
					>
						{({
							top,
							left,
							align
						}) => (
							<div
								ref={el => (this.contentRef = el)}
								className={cx(
									"popup-content tooltip-content",
									{
										"popup-content--right": align === "right",
										"popup-content--left": align === "left",
										"popup-content--center": align === "center",
										"popup-content--top": direction === "top",
										"display--none": !isActive,
										"display--block": isActive,
									}
								)}
								aria-hidden={!isActive}
								id={id}
								role="tooltip"
								style={{
									left: left,
									top: top,
									minWidth: minWidth,
									maxWidth: maxWidth
								}}
							>
								<div
									className={cx(
										"popup-bubble tooltip-bubble inverted",
										{
											"popup-bubble--active": isActive,
											"popup-bubble--right": align === "right",
											"popup-bubble--left": align === "left",
											"popup-bubble--center": align === "center",
											"popup-bubble--top": direction === "top",
										}
									)}
								>
									{content}
								</div>
							</div>
						)}
					</FloatingPosition>
				}
			</div>
		);
	}

}

Tooltip.defaultProps = {
	direction: "bottom",
	maxWidth: "384px",
	minWidth: "0px",
	noPortal: false
};

Tooltip.propTypes = {
	id: PropTypes.string.isRequired,
	trigger: PropTypes.element.isRequired,
	content: PropTypes.element,
	align: PropTypes.oneOf(["left", "right", "center"]).isRequired,
	direction: PropTypes.oneOf(["top", "bottom"]).isRequired,
	className: PropTypes.string,
	isActive: PropTypes.bool,
	manualToggle: PropTypes.bool,
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	noPortal: PropTypes.bool,
};


export default Tooltip;