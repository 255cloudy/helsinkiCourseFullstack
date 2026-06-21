sequenceDiagram
    participant browser
    participant server

    browser ->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note 
    activate server
    server ->> browser: REDIRECT /exampleapp/notes
    deactivate server
    
    Note left of server: the server instructs the browser to redirect to the /exampleapp/notes route

    browser ->> server: Get https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server ->> browser: HTML document
    deactivate server

    Note right of browser: the browser parses the document and sees it needs a css file and a js file

    browser ->> server: Get https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server 
    server ->> browser: CSS document
    deactivate server

    browser ->> server: Get https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server 
    server ->> browser: javascript document
    deactivate server

    Note right of browser: the browser gets the js file and executes it

    browser ->> server: Get https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server 
    server ->> browser: JSON data [{"content": "Bangalore","date": "2026-06-20T13:33:02.046Z"},...]
    deactivate server

    Note right of browser: the browser gets the json data and uses the data to rerender the list of notes

    


