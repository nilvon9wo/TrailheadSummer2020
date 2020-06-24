public with sharing class DAO_AccountSelector {
    private DAO_AccountSelector() {
    }

    private static DAO_AccountSelector instance;
    public static DAO_AccountSelector getInstance() {
        if (instance == null) {
            instance = new DAO_AccountSelector();
        }
        return instance;
    }

    public List<Account> selectAll() {
        return [
                SELECT Name, AnnualRevenue, Industry
                FROM Account
                WITH SECURITY_ENFORCED
                ORDER BY Name
        ];
    }

    public List<Account> selectByNumberOfEmployees(Integer numberOfEmployees) {
        return [
                SELECT Name, AnnualRevenue, Industry
                FROM Account
                WHERE NumberOfEmployees = :numberOfEmployees
        ];
    }

    public List<Account> selectByAnnualRevenue(Decimal annualRevenue) {
        return [
                SELECT Name, AnnualRevenue, Industry
                FROM Account
                WHERE AnnualRevenue >= :annualRevenue
        ];
    }
}