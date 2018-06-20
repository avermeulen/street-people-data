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


function createTenderList(rows, num) {
  var tenders = [];
  for (let row of rows) {

    let fields = row.split("\t");
    // console.log(fields);

    //
    if (fields[0] === '' || fields[6] === undefined) {
      continue;
    }

    //
    console.log(fields[6].trim().replace(' ', '').replace(",", "."));
    var field = fields[6].trim().replace(' ', '').replace(",", ".");

    var value = Number(JSON.parse(JSON.stringify(field).replace(" ", ""))) ;


    //console.log("--------------");
    //

    var tender = {
      id: Number(fields[0]) + num,
      no: fields[1],
      reference: fields[2],
      description: fields[3],
      vendor: fields[4],
      awardedDate: fields[5],
      value,
      reason: fields[7],
      department: fields[8]
    }

    //
    // console.log(tender);
    tenders.push(tender);
  }
  return tenders;
}

async function readFile() {


  let file = await fs.readFile("./February2017-2.txt", "utf-8");
  let rows = file.split("\n");
  let tenderList1 = createTenderList(rows, 100);

  let file2 = await fs.readFile("./March-2017.txt", "utf-8");
  let rows2 = file2.split("\n");
  let tenderList2 = createTenderList(rows2, 200);

  var tenderList = [];
  tenderList = tenderList.concat(tenderList1, tenderList2);

  await fs.writeFile("tenders.json", JSON.stringify(tenderList));
}

readFile();
