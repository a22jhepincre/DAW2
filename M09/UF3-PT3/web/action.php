<h1>Dades rebudes</h1>
<hr>
<ol>
    <?php
    // Check if form is submitted
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Loop through all the received POST parameters and display them
        echo "<h2>POST</h2>";
        foreach ($_POST as $key => $value) {
            echo '<li>' . $key . ': ' . $value . '</li>';
        }
    } elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
        // Check if there are any GET parameters
        if (!empty($_GET)) {
            echo "<h2>GET</h2>";
            // Loop through all the received GET parameters and display them
            foreach ($_GET as $key => $value) {
                echo '<li>' . $key . ': ' . $value . '</li>';
            }
        } else {
            echo "<h2>Petició sense paràmetres</h2>";
        }
    } else {
        echo "<h2>El mètode no era ni GET ni POST</h2>";
    }
    ?>
</ol>
<hr>
<a href="./index.html">Anar al formulari bàsic inicial</a> <br><br>
<a href="<?php echo $_SERVER['HTTP_REFERER']; ?>">Tornar a:
    <?php echo $_SERVER['HTTP_REFERER']; ?>
</a>

<hr>