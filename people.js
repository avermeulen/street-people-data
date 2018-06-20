const fs = require('fs-extra')

/*

ID
Gender
Age
Race
What is the person doing
Group	Number of people in the group	Where was the person sleeping/ observed?
Street Name
Area
X               GPS Co ordinate
Y                  GPS Co ordinate


*/


async function readFile(){
  let file = await fs.readFile("./street-people.csv", "utf-8");
  let rows = file.split("\n");

  var people = [];


  for (let row of rows){
    let fields = row.split("\t");
    if (fields[0] === ''){
      continue;
    }

    var person = {
      id : fields[0],
      gender : fields[1],
      age : fields[2],
      race : fields[3],
      doing : fields[4],
      group : fields[5],
      groupSize : Number(fields[6]),
      location : fields[7],
      streetName : fields[8],
      area : fields[9],
      x : Number(fields[10].replace(",", ".")),
      y : Number(fields[11].replace(",", "."))
    }

    console.log(person);
    people.push(person)
  }

  await fs.writeFile("people.json", JSON.stringify(people));
}

readFile();
