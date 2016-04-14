

var Enemy = function ()
{
this.image = document.createElement("img"),
this.position = new Vector2(canvas.width/2 , canvas.height/2);
this.width = 0;
this.height = 0;
this.velocity = new Vector2();
this.image.src = "badmen.png";
var speed = 32;

while(this.velocity.magnitude() == 0)
{
	this.velocity.set(rand(-10,10), rand(-10,10));
}
	this.velocity.normalize();
	var offset = this.velocity.copy();
	offset.set(offset.x * canvas.width, offset.y * canvas.height);
	this.position.add(offset);
	
	this.velocity.reverse();
	this.velocity.multiplyScalar(speed);
};

Enemy.prototype.update = function(deltaTime)
{
	var posChange = this.velocity.copy();
	posChange.multiplyScalar(deltaTime);
	this.position.add(posChange);
}
Enemy.prototype.draw = function()
{
	drawImage(context, this.image,0 ,this.position.x, this.position.y);
}