# Project setup - 
# 1. Make sure nodejs of version 14.20.0 or above is installed on your system
# 2. Install MySQL workbench application on your system and set credentials as username = root, password = password*
# 3. Dump file is provided in the project directory, import it in the MySQL app and name set db name as "flightdb"
# 4. Once imported, in MySql application choose "Database" form top nav then click on "Reverse engineering" and select the ER diagram naming flightdb and run that script so that there is correct mapping and relationship among the tables
# 5. After all these steps open the application in vscode and to start the server type "node index.js" in vscode terminal. This gets our server up and running.**
# 6. Once you get this message in the terminal "Listening on port 3000", this means all the steps are configured successfully. Then to run the UI, go to "flight-ui" folder and simply open "index.html" using google chrome. You will land to the login screen.***

# *If you set your credentials other than those mentioned, then to run this application, you need to enter the creds in .env file as well.
# **Just in case you are unable to view data in airline dropdown, this means that the API has expired as it is free and has a limited acces, then you need to register on "https://airlabs.co/" using your email and after that you will receive a free API key that you will need to replace in .env file as well
# ***In the dump we have already created 2 users whose cred are as follows- 
# email : admin@gmail.com, password : admin (Admin type user)
# email : david@gmail.com, password : david (Normal type user)