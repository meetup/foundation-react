import React from "react";
import { storiesOf } from "@storybook/react";
import { decorateWithBasics } from '../utils/decorators';

import Typeahead from './Typeahead';
import TypeaheadItem from './TypeaheadItem';
import Checkbox from './Checkbox';

const typeaheadItems = [
	<TypeaheadItem value="Item One">
		<div>
			<h3 className="text--bold">Item One</h3>
			<p>Is super cool</p>
		</div>
	</TypeaheadItem>,
	<TypeaheadItem value="Item Two">
		<div>
			<h3 className="text--bold">Item Two</h3>
			<p>Is super cool</p>
		</div>
	</TypeaheadItem>,
	<TypeaheadItem value="Item Three">
		<div>
			<h3 className="text--bold">Item Three</h3>
			<p>Is super cool</p>
		</div>
	</TypeaheadItem>,
	<TypeaheadItem value="Item Four">
		<div>
			<h3 className="text--bold">Item Four</h3>
			<p>Is super cool</p>
		</div>
	</TypeaheadItem>
];

const typeaheadCheckboxes = [
	<TypeaheadItem value="Item One">
		{({isSelected}) => (
			<Checkbox controlled={false} label="Item One" checked={isSelected} name="taItems" value="item1" />
		)}
	</TypeaheadItem>,
	<TypeaheadItem value="Item Two">
		{({isSelected}) => (
			<Checkbox controlled={false} label="Item Two" checked={isSelected} name="taItems" value="item2" />
		)}
	</TypeaheadItem>,
	<TypeaheadItem value="Item Three">
		{({isSelected}) => (
			<Checkbox controlled={false} label="Item Three" checked={isSelected} name="taItems" value="item3" />
		)}
	</TypeaheadItem>,
	<TypeaheadItem value="Item Four">
		{({isSelected}) => (
			<Checkbox controlled={false} label="Item Four" checked={isSelected} name="taItems" value="item4" />
		)}
	</TypeaheadItem>
];

/**
 * @module MultiselectTypeahead
 */
class MultiselectTypeahead extends React.PureComponent {
	constructor(props) {
		super(props);

		this.selectHandler = this.selectHandler.bind(this);

		this.state = {
			selectedItems: []
		};
	}

	selectHandler(prevSelection, selectedItems) {
		const filteredItems = this.state.selectedItems.includes(prevSelection)
			? this.state.selectedItems.filter(item => item !== prevSelection)
			: selectedItems;

		this.setState(() => ({
			selectedItems: filteredItems
		}));
	}

	render() {
		const {items, ...other} = this.props;

		return (
			<div>
				<div className="chunk">
					{this.state.selectedItems}
				</div>
				<Typeahead
					multiSelect
					openOnFocus
					multiSelectValues={this.state.selectedItems}
					items={items}
					onSelect={this.selectHandler}
					{...other}
				/>
			</div>
		);
	}
}

storiesOf("Typeahead", module)
	.addDecorator(decorateWithBasics)
	.addWithInfo(
		"default",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"scrolling with max height",
		() => (
			<div>
				<Typeahead
					items={typeaheadItems}
					height="100px"
					inputProps={{
						label: 'Labeled typeahead',
						name: 'typeaheadInputName'
					}}
				/>
			</div>
		)
	)
	.addWithInfo(
		"with value",
		() => (
			<Typeahead
				items={typeaheadItems}
				defaultSelectedItem={typeaheadItems[0].props.value}
				inputProps={{
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"with placeholder",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					placeholder: 'Placeholder text',
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"with helperText",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					helperText: 'Some helper info',
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"disabled",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					disabled: true,
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"error",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					error: 'Not so fast. You have an error.',
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"required",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					required: true,
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"search",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					isSearch: true,
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"with icon",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					iconShape: 'search',
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"multiple values",
		() => (
			<MultiselectTypeahead
				items={typeaheadCheckboxes}
				inputProps={{
					label: 'Labeled typeahead',
					name: 'typeaheadInputName',
					placeholder: 'Placeholder text'
				}}
			/>
		)
	)
	;
