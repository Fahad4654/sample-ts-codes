<!DOCTYPE html>
<html>
<head>
  <title>Keyboard Input Listener</title>
</head>
<body>
  <input type="text" id="myInput">
  <p id="output"></p>

  <script>
    const inputElement = document.getElementById("myInput");
    const outputElement = document.getElementById("output");

    inputElement.addEventListener("keydown", (event) => {
      outputElement.textContent = `Key: ${event.key}, Code: ${event.code}`;
    });
  </script>
</body>
</html>