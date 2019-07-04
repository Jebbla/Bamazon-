 var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Pickle$1",
        database: "bamazon"
     });
     connection.connect(function (err) {
        if (err) throw err;
        console.log("Hi");
        });