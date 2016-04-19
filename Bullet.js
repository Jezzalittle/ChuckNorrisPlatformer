

var Bullet  = function()
{
this.image = document.createElement("img"),
this.position = new Vector2();
this.velocity = new Vector2(1,0);
this.width = 0;
this.height = 0;
var speed = 256;
this.image.src = "bullet.png";

this.velocity.rotateDirection(this.rotation);
this.velocity.multiplyScalar(speed);
}

Bullet.prototype.update = function(deltaTime)
{
	var posChange = this.velocity.copy();
	posChange.multiplyScalar(deltaTime);
	this.position.add(posChange);
}


Bullet.prototype.draw = function()
{
	drawImage(context, this.image, this.rotation ,this.position.x, this.position.y);
}
