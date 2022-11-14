# Project setup - 
# 1. Make sure nodejs of version 14.20.0 or above is installed on your system
# 2. Install MySQL workbench application on your system and set credentials as username = root, password = password*
# 3. Dump file is provided in the project directory, import it in the MySQL app and name set db name as "flightdb" and click on "start import"
# 4. After all these steps open the application in vscode first type "npm i" command after this gets executed and then to start the server by typing "node index.js" in vscode terminal. This gets our server up and running.**
# 5. Once you get this message in the terminal "Listening on port 3000", this means all the steps are configured successfully. Then to run the UI, go to "flight-ui" folder and simply open "index.html" using google chrome. You will land to the login screen.***
# 6. In order to run the unit tests simply type "npm test" in vscode terminal.

# *If you have already installed MySQL on your system and set up your credentials, then you need to replace the username and password in the .env file of the application as per your configured creds.
# **Just in case you are unable to view data in airline dropdown, this means that the API has expired as it is free and has a limited access, then you need to register on "https://airlabs.co/" using your email and after that you will receive a free API key that you will need to replace in .env file as well. Or you can simply replace with this API Key: "b087610f-d8cb-4af3-ab34-231b5519b632"
# ***In the dump we have already created 2 users whose cred are as follows- 
# email : admin@gmail.com, password : admin (Admin type user)
# email : david@gmail.com, password : david (Normal type user)