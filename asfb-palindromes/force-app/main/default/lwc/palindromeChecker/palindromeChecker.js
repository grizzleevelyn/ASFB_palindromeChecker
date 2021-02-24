import { LightningElement, track, api } from 'lwc';
import insertSentence from '@salesforce/apex/createSentence.insertSentence';

export default class PalindromeChecker extends LightningElement {

    @track sentenceId;
    @track sentenceText;
    @track sentence;
    @track sentenceLoaded = false;
    @track isPalindrome;
    @track error;

    updateSentence(event) {
        let sent = this.template.querySelector('lightning-input').value;
        this.sentenceText = sent;

        this.palindromeChecker(sent);
    }

    palindromeChecker(sent) {
        //create map to hold sentence + boolean value
        let sentenceMap = {};

        //create map to hold sentence + map of characters
        let characterMap = {};

        //verify that text input is not null
        if(sent.length > 0) {
            //create character map to be used in characterCounter
            var charMap = {};

            //regular expression to remove spaces and punctuation
            var rgx = /[\W_]/g;

            //simplify string by making lowercase and replacing all spaces and punctuation with ''
            var simpleString = sent.toLowerCase().replace(rgx, '');

            //send simpleString to characterCounter
            charMap = this.characterCounter(simpleString);

            //use built in javacript functions to split the string into an array character by character,
            //reverse the order of the array, and join the array back into a string
            var reverseString = simpleString.split('').reverse().join('');

            //check to see if the simple string and the reverse string are exactly equal
            var bool = (reverseString === simpleString);

            //set variable tracking whether or not sentence is a palindrome
            this.isPalindrome = bool ? 'Yes! :)' : 'No. :(';

            //escape single quotes
            var escapeQuotes = sent.replace(/'/g,'\'');

            //remove any extra return characters
            var finalStr = escapeQuotes.replace(/^[\r\n]+|\.|[\r\n]+$/g, '');
        
            //add new key value pair to map
            sentenceMap[finalStr] = bool;
            characterMap[finalStr] = charMap;
        }
        else {
            alert('Please enter a sentence or phrase!');
        }

        //set jsonpalindrome variable to the stringified sentenceMap
        let jsonpalindrome = JSON.stringify(sentenceMap);

        //set jsoncharacters variable to the stringified characterMap
        let jsoncharacters = JSON.stringify(characterMap);

        //imperative apex call...
        insertSentence({JSONpalindrome : jsonpalindrome, JSONcharacters : jsoncharacters})
        .then(result => {
            //set sentence to the object that is returned
            this.sentence = result[0];

            //get the Id of the sentence that was created to pass to nested component in part two
            this.sentenceId = result[0].Id;
            this.sentenceLoaded = true;
            })
        .catch(error => {
            this.error = error;
        });
    }

    characterCounter(str) {
        //create a map to hold character and count
        var counts ={}

        //create counting variables
        var char, index, len, count;

        //loop through string
        for(index = 0, len = str.length; index<len; ++index) {
            char = str.charAt(index);
            //get count for current character
            //will return undefined if character is not yet known
            count = counts[char];

            //if we have seen char, store that count plus one
            //if we have not seen char, store one
            counts[char] = count ? count + 1 : 1;
        }

        return counts;
    }
}