import React from 'react';
import createReactClass from 'create-react-class';
import TestUtils from 'react-addons-test-utils';

export const variantTest = (FoundationComponent, className, variants) => {
	variants.forEach(variant => {
		const props = {
			[variant]: true
		};

		const component = TestUtils.renderIntoDocument(<FoundationComponent {...props} />);
		expect(() => TestUtils.findRenderedDOMComponentWithClass(component, `${className}--${variant}`)).not.toThrow();
	});
};

export const hasChildByClassName = (el, className) => {
	const hasClass = !!el.getElementsByClassName(className).length;
	expect(hasClass).toBe(true);
};

export const hasAttribute = (el, attr, value) => {
	const elAttrValue = el.getAttribute(attr);
	expect(elAttrValue).not.toBeNull();
	if (value !== undefined) {
		expect(` ${elAttrValue} `.indexOf(` ${value} `)).not.toBe(-1);
	}
};

export const hasRoleAttribute = (el, roleName) => {
	hasAttribute(el, 'role', roleName);
};

export const componentHasProperty = (component, prop, value) => {
	expect(component && component.props && component.props[prop] === value).toBe(true);
};

// Note: functional components need to be
// wrapped it in a stateful component to use TestUtils effectively
export const TestWrapper = createReactClass({
	render: function() {
		return (
			<div>{this.props.children}</div>
		);
	}
});
