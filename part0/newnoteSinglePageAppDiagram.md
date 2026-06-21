sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user submits the note.The javascript adds the note to the notes array and rerenders the notes. The js the instructs the server tosend a json payload to the server

    browser ->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa  payload {"content": "a","date": "2026-06-21T09:11:44.941Z"}
    activate server
    server ->> browser: JSON data {"message":"note created"}
    deactivate server
    
    Note left of server: The server adds the new note to data.json for others  


