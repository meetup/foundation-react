import React from 'react';
import TimeInput from './TimeInput';
import { storiesOf } from '@storybook/react';
import { decorateWithInfo } from '../utils/decorators';

storiesOf('TimeInput', module)
	.addWithInfo(
		'default',
		'renders a time input, provided values are in 24hr time (ex 13:00)',
		() => (
			<TimeInput name='time' value='14:30' label='Dentist appt time' forceTextInput />
		)
	)
	.addWithInfo(
		'12hr time',
		'this example only makes sense in a browser that does not support input[type=time]. renders a time input, provided values are in 24hr time (ex 13:00), but are displayed in the input as 12 hour time',
		() => (
			<TimeInput is24Hr={false} name='time' value='14:30' label='Dentist appt time' forceTextInput />
		)
	)
	.addDecorator(decorateWithInfo)
	.add('initial value', () => {
		return (<div className='span--25'>
			<TimeInput name='time' value='13:00' label='End time' />
		</div>);
	})
	.add('required', () => {
		return (<div className='span--25'>
			<TimeInput name='time' value='13:00' required label='End time' />
		</div>);
	})
	.add('with error', () => {
		return (<div className='span--25'>
			<TimeInput name='time' value='13:00' label='End time' error='Sorry, out of time!' />
		</div>);
	})
	.add('with helper text', () => {
		return (<div className='span--25'>
			<TimeInput name='time' value='13:00' label='End time' helperText='Lorem ipsum is simply dummy text' />
		</div>);
	});
