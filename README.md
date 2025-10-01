This is the client side of the application for the fish registry

most of this is generated using AI, specifically v0.app.
Only a small change has been done to allow for fetching of list of fishes from backend server application.

To run this part of the application in your local, the following are needed:

Node.js
npm



I recommend using Homebrew to install the necessary tools if on MacOS

# Homebrew

## Installation
run these commands in the terminal:

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update //for updating the package list

# Node

brew install node

to verify, run:
node -v
npm -v


if both node and npm are installed proceed to the client directory of the folder in the terminal
from there run the command
npm run dev

this should start your application on port 3000 of your localhost

