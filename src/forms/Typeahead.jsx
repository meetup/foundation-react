import PropTypes from 'prop-types';
import React from 'react';
import Downshift from 'downshift';
import cx from 'classnames';

import TextInput from './TextInput';

export const TA_DROPDOWN_CLASSNAME = 'typeahead-dropdown';
export const TA_ITEM_CLASSNAME = 'typeahead-item';

/**
 * @module Typeahead
 */
class Typeahead extends React.PureComponent {
	constructor(props) {
		super(props);

		this.handleSingleSelection = this.handleSingleSelection.bind(this);
		this.handleMultiselectSelect = this.handleMultiselectSelect.bind(this);
		this.stateReducer = this.stateReducer.bind(this);
	}

	handleMultiselectSelect(item) {
		this.props.onSelect(item, [...this.props.multiSelectValues, item]);
	}

	handleSingleSelection(selectedItem, stateAndHelpers) {
		!this.props.multiSelect && this.props.onSelect && this.props.onSelect(selectedItem, stateAndHelpers);
	}

	stateReducer(state, changes) {
		switch (changes.type) {
			case Downshift.stateChangeTypes.keyDownEnter:
			case Downshift.stateChangeTypes.clickItem:
				this.handleMultiselectSelect(changes.selectedItem);

				return {
					...changes,
					selectedItem: this.props.multiSelectValues,
					isOpen: this.props.openOnFocus,
				};

			case Downshift.stateChangeTypes.blurInput:
				return {
					...changes,
					isOpen: this.props.openOnFocus,
				};

			default:
				return changes;
		}
	}

	render() {
		const {
			inputProps,
			height,
			items,
			multiSelect,
			multiSelectValues,
			openOnFocus,
			...other
		} = this.props;

		delete other.onSelect;

		return (
			<Downshift
				onSelect={this.handleSingleSelection}
				selectedItem={multiSelectValues}
				stateReducer={multiSelect && this.stateReducer}
				{...other}
			>
				{({
					getInputProps,
					getItemProps,
					isOpen,
					highlightedIndex,
					selectedItem,
					openMenu,
					closeMenu
				}) =>
				(<div className="typeahead">
					<TextInput
						{...getInputProps({
							...inputProps,
							className: 'typeahead-input',
							onFocus: openOnFocus && openMenu
						})}
					/>
					{Boolean(isOpen && items && items.length)
						&&
							<div
								className={TA_DROPDOWN_CLASSNAME}
								style={height && {
									height: height,
									overflowY: 'scroll'
								}}
								>
								{items &&
									items.map((item, i) => {
										const selected = selectedItem && selectedItem.includes(item.props.value);

										return (
											<div
												{...getItemProps({
													item: item.props.value,
													i,
													key: `typeaheadItem-${i}`,
													id: `typeaheadItem-${i}`,
													className: cx(
														TA_ITEM_CLASSNAME,
														item.props.className,
														{
															'typeahead-item--isActive': highlightedIndex == i,
														}
													),
													...item.props
												})}
											>
												{
													typeof item.props.children === 'function'
														? item.props.children({ isSelected: selected })
														: item.props.children
												}
											</div>
										);}
									)
								}
							</div>
					}
				</div>)}
			</Downshift>
		);
	}
}

Typeahead.propTypes = {
	inputProps: PropTypes.object,
	items: PropTypes.arrayOf(PropTypes.element),
	height: PropTypes.string
};

export default Typeahead;
