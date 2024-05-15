# Compact Survival

## Farming Game

You start off with one block of space then you build up from there.

## How do you Play?

There isn't much to do in the game right now. You can till the soil, plant some seeds and gather seeds from the water.

To play the game, you are going to want to start by building some farm blocks by pressing the green plus signs. Once you get some farm blocks, you are going to want to till the soil by using the hoe. You can use the hoe by clicking on it on the toolbar at the bottom of the screen, then clicking a untilled farm block. After you till the soil you are going to want to plant some seeds. Plant seeds the same way that you tilled the soil except use the seeds instead of the hoe. The last thing you can do is collect seeds by sieving through the water with the grass sieve.

Note: Farm blocks that are dark have water, and those that are light do not.

Screenshot:

![Alt text](images/screenshots/screenshot1.png?raw=true "Optional Title")


## Running the game

In order to run the game, you download the repository. Then in the command line type ```npm install``` in the projects working directory. Next run the command ```npm run start```.

If you get an error that says that there is something wrong with electron then
install electron with the command ```npm i --save-dev electron```.


## Story of the game
You are a farmer expanding your farm. 

## Game Progression

## Goals of the Game


# Level 1
You start off with a grass seeds and a hoe. With the hoe, you can till the soil so you can plants seeds. The only seed you have in the beginning is grass.

After you aquire some grass, you can then put that in the crafting grid to aquire a grass sieve. A grass sieve can then be used to harvest other seeds from water.




## Known Bugs
1. When you move an item from the main inventory to the crafting grid, you first have to place it in the crafting grid then pick it up again to be able to right click place the items in the grid.
2. When you have 2 or more recipes stacked up, you have to pickup and place an item to get subsequent outputs
3. When you place item in the crafting grid then try to place an item back into the main inventory, it goes back to the crafting grid.

## TODO
* Add the ability to sieve dirt blocks for more seeds.
    * place sieve on empty block
    * click sieve with a block of dirt
    * get seeds and other materials that you may find in the dirt.

* Add the ability to breed 2 or more plants
* Update tooltip descriptions for blocks
* Make tooltips have some transparancy to them so that you can see behind them.
* Add Elements to the game 
* Add genetic mutations to the game.
* Add diseases to the game.
* Create a button that when clicked, centers the map on its center tile
* Make it so that you can load a Block or Item from a file
* Add autosave
* Add more content
* Work on centering buttons on main page

## Brainstorm Session
* Bird fly around the map placing seeds on your farm
* You can automate the process of farming crops
* Different blocks of dirt have different materials in them. These materials effect the properties of the plants that grow 
 in them. For instance you could plant grass in soil with a lot of iron, and it would grow shorter but stronger.
* You can extract materials from plants by breaking down the plants. For instance you if you cook spinach to ashes, and put it in water then run a magnet through it, you can extract the iron from it.
* Adjacent patches of land cross breed. 
* Each plant has a list of properties that are averaged together when they cross breed.
* Properties may include:
    * Color of petals
    * Has or doesn't have petals
    * Leaf type
    * flowers or doesn't flower
    * is or isn't a vine
    * rapid spreading or slow spreading
    * growth speed
    * leaf color 
    * petal type
    * require iron
    * doesn't require water 
    * poisonous 
    * toxic
    * ediable
    * includes elements...
    * thick stem
    * bark
    * isTree
    * produces berries
    * produces fruit
    * seeds can fly (like dandelion seeds) (so they reach larger distances)
    * isWeed

* Materials might include:
    * iron, copper, gold, silver, nickel
    * phosphorus, nitrogen, carbon
    * potassium
    * bark, petals, stem, roots, 
    * berries

* Additional items
    * Pot for mixing things
    * Spoon 

* Auto-save
* Remove expansion blocks when dirt is removed, so that you can only expand adjacently




## Possible Features
1. Procedurally generate the look and feel of plants


