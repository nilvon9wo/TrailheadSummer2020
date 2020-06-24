import {createElement} from 'lwc';
import WireLDS from 'c/wireLDS';
import {getRecord} from 'lightning/uiRecordApi';
import {registerLdsTestWireAdapter} from '@salesforce/sfdx-lwc-jest';

const mockGetRecord = require('./data/getRecord.json');
const getRecordAdapter = registerLdsTestWireAdapter(getRecord);

describe('c-wire-l-d-s', () => {
    afterEach(() => {
        const body = document.body;
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
    });

    describe('getRecord @wire data', () => {
        it('renders contact details', () => {
            const element = createElement('c-wire-l-d-s', {
                is: WireLDS
            });
            document.body.appendChild(element);
            getRecordAdapter.emit(mockGetRecord);
            return Promise.resolve()
                .then(() => {
                    assertElement(element, mockGetRecord, 'Name', 'Account Name', 'Name', );
                    assertElement(element, mockGetRecord, 'Industry');
                    assertElement(element, mockGetRecord, 'Phone');
                    assertElement(element, mockGetRecord, 'Owner', 'Owner', 'Owner', 'displayValue');
                });
        });
    });

    describe('getRecord @wire error', () => {
        it('shows error message', () => {
            const element = createElement('c-wire-l-d-s', {
                is: WireLDS
            });
            document.body.appendChild(element);

            getRecordAdapter.error();

            return Promise.resolve()
                .then(() => {
                    const errorElement = element.shadowRoot.querySelector('p');
                    expect(errorElement).not.toBeNull();
                    expect(errorElement.textContent).toBe('No account found.');
                });
        });
    });

    function assertElement(element, mockGetRecord, fieldName, label = fieldName, propertyName = label, targetValue = 'value') {
        const industryElement = element.shadowRoot.querySelector(`p.account${fieldName}`);
        expect(industryElement.textContent).toBe(
            `${label}: ${mockGetRecord.fields[propertyName][targetValue]}`
        )
    }
});

