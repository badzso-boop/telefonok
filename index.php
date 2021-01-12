<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Telefonok</title>
</head>
<body>
    <div class="adatok">
    
    <h1>Telefonok:</h1>

    <div class="input">
    <h4>Telefon ára:</h4>
    <input type="number" id = "bemenet"> <p id = "nulla">.000</p>
    <br>
    <button id = "gomb" onClick = "ar()">Nyomj Meg</button>
    </div>

    <script>
        function ar()
        {
            let element = document.getElementById('bemenet').value;
            let j = 1000;
            let n = 2000;
            let r = 3000;
            for(let i = 0; i < 790; i++)
            {
                document.getElementById(n).classList.remove("show");
                document.getElementById(n).classList.add("hide");

                document.getElementById(j).classList.remove("show");
                document.getElementById(j).classList.add("hide");

                document.getElementById(i).classList.remove("show");
                document.getElementById(i).classList.add("hide");
                j++;
                n++;
            }
            let ps = []
            for(let i = 0; i < 790; i++)
            {
                ps += document.getElementById(i).innerHTML;
            }

            ps = ps.replace(/F/g, "");
            ps = ps.split("t");

            r = 3000;
            j = 1000;
            n = 2000;
            for(let i = 0; i < 790; i++)
            {
                ps[i] = parseInt(ps[i]);
                if(ps[i] < element)
                {
                    document.getElementById(n).classList.remove("hide");
                    document.getElementById(n).classList.add("show");

                    document.getElementById(j).classList.remove("hide");
                    document.getElementById(j).classList.add("show");

                    document.getElementById(i).classList.remove("hide");
                    document.getElementById(i).classList.add("show");

                    document.getElementById(r).classList.remove("hide");
                    document.getElementById(r).classList.add("show");
                }
                j++;
                n++;
                r++;
            }
        }
    </script>

    <?php
    $servername = "localhost";
    $username = "admin";
    $password = "admin";
    $dbname = "telefonok_araik";
    $r = 3000;
    $n = 2000;
    $i = 0;
    $j = 1000;

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);

    }

    $sql = "SELECT telefonNev, telefonAr FROM telefonok ";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "<img class = 'kep hide' id = '". $r ."' src = 'gif/loading.gif' alt = 'A kép sajna nem jeleníthető meg :( SRY vagyok'><p class = 'nev hide' id = '" . $j . "'> Telefonok" . $row["telefonNev"] . "</p><span class = 'hide span' id = '". $n ."'></span><p class = 'ar hide' id = '" . $i . "'>" . $row["telefonAr"] . ".000 Ft </p>";
            $i++;
            $j++;
            $n++;
            $r++;
        }
    } else {
        echo "0 results";
    }

    $conn->close();

    ?>
    </div>
</body>
</html>