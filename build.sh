#!/bin/bash

printf "     \e[38;5;75m***** Started building IOST playground *****\e[m      \n"
printf "\e[38;5;06mInstalling dependencies\e[m \n"
yarn 

printf "\e[38;5;06mCreating declaration file for editor\e[m \n"
node ./scripts/createDecl

printf "\e[38;5;06mStarting build\e[m \n"
yarn build

printf "\e[38;5;06mBuild finished\e[m \n"

echo "To start the application, serve files in the build directory"
printf "     \e[38;5;75m***** Finished building IOST playground *****\e[m      \n"
