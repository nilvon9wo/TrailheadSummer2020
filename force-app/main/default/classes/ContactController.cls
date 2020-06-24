public with sharing class ContactController {
    private DAO_ContactSelector contactSelector;

    private ContactController(DAO_ContactSelector contactSelector) {
        this.contactSelector = contactSelector;
    }

    public ContactController() {
        this(DAO_ContactSelector.getInstance());
    }

    @AuraEnabled(Cacheable=true)
    public static List<Contact> getContacts() {
        return new ContactController()
                .selectAllContacts();
    }

    private List<Contact> selectAllContacts() {
        return this.contactSelector.selectAll();
    }
}