# Moai Alley - game made for JS13kGames 2023

## Installation
Run **`npm install`** to install build dependencies.

## Tasks
**`npm build`** builds the game, reports archive size and serves locally with browser sync live reload enabled.

**`npm start`** quickly syncs changes and reloads the game, or starts the server if not currently running.

**`npm debug`** builds the game without any minifying for easier debugging. Includes detailed console logs.

## Build task parameters
*`--pwa`* instructs to build a Progressive Web App - will add 864 bytes when zipped.

*`--mobile`* adds some html tags regarding mobile and iOS icons - increases the zip filesize with 45 bytes.

*`--social`* adds some html tags for SEO and social media (twitter) - will add around 100 bytes, depending on description length.


