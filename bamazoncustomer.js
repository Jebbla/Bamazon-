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
                  readProducts();
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

            //   console.log("\n\n ---------------------------------------------\n\n");

              var cost = result.price;
            //   console.log("cost: ", cost);

              var qty = result.stock_quantity;
            //   console.log("qty: ", qty);

              var totalCost = cost * quantity;
            //   console.log("totalCost: ", totalCost);

            //   var tax = ((.065 / 100) * 1000) * totalCost;
            //   console.log("tax: ", tax);
              
              var tax = (0.065 * totalCost);
            //   console.log("tax: ", tax);

            //   var taxRound = Math.round(tax * 100) / 100;
            //   console.log("taxRound: ", taxRound);              

              var total = totalCost + tax;
            //   console.log("total: ", total);
            //   console.log("\n\n ---------------------------------------------\n\n");



              console.log("QUANTITY ORDERED: " + quantity + " " + result.product_name + '  at ' + "$" + cost);
              console.log("PRICE:  $" + totalCost);
              console.log("TAX @ .065: $" + tax);
              console.log("YOUR TOTAL BALANCE IS:  $" + total.toFixed(2));

              inquirer.prompt([{
                type: 'confirm',
                name: 'shop',
                message: "Is there anything else you would like to purchase?"

              }])
              .then(function (answer) {
                //   console.log("ans: ", answer.shop);
                if (answer.shop) {
                  readProducts();
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