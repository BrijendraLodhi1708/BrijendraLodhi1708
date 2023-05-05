/**************************************************************************************
  * @description This class is used to get Account Name Details
 **************************************************************************************/
public with sharing class getAccountName {
    
 /**************************************************************************************
  * @description This class is used to get Contact Details
    @return acc
  **************************************************************************************/
    @AuraEnabled(cacheable=true)
    public static List<Account> getName(){
        list<Account> acc = [Select Id,name 
                             FROM Account 
                             WHERE Id not In (select AccountId from Contact) LIMIT 15 ];

        return acc;                     
    }

}