
var canvas = document.getElementById("gameCanvas");
canvas.height = window.innerHeight - 20;
canvas.width = window.innerWidth - 20;
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
var viewOffset = new Vector2();

function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
	if(deltaTime > 1)
		deltaTime = 1;
	
	return deltaTime;
}



var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var LAYER_COUNT = level.layers.length;
var MAP = { tw: level.width, th: level.height};
var TILE = level.tilewidth;
var TILESET_TILE = level.tilesets[0].tilewidth;
var TILESET_PADDING = level.tilesets[0].margin;
var TILESET_SPACING = level.tilesets[0].spacing;
var TILESET_COUNT_X = level.tilesets[0].columns;
var TILESET_COUNT_Y = level.tilesets[0].tilecount / TILESET_COUNT_X;

var tileset = document.createElement("img");
tileset.src = level.tilesets[0].image


var LAYER_BACKGOUND = 1;
var LAYER_PLATFORMS = 3;
var LAYER_LADDERS = 2;
var LAYER_LAVA = 4;

var METER = TILE;
var GRAVITY = METER * 15 * 3 ;
var MAXDX = METER * 10;
var MAXDY = METER * 15;
var ACCEL = MAXDX * 2;
var FRICTION = MAXDX * 0.5;
var JUMP = METER * 1500;




var fps = 0;
var fpsCount = 0;
var fpsTime = 0;


var background = document.createElement("img");
background.src = "back_cave.png"

var chuckNorris = document.createElement("img");
chuckNorris.src = "hero.png";

var darkness = document.createElement("img");
darkness.src = "THE_DARK_SIDE.png"


var player = new Player();
var keyboard = new Keyboard();



function run()
{
context.fillStyle = "#ccc";
context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();
	
	
	context.save();
	if (player.position.x >= viewOffset.x + canvas.width/2)
	{
			viewOffset.x = player.position.x - canvas.width / 2 + 25;
		
	}
	
	if(player.position.x <= viewOffset.x + canvas.width/2)
	{
		viewOffset.x = player.position.x - canvas.width / 2 +25;
	} 
	

	viewOffset.y = player.position.y - (canvas.height/2) + 25 
	
	
	context.translate(-viewOffset.x , -viewOffset.y);
			context.drawImage(background, viewOffset.x ,viewOffset.y, canvas.width, canvas.height);
	drawMap();
	context.drawImage(darkness, viewOffset.x ,viewOffset.y, canvas.width, canvas.height);
	player.update(deltaTime);
	player.draw();

	context.restore();
	fpsTime += deltaTime;
	fpsCount++;

	
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}



context.fillStyle = "#f00";
context.font="14px Arial";
context.fillText("FPS: " + fps, 5, 20, 100);
}



function cellAtPixelCoord(layer, x,y)
{
if(x<0 || x>SCREEN_WIDTH) 
return 1;
if(y>SCREEN_HEIGHT)
return 0;
return cellAtTileCoord(layer, p2t(x), p2t(y));
};
function cellAtTileCoord(layer, tx, ty)
{
if(tx<0 || tx>=MAP.tw)
return 1;
if(ty < 0 || ty>=MAP.th)
return 0;
return cells[layer][ty][tx];
};


function tileToPixel(tile)
{
return tile * TILE;
};

function pixelToTile(pixel)
{
return Math.floor(pixel/TILE);
};

function bound(value, min, max)
{
	if(value < min)
	return min;

	if(value > max)
	return max;

return value;
}

function drawMap()
{
	for(var layerIdx=0; layerIdx<LAYER_COUNT; layerIdx++)
	{
		var idx = 0;
		for( var y = 0; y < level.layers[layerIdx].height; y++ )
		{
			for( var x = 0; x < level.layers[layerIdx].width; x++ )
			{
				if( level.layers[layerIdx].data[idx] != 0 )
				{
					var tileIndex = level.layers[layerIdx].data[idx] - 1;
					var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
					var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
					context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x*TILE, (y)*TILE, TILESET_TILE+1, TILESET_TILE+1);
				}
				idx++;
			}
		}
	}
}

var cells = []; 
function initialize()
{
	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) 
	{
		cells[layerIdx] = []; 
		var idx = 0;
		for(var y = 0; y < level.layers[layerIdx].height; y++) 
			{
			cells[layerIdx][y] = [];
			for(var x = 0; x < level.layers[layerIdx].width; x++) 
				{
				if(level.layers[layerIdx].data[idx] != 0) 
					{

					cells[layerIdx][y][x] = 1;
					}

					
				else if(cells[layerIdx][y][x] != 1)
					{
					cells[layerIdx][y][x] = 0;
					}
					idx++;
				}
			}
	}
	
}
initialize();





(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);

