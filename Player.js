
var Player = function()
{
this.image = document.createElement("img");
this.position = new Vector2(canvas.width/2, canvas.height/2);
this.width = 159;
this.height = 163;
this.velocityX = 0;
this.velocityY = 0;
this.angularVelocity = 0;
this.rotation = 0;
this.image.src = "hero.png";
}

Player.prototype.update = function(deltaTime)
{
if (Keyboard.isKeyDown(keyboard.KEY_SPACE) == true)
{
	bullets.push(new Bullet());
}

}

Player.prototype.draw = function()
{
	drawImage(context, this.image, 0 ,this.position.x, this.position.y);
}