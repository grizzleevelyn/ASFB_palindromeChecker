public with sharing class createSentence {

    @AuraEnabled
    public static List<Sentence__c> insertSentence(String JSONpalindrome, String JSONcharacters){

        //deserialize JSON from palindromicSentences.js into Map<String, Boolean>()
        Map<String, Boolean> sentenceMap = (Map<String, Boolean>) JSON.deserializeStrict(JSONpalindrome, Map<String, Boolean>.class);

        //deserialize JSON from palindromicSentences.js into Map<String, Map<String, String>()
        Map<String, Map<String, String>> characterMap = (Map<String, Map<String, String>>) JSON.deserializeStrict(JSONcharacters, Map<String, Map<String, String>>.class);

        //create storage list to reduce DML operations
        List<Sentence__c> newSentences = new List<Sentence__c>();

        //iterate through sentenceMap via key string
        for(String keySentence : sentenceMap.keySet()) {
            //create new Sentence__c object based on specified key value pair
            Sentence__c newSent = new Sentence__c();

            //assignation of values
            newSent.Sentence__c = keySentence;
            newSent.IsPalindrome__c = Boolean.valueOf(sentenceMap.get(keySentence));
            
            //ternary operator null checks to assign numerical values to letter fields
            newSent.A__c = characterMap.get(keySentence).get('a') != null ? Integer.valueOf(characterMap.get(keySentence).get('a')) : 0;
            newSent.B__c = characterMap.get(keySentence).get('b') != null ? Integer.valueOf(characterMap.get(keySentence).get('b')) : 0;
            newSent.C__c = characterMap.get(keySentence).get('c') != null ? Integer.valueOf(characterMap.get(keySentence).get('c')) : 0;
            newSent.D__c = characterMap.get(keySentence).get('d') != null ? Integer.valueOf(characterMap.get(keySentence).get('d')) : 0;
            newSent.E__c = characterMap.get(keySentence).get('e') != null ? Integer.valueOf(characterMap.get(keySentence).get('e')) : 0;
            newSent.F__c = characterMap.get(keySentence).get('f') != null ? Integer.valueOf(characterMap.get(keySentence).get('f')) : 0;
            newSent.G__c = characterMap.get(keySentence).get('g') != null ? Integer.valueOf(characterMap.get(keySentence).get('g')) : 0;
            newSent.H__c = characterMap.get(keySentence).get('h') != null ? Integer.valueOf(characterMap.get(keySentence).get('h')) : 0;
            newSent.I__c = characterMap.get(keySentence).get('i') != null ? Integer.valueOf(characterMap.get(keySentence).get('i')) : 0;
            newSent.J__c = characterMap.get(keySentence).get('j') != null ? Integer.valueOf(characterMap.get(keySentence).get('j')) : 0;
            newSent.K__c = characterMap.get(keySentence).get('k') != null ? Integer.valueOf(characterMap.get(keySentence).get('k')) : 0;
            newSent.L__c = characterMap.get(keySentence).get('l') != null ? Integer.valueOf(characterMap.get(keySentence).get('l')) : 0;
            newSent.M__c = characterMap.get(keySentence).get('m') != null ? Integer.valueOf(characterMap.get(keySentence).get('m')) : 0;
            newSent.N__c = characterMap.get(keySentence).get('n') != null ? Integer.valueOf(characterMap.get(keySentence).get('n')) : 0;
            newSent.O__c = characterMap.get(keySentence).get('o') != null ? Integer.valueOf(characterMap.get(keySentence).get('o')) : 0;
            newSent.P__c = characterMap.get(keySentence).get('p') != null ? Integer.valueOf(characterMap.get(keySentence).get('p')) : 0;
            newSent.Q__c = characterMap.get(keySentence).get('q') != null ? Integer.valueOf(characterMap.get(keySentence).get('q')) : 0;
            newSent.R__c = characterMap.get(keySentence).get('r') != null ? Integer.valueOf(characterMap.get(keySentence).get('r')) : 0;
            newSent.S__c = characterMap.get(keySentence).get('s') != null ? Integer.valueOf(characterMap.get(keySentence).get('s')) : 0;
            newSent.T__c = characterMap.get(keySentence).get('t') != null ? Integer.valueOf(characterMap.get(keySentence).get('t')) : 0;
            newSent.U__c = characterMap.get(keySentence).get('u') != null ? Integer.valueOf(characterMap.get(keySentence).get('u')) : 0;
            newSent.V__c = characterMap.get(keySentence).get('v') != null ? Integer.valueOf(characterMap.get(keySentence).get('v')) : 0;
            newSent.W__c = characterMap.get(keySentence).get('w') != null ? Integer.valueOf(characterMap.get(keySentence).get('w')) : 0;
            newSent.X__c = characterMap.get(keySentence).get('x') != null ? Integer.valueOf(characterMap.get(keySentence).get('x')) : 0;
            newSent.Y__c = characterMap.get(keySentence).get('y') != null ? Integer.valueOf(characterMap.get(keySentence).get('y')) : 0;
            newSent.Z__c = characterMap.get(keySentence).get('z') != null ? Integer.valueOf(characterMap.get(keySentence).get('z')) : 0;
            newSent.X0__c = characterMap.get(keySentence).get('0') != null ? Integer.valueOf(characterMap.get(keySentence).get('0')) : 0;
            newSent.X1__c = characterMap.get(keySentence).get('1') != null ? Integer.valueOf(characterMap.get(keySentence).get('1')) : 0;
            newSent.X2__c = characterMap.get(keySentence).get('2') != null ? Integer.valueOf(characterMap.get(keySentence).get('2')) : 0;
            newSent.X3__c = characterMap.get(keySentence).get('3') != null ? Integer.valueOf(characterMap.get(keySentence).get('3')) : 0;
            newSent.X4__c = characterMap.get(keySentence).get('4') != null ? Integer.valueOf(characterMap.get(keySentence).get('4')) : 0;
            newSent.X5__c = characterMap.get(keySentence).get('5') != null ? Integer.valueOf(characterMap.get(keySentence).get('5')) : 0;
            newSent.X6__c = characterMap.get(keySentence).get('6') != null ? Integer.valueOf(characterMap.get(keySentence).get('6')) : 0;
            newSent.X7__c = characterMap.get(keySentence).get('7') != null ? Integer.valueOf(characterMap.get(keySentence).get('7')) : 0;
            newSent.X8__c = characterMap.get(keySentence).get('8') != null ? Integer.valueOf(characterMap.get(keySentence).get('8')) : 0;
            newSent.X9__c = characterMap.get(keySentence).get('9') != null ? Integer.valueOf(characterMap.get(keySentence).get('9')) : 0;
            
            //add new Sentence__c object to storage list
            newSentences.add(newSent);
        }

        //insert storage list newSentences using Database.SaveResult so that
        //the Ids of the new objects can be pulled and sent back to JS file
        Database.SaveResult[] srList = Database.insert(newSentences, false);

        //create storage List<Id> new Ids to store the Ids of new Sentence__c objects
        List<Id> newIds = new List<Id>();

        //iterate over Database.SaveResult list
        for(Database.SaveResult sr : srList) {
            if(sr.isSuccess()) {
                newIds.add(sr.getId());
            }
        }

        //query for the new Sentence__c objects to return back to JS file
        List<Sentence__c> returnSentences = [SELECT Id, Name, Sentence__c, IsPalindrome__c,
                                            A__c, B__c, C__c, D__c, E__c, F__c, G__c, H__c,
                                            I__c, J__c, K__c, L__c, M__c, N__c, O__c, P__c,
                                            Q__c, R__c, S__c, T__c, U__c, V__c, W__c, X__c,
                                            Y__c, Z__c, X0__c, X1__c, X2__c, X3__c, X4__c,
                                            X5__c, X6__c, X7__c, X8__c, X9__c
                                            FROM Sentence__c WHERE Id IN :newIds];

        //return
        return returnSentences;
    }

    @AuraEnabled(cacheable=true)
    public static Sentence__c getChartSentence(String recordId){
        Sentence__c returnSentence = [SELECT Id, Name, Sentence__c, IsPalindrome__c,
                                            A__c, B__c, C__c, D__c, E__c, F__c, G__c, H__c,
                                            I__c, J__c, K__c, L__c, M__c, N__c, O__c, P__c,
                                            Q__c, R__c, S__c, T__c, U__c, V__c, W__c, X__c,
                                            Y__c, Z__c, X0__c, X1__c, X2__c, X3__c, X4__c,
                                            X5__c, X6__c, X7__c, X8__c, X9__c
                                            FROM Sentence__c WHERE Id = :recordId LIMIT 1];
        
        return returnSentence;

    }
   
}