public with sharing class AccountListControllerLwc {
    private DAO_AccountSelector accountSelector;
    private DAO_ContactSelector contactSelector;

    private AccountListControllerLwc(DAO_AccountSelector accountSelector, DAO_ContactSelector contactSelector) {
        this.accountSelector = accountSelector;
        this.contactSelector = contactSelector;
    }

    public AccountListControllerLwc() {
        this(DAO_AccountSelector.getInstance(), DAO_ContactSelector.getInstance());
    }

    @AuraEnabled(Cacheable=true)
    public static List<Account> queryAccountsByEmployeeNumber(Integer numberOfEmployees) {
        return new AccountListControllerLwc()
                .selectByNumberOfEmployees(numberOfEmployees);
    }

    private List<Account> selectByNumberOfEmployees(Integer numberOfEmployees) {
        return this.accountSelector.selectByNumberOfEmployees(numberOfEmployees);
    }

    @AuraEnabled(Cacheable=true)
    public static List<Account> queryAccountsByRevenue(Decimal annualRevenue) {
        /**
                 return [
                SELECT Name, AnnualRevenue, Industry
                FROM Account
                WHERE AnnualRevenue >= :annualRevenue
        ];

*/
        return new AccountListControllerLwc()
                .selectByAnnualRevenue(annualRevenue);
    }

    private List<Account> selectByAnnualRevenue(Decimal annualRevenue) {
        return this.accountSelector.selectByAnnualRevenue(annualRevenue);
    }

    @AuraEnabled(Cacheable=true)
    public static List<Contact> queryRelatedContacts(Id accountId) {
        return new AccountListControllerLwc()
                .selectContactsByAccountId(accountId);
    }

    private List<Contact> selectContactsByAccountId(Id accountId) {
        return this.contactSelector.selectByAccountId(new Set<Id>{accountId});
    }
}