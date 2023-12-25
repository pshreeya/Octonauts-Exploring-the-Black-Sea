//This is required to get input from the user in the console.
const {userInfo} = require('os');
const readline = require('readline-sync');

/*
  Name:        Octonauts: Exploring the Black Sea
  Purpose:     Help the Octonauts make new sea creature discoveries in the Black Sea!

  Author:      Shreeya Prasanna 
  Created:     14-Dec-2023
  Updated:     22-Dec-2023
*/

/** 
* Counting the number of words there are in the name of a sea creature.
*
* @param {array} seaCreatures - Contains the names of the sea creatures from the seaCreaturesDiscovery.
* @param {number} wordCount - Represents the count of the number of words in the name of a sea creature.
*
* @returns {array} An array of sea creature names that match the specificed word count.
*
*/
const seaCreaturesByWordCount = (seaCreatures, wordCount) => {
  //error-handling of wordCount variable
  if(isNaN(wordCount)) {
    throw new TypeError("wordCount must be a number.");
  }
  if (wordCount < 0){
    throw new RangeError("wordCount must be a positive number.");
  }
  return seaCreatures.filter(creature => { 
    //spilts the sea creature name depending on wordcount
    const words = creature.split(' ');
    return wordCount === words.length;
  });
}; 

/** 
* Creates an object that categorizes the sea creature names based on the number of words they contain.
*
* @param {array} seaCreatures - Contains the names of the sea creatures from the seaCreaturesDiscovery.
*
* @returns {JSON-Style Object} The final object that has the sea creature names categorized properly based on the wordcount.
*
*/
const buildCreatureObject = (seaCreatures) => {
  //error-handling of the seaCreatures array
  if(!Array.isArray(seaCreatures)){
    throw new TypeError ("seaCreatures must be an array.");
  }
  //initializing the object
  const creatureObject= { };
  //looping through i, which is the set number of words and filtering the sea creature names based off of it
  for (let i = 1; i <= 4; i++){
    creatureObject[i] = seaCreaturesByWordCount(seaCreatures, i);
  };
  return creatureObject;
}; 

//introduction of the program
console.log("Welcome to a new episdoe of The Octonauts!");
console.log(" ");
console.log("Captain Barnacles: Today was my crew's first day of exploring the Black Sea! We've made five amazing sea creature discoveries, but we realized that we can use your help to make more!");

//initializing the array with the pre-determined dataset 
seaCreaturesDiscovery = ["Spiny dogfish", "Greater weever", "European sea sturgeon", "Barrel jellyfish", "Black sea bottlenose dolphin"];

//initializing the empty array that will include the user's journal entries
journalEntry = [];

let continueDiscovery = "yes";
//while loop allows the user to re-enter a sea creature they found
while (continueDiscovery.toLowerCase() === "yes"){
  try {
    //allows the user to retry if they inputted an invalid entry for the userDiscovery prompt
    do {
      userDiscovery = readline.question("Which sea creature did you find (write the common name)?: ");
      //error-handling of userDiscovery when tested with a number datatype
      if(!isNaN(userDiscovery)){
        throw new TypeError ("Input cannot be a number or a blank. Please enter a valid sea creature name.")
      }
      //alphabetically sorts the array before the addition of the new sea creature
      seaCreaturesDiscovery.sort(); 
      //checks to make sure whether the sea creature has already been previously inputted into the array
      if (seaCreaturesDiscovery.map(creature => creature.toLowerCase()). indexOf(userDiscovery.toLowerCase()) !== -1){ 
        console.log("This sea creature has already been discovered! Please try again.");
      }
    } while(!isNaN(userDiscovery) || seaCreaturesDiscovery.map(creature => creature.toLowerCase()).indexOf(userDiscovery.toLowerCase()) !== -1);

    //capitalizes the first letter of the sea creature the user has found
    const firstLetterCap = userDiscovery.charAt(0).toUpperCase() + userDiscovery.slice(1);
    console.log("Congratulations, you've made a new sea creature discovery!");
    //adds the sea creature to the array
    seaCreaturesDiscovery.push(firstLetterCap);
    //alphabetically sorts the array
    seaCreaturesDiscovery.sort();
    //prints the array for the users to continue with their discovery
    console.log(seaCreaturesDiscovery);
    console.log(" ");

    //allows the user to retry if they inputted an invalid entry for the userLogEntry prompt
    do {
      try{
        //error-handling of userLogEntry when tested with a number datatype
        userLogEntry = readline.question("Please describe your experience of finding this unique creature: ");
        if(!isNaN(userLogEntry)){
          throw new TypeError ("Description cannot be a number or a blank. Please describe your experience.")
        }
        //assists for the printing of the error message
      } catch (error){
        console.log(error.message);
      }
    } while (!isNaN(userLogEntry))
    //the userLogEntry is added to the journalEntry array
    journalEntry.push(userLogEntry);

    //initiallizing a JSON-object to display the wordcount and the matching sea creature names
    const seaCreatureObject = buildCreatureObject(seaCreaturesDiscovery);
    console.log(seaCreatureObject);

    //calculating the total number of sea creatures listed within the JSON-object 
    const totalNumberOfCreatures = Object.values(seaCreatureObject).flat().length;
    console.log("So far, we have discovered " + totalNumberOfCreatures + " sea creatures with your help.");
    console.log("");

    //allows the user to retry if they inputted an invalid entry for the continueDiscovery prompt
    do{
      try{
        //error-handling of continueDiscovery when tested with a number datatype
        continueDiscovery = readline.question("Do you want to add another sea creature(Yes/No)?: ");
        if(continueDiscovery.toLowerCase() !== "no" && continueDiscovery.toLowerCase() !== "yes"){
          throw new TypeError("Invalid input. Please enter either Yes or No.");
        }
        //assists for the printing of the error message
      } catch(error){
        console.log(error.message);
      }
    } while(continueDiscovery.toLowerCase() !== "no" && continueDiscovery.toLowerCase() !== "yes");
  }catch (error){
    console.log(error.message); 
  }
}

//checking if the user inputs "no" for the continueDiscovery prompt
if (continueDiscovery.toLowerCase() === "no"){
  //conclusion of the program
  console.log("On behalf of the entire Octonauts crew, we'd like to give you a big THANK YOU! Your contribution has changed the trajectory of sea exploration!");
  console.log("");
  console.log("Here's your memorable journal entries: ");
  //looping through each user entry of the journalEntry array and printing it 
  for (entry of journalEntry){
    console.log(entry);
  };
  console.log("");
  console.log("I hope you had fun exploring the Black Sea! Until next time, take care!");
};


