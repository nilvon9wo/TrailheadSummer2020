import {createElement} from 'lwc';
import WireApex from 'c/wireApex';
import {registerApexTestWireAdapter} from '@salesforce/sfdx-lwc-jest';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const mockGetAccounts = require('./data/getAccounts.json');
const mockGetAccountsNoRecords = require('./data/getAccountsNoRecords.json');
const getAccountsAdapter = registerApexTestWireAdapter(getAccounts);

describe('c-write-apex', () => {
    afterEach(() => {
        const body = document.body;
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
        jest.clearAllMocks();
    });

    describe('getAccounts @wire data', () => {
        it('renders six records', () => {
            const element = createElement('c-wire-apex', {
                is: WireApex
            });
            document.body.appendChild(element);
            getAccountsAdapter.emit(mockGetAccounts);
            return Promise.resolve()
                .then(() => {
                    const accountElements = element.shadowRoot.querySelectorAll('p');
                    expect(accountElements.length).toBe(mockGetAccounts.length);
                    expect(accountElements[0].textContent).toBe(mockGetAccounts[0].Name);
                });
        });

        it('renders no items when no records are returned', () => {
            const element = createElement('c-wire-apex', {
                is: WireApex
            });
            document.body.appendChild(element);
            getAccountsAdapter.emit(mockGetAccountsNoRecords);
            return Promise.resolve()
                .then(() => {
                    const accountElements = element.shadowRoot.querySelectorAll('p');
                    expect(accountElements.length).toBe(mockGetAccountsNoRecords.length);
                });
        });
    });

    describe('getAccounts @wire error', () => {
        it('shows error panel element', () => {
            const element = createElement('c-wire-apex', {
                is: WireApex
            });
            document.body.appendChild(element);
            getAccountsAdapter.error();
            return Promise.resolve()
                .then(() => {
                    const errorElement = element.shadowRoot.querySelector('p');
                    expect(errorElement).not.toBeNull();
                    expect(errorElement.textContent).toBe('No accounts found.');
                });
        });
    });
});