// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
        game: "../js",
        tests: "../js/tests",
        gui: "../js/gui",
        recipes: "../js/recipes",
        worldObjects: "../js/worldObjects",
        items: "../js/items",
        blocks: "../js/blocks",
        inventories: "../js/inventories",
        jquery: "jquery-3.5.1",
        d3: "d3.min"
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['game/testMain']);
