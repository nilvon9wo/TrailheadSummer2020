public with sharing class AccountController {
    private DAO_AccountSelector accountSelector;
    private DAO_ContactSelector contactSelector;

    private AccountController(DAO_AccountSelector accountSelector, DAO_ContactSelector contactSelector) {
        this.accountSelector = accountSelector;
        this.contactSelector = contactSelector;
    }

    public AccountController() {
        this(DAO_AccountSelector.getInstance(), DAO_ContactSelector.getInstance());
    }

    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccounts() {
        return new AccountController()
                .selectAllAccounts();
    }

    private List<Account> selectAllAccounts() {
        return this.accountSelector.selectAll();
    }

    @AuraEnabled(Cacheable=true)
    public static List<Contact> getRelatedContacts(Id accountId) {
        return new AccountController()
                .selectContactsByAccountId(accountId);
    }

    private List<Contact> selectContactsByAccountId(Id accountId) {
        return this.contactSelector.selectByAccountId(new Set<Id>{accountId});
    }
}