# DiscordTeamTrees
Team Trees Rich Presence for Discord

# Usage

1) Visit https://discordapp.com/developers/applications/
2) Create a new application
3) Select the created application
4) Upload Rich Presence Assets: One with the key **largeicon** and one with the key **smallicon**
  -- Minimum Image Size (512 x 512) | Recommended Image Size (1024 x 1024)
5) Copy the Client ID from General Information and edit the **clientId** in the **config.json** file
6) Make sure you have node installed *Download: https://nodejs.org/en/download/*
7) Make sure you have discord opened and you have enabled **Display currently running game as a status message** then make sure no game is selected
  -- This setting can be found under Game Activity
8) Open CMD in the folder and run **node index.js**
