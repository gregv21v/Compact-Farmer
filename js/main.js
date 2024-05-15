
import { Game } from "./Game.js"

new Game();

/*
import { Block } from "./blocks/Block.js";
let frameCount = 12;
let frameNumber = 0;
let clipPathName = "pea-sprite-frame"
let position = {x: 150, y: 150};

let clipPath = d3.select("svg").append("defs").append("clipPath");
clipPath.attr("id", clipPathName);
let clipRect = clipPath.append("rect");
clipRect
    .attr("x", position.x + frameNumber * Block.size)
    .attr("y", position.y)
    .attr("width", Block.size)
    .attr("height", Block.size)


let clipBox = (frameNumber) => "rect(" + frameNumber * Block.size + ", 0, " + Block.size + ", " + Block.size + ")"
let spriteSheet = d3.select("svg").append("svg:image");
spriteSheet
    .attr("href", "images/peaSprite.png")
    .attr("width", Block.size * frameCount)
    .attr("height", Block.size)
    .attr("x", position.x)
    .attr("y", position.y)
    .style("clip-path", "url(#" + clipPathName + ")");


setInterval(() => {
    clipRect
        .attr("x", position.x)
    spriteSheet
        .attr("x", position.x - frameNumber * Block.size)
    frameNumber = (frameNumber + 1) % frameCount;
}, 1000)
*/