var Vector2 = function()
{
	this.x;
	this.y;
	
	if(x ! = undefined)
	{
		this.x = x;
	}
	if(y ! = undefined)
	{
		this.y = y;
	}
	
	this.set = function(newX, newY)
	{
		this.x = newX;
		this.y = newY;
	}
	this magnitude = function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y )
	}
	this.normalize = function()
	{
		var mag = this.magnitude();
		if(mag == 0) return;
		this.x /= mag;
		this.y /= mag;
	}
	this.add = function(v2)
	{
		this.x += v2.x;
		this.y += v2.y;
	}
	this.subtract = function(v2)
	{
		this.x -= v2.x;
		this.y -= v2.y;
	}
	this.multiplyScalar = function(num)
	{
		this.x *= num;
		this.y *= num;
	}
	this.rotateDirection = function(angle)
	{
		var s = math.sin(angle);
		var c = math.cos(angle);
		
		var dirX = (xDir * c) - (yDir * s);
		var dirY = (yDir * s) + (yDir * c);
		
		this.set(dirX, dirY);
	}
}