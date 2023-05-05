/**************************************************************************************
  * @description This class is used to get Contact Details
 **************************************************************************************/
public with sharing class ContactController {
   
    /**************************************************************************************
     * @description This method is used to get Contact Details
       @return cont
    **************************************************************************************/
    @AuraEnabled(cacheable=true) 
    public static List<Contact> getContact() {
       
        List<Contact> cont= [SELECT Id, Name, Email, Account.Name 
                                FROM Contact 
                                    Where AccountId!= null 
                                    order by CreatedDate desc];
        return cont;                            
    }
}