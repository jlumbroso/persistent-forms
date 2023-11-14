# persistentForm.js

## Description

`persistentForm.js` is a JavaScript utility designed to make form data persistent across page reloads. This script ensures that any data entered into form fields is not lost when the page is refreshed or accidentally closed. It achieves this by storing the form data in the browser's local storage.

[Click here](https://jlumbroso.github.io/persistentForm.js/) to view a live demo of `persistentForm.js`.

## Features

- **Persistence of Form Data**: Retains form input values even after page reloads.
- **Support for Various Form Elements**: Works with text inputs, checkboxes, radio buttons, and select elements.
- **Easy Integration**: Can be easily included in any HTML webpage.

## How to Use

To use `persistentForm.js` in your project, follow these steps:

1. **Include the Script**: Add the `persistentForm.js` script to your HTML file.

    ```html
    <script src="path/to/persistentForm.js"></script>
    ```

2. **Add IDs to Form Elements**: Ensure that all form elements you want to persist have unique `id` attributes.

3. **Initialize the Script**: The script automatically initializes on page load. No additional initialization is needed.

## Usage Example

Below is a simple example demonstrating how to use `persistentForm.js` in an HTML form.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Persistence Demo</title>
    <script src="path/to/persistentForm.js"></script>
</head>
<body>
    <form id="exampleForm">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username"><br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email"><br><br>

        <label for="bio">Bio:</label>
        <textarea id="bio" name="bio"></textarea><br><br>

        <input type="submit" value="Submit">
    </form>
</body>
</html>
```

In this example, `persistentForm.js` will automatically save the values entered into the `username`, `email`, and `bio` fields. If the user refreshes the page, the script will restore the saved values into their respective fields.

## Contributing

For more information or to contribute to this project, please visit the [GitHub repository](https://github.com/jlumbroso/persistentForm.js).