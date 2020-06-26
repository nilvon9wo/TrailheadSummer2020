public with sharing class DAO_ContactSelector {
    private DAO_ContactSelector(){
    }

    private static DAO_ContactSelector instance;
    public static DAO_ContactSelector getInstance() {
        if (instance == null) {
            instance = new DAO_ContactSelector();
        }
        return instance;
    }

    public List<Contact> selectByAccountId(Set<Id> accountIdSet) {
        return [
                SELECT Email, FirstName, LastName, Name, Title, Phone, Picture_URL__c
                FROM Contact
                WHERE AccountId IN :accountIdSet
                WITH SECURITY_ENFORCED
        ];
    }

    public List<Contact> selectAll() {
        return [
                SELECT Email, FirstName, LastName, Name, Title, Phone, Picture_URL__c
                FROM Contact
                WITH SECURITY_ENFORCED
                ORDER BY Name
        ];
    }
}