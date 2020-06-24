public with sharing class AccountListControllerVisualforce {
    private ApexPages.StandardController standardController;
    DAO_AccountSelector accountSelector;
    DAO_ContactSelector contactSelector;

    public List<Account> accounts { get; private set; }
    public List<Contact> contacts { get; private set; }

    private AccountListControllerVisualforce(
            ApexPages.StandardController standardController,
            DAO_AccountSelector accountSelector,
            DAO_ContactSelector contactSelector
    ) {
        this.standardController = standardController;
        this.accountSelector = accountSelector;
        this.contactSelector = contactSelector;
        this.contacts = new List<Contact>();
    }

    public AccountListControllerVisualforce(ApexPages.StandardController standardController) {
        this(standardController, DAO_AccountSelector.getInstance(), DAO_ContactSelector.getInstance());
    }

    public Integer numberOfEmployees { get; set; }

    public void queryAccounts() {
        this.accounts = this.accountSelector.selectByNumberOfEmployees(this.numberOfEmployees);
    }

    public void queryRelatedContacts() {
        this.contacts = this.contactSelector.selectByAccountId(new Set<Id>{this.standardController.getId()});
    }
}