




function intersects(x1, y1, w1, h1, x2, y2, w2, h2)
{
if(y2 + h2/2 < y1 - h1/2||
x2 + w2/2 < x1 - w1/2||
x2 - x2/2 > x1 + w1/2 ||
y2 - y2/2 > y1 + h1/2)
{
return false;
}
return true;
}


function rand(floor, ceil)
{
return (Math.random()* (ceil-floor) +floor );
}



function drawImage (cText, img, ang, newX, newY)
{
	cText.save();
		cText.translate(newX , newY );
		cText.rotate(ang);
		cText.drawImage(img,-img.width/2, -img.height/2);
	cText.restore();
}





function SetupImageEvents(object,img)
{
	img.onload = function() 
	{
		object.width = img.width;
		object.height = img.height;	
	};
	img.onerror = function()
	{
		console.log("Didn't Load Image " + this.src);
	};
}