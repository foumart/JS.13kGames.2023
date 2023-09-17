# Moai Alley

### A game made for JS13kGames 2023 with theme: 13th Century

#### Moai Alley is a unique sliding block mobile-friendly puzzle game set on the Easter Island. Help the Rapa Nui carve Moai statues and try to find the best way to transport them to their pedestals called Ahu.

![Game Thumb](https://www.foumartgames.com/games/MoaiAlley/submission/thumb_400x250.png)

Gameplay revolves around building roads used for transportation, cutting trees that are on the way and sliding (pulling) the statues with minimum moves possible to their destination.

The game also has resource management mechanics and there are three types of resource: Stone, Wood and Mana. Player has to carefully judge what actions to perform and in what order to perform them, because every action gives or takes specific resources.

For example if you're moving a Moai through forest you will have to first cut the trees, which will give you a couple of Wood resource pieces, but then you will have to build a road which requires some Wood and a lots of Stone (which you get when carving Moai statues). The last resource - Mana* represents player energy or how many tiles you will be able to walk with a Moai.

### Controls:

In-game mobile controls are available in the bottom left and bottom right part of the screen.

Desktop controls: Arrow keys to move or interact; Space to act.

## Dev thoughts:
With the "13th Century" theme I did not had a good idea for days - all kind of war games crossed my mind and I even stopped on a "Battle of Adrianople" (14 April 1205), where Tsar Kaloyan of Bulgaria defeats Baldwin I, Latin Emperor of Constantinople in his crusade. But I knew the compo would be flooded with war games (mostly about Genghis Khan) and I wanted something that will stand out, because I really wanted to follow the theme in a unique way and possibly incorporate it in the gameplay. I don't know why I decided to check on the Easter Island history, as I knew well the now debunked version that it was settled around 8-9th century, but to my great surprise I found that there is a revised chronology making it clear that the initial settlement on the isle was around 1200 A.D. and that the islanders began building Moai and Ahu soon after reaching the island. It also provides different explanation on why the island was deforested and why the civilization collapsed. This sparked an idea immediately and I was quick enough to make a paper prototype that I could carry with me, because I had vacations planned and it was the second week in the compo already - I had to refine the gameplay and compose levels while being away from my computer.

Here is a tweet I posted before even having a single line of code written:
<blockquote>
I'm creating a game about Easter Island for #js13k!
<br>
🗿🗿🗿
<br>
Now I'm starting to encounter Moai in really strange places.. I found this in a remote cabin in the Rila Mountains in Bulgaria, 1780m above sea level. Тhere are no female Мoai statues though, only small female figurines.
<br>
<img src="https://www.foumartgames.com/games/MoaiAlley/media/moai_in_the_mountain.webp" width="300" height="400">

— Noncho Savov (@FoumartGames) August 26, 2023

https://twitter.com/FoumartGames/status/1695495205066088661
</blockquote>

But with such paper prototypes I was confident!

<img src="https://www.foumartgames.com/games/MoaiAlley/media/paper_prototype_1.jpg" width="365" height="330"> <img src="https://www.foumartgames.com/games/MoaiAlley/media/paper_prototype_2.jpg" width="400" height="330">

In the two weeks remaining I spent most of the time with graphics, engine, rendering and responsive mobile design. The gameplay was literally built in the last three days. If I am to write a Post Mortem - it will be mostly explaining what didn't go right.

But at least the title screen and the Easter Island view got pretty close to the real thing :)

<img src="https://www.foumartgames.com/games/MoaiAlley/media/easter_island_title.png" width="550" height="400"> <img src="https://www.foumartgames.com/games/MoaiAlley/media/rano_kau_island_map.jpg" width="422" height="300">

Getting back to the Easter Island revised chronology, you can have a look at the following infographic. It illustrates really well the timeline but also gives insight on what actually happened on the island. It does not show what happens later though as at one point the population was reduced to just around a hundred due to slavery rides.

<img src="https://www.foumartgames.com/games/MoaiAlley/media/revised_chronology.jpg" width="800" height="703">

*Here is an interesting thing you may not know about the word MANA - the etimology of the word has Proto-Polynesian origin and as we know the indigenous people of Rapa Nui are Polynesian. For them it means a form of supernatural energy that inheres in things or people, and in the game it represents how far the Moai can walk. This word has persisted from Proto-Oceanic (meaning natural power; thunder, storm wind) in the Maori language still spoken today in New Zealand and off course we all know what Mana means in role-playing and computer games.

# Project Information
Original submission for reference: https://www.foumartgames.com/games/MoaiAlley/submission/

(Official version on my website may be updated with post-compo versions at some point)

Original archive submitted: https://www.foumartgames.com/games/MoaiAlley/submission/MoaiAlley_submission.zip

The zip ended up in about 11,160 bytes. I ran out of time and had to disable a lot of stuff, including the PWA support. Not to mention that only a few stages were included, despite me having dozens of them prepared on paper - without a level editor the data encoding used to store the levels prevented me to add them quickly.

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


