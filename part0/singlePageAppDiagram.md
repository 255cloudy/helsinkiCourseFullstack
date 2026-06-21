sequenceDiagram
    participant browser
    participant server

    browser ->> server: Get https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server ->> browser: HTML document
    deactivate server

    Note right of browser: the browser parses the document and sees it needs a css file and a js file

    browser ->> server: Get https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server 
    server ->> browser: CSS document
    deactivate server

    browser ->> server: Get https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server 
    server ->> browser: javascript document
    deactivate server

    Note right of browser: the browser gets the js file.Js file sets up an event handler for form submission.The js also executes instructing browser get the json data 

    browser ->> server: Get https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server 
    server ->> browser: JSON data [{"content": "hello", "date": "2026-06-20T13:54:01.438Z"},...]
    deactivate server

    Note right of browser: the browser gets the json data and uses the data to rerender the list of notes

    


