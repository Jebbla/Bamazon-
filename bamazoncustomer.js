var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Bamazon Storefront");
  readProducts();
});

function readProducts() {
  connection.query('SELECT * FROM products', function (err, results) {
    if (err) throw err;
    console.log("Which album would you like to purchase?");

    for (var i = 0; i < results.length; i++) {
      console.log("ID: " + results[i].item_id + " PRODUCT NAME: " + results[i].product_name + " DEPARTMENT: " + results[i].department_name + " PRICE: $" + results[i].price + " QUANTITY AVAILABLE: " + results[i].stock_quantity);
    }
    inquirer.prompt([{
      type: 'input',
      name: 'item_id',
      message: "What is the ID of the album?"

    }]).then(function (answer) {
      var item_id = parseInt(answer.item_id)


      for (var i = 0; i < results.length; i++) {
        if (results[i].item_id == answer.item_id) {
          var result = results[i];
          console.log('We have ' + result.stock_quantity + ' ' + result.product_name + ' in stock for $' + result.price + ' per Item');

          inquirer.prompt([{
            type: 'input',
            name: 'itemQuantity',
            message: 'How many ' + result.product_name + ' do you wish to purchase?'

          }]).then(function (answer) {
            var quantity = parseInt(answer.itemQuantity);

            if (quantity > result.stock_quantity) {
              console.log("We do not that in stock.");
              inquirer.prompt([{
                type: 'confirm',
                name: 'shop',
                message: "Is there anything else you can't live without?"

              }]).then(function (answer) {
                if (answer.shop) {
                  options();
                } else {
                  console.log("Thank you for your purchase. Vinyl Rocks!")
                  connection.end();
                }
              })

            } else {
              console.log("You owe:");

              connection.query('UPDATE Products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [quantity, item_id], function (err, results) {
                if (err) throw err;
              });

              var cost = result.price;
              var totalCost = cost * quantity;
              var totalCostRound = Math.round(totalCost * 100) / 100;
              var tax = ((.065 / 1000) * 1000) * totalCost;
              var taxRound = Math.round(tax * 100) / 100;
              var total = totalCostRound + taxRound;



              console.log("QUANTITY ORDERED: " + quantity + " " + result.product_name + '  at ' + "$" + cost);
              console.log("PRICE:  $" + totalCostRound);
              console.log("TAX @ .065: $" + taxRound);
              console.log("YOUR TOTAL BALANCE IS:  $" + total);

              inquirer.prompt([{
                type: 'confirm',
                name: 'shop',
                message: "Is there anything else you would like to purchase?"

              }]).then(function (answer) {
                if (answer.shop) {
                  options();
                } else {
                  console.log("Thank you for your business.")
                  connection.end();
                }
              })

            }
          })
        }
      }
    })

  });

}