var THREEx		= THREEx || {};

THREEx.GeometryWobble	= {};

// Geometry Wobble
// based on paul lewis / areotwist code


// TODO need to have less hardcoded parameters

THREEx.GeometryWobble.init	= function(geometry)
{
	for(var i = 0; i < geometry.vertices.length; i++) {
		var vertex	= geometry.vertices[i];
		vertex.originalPosition	= vertex.position.clone();
		vertex.dirVector	= vertex.position.clone().normalize();
	}
	geometry.dynamic	= true;
	
	this.cpuAxis(geometry, 'y')
}

THREEx.GeometryWobble.cpuAxis	= function(geometry, type, factor)
{
	if( type === undefined )	type	= 'x';
	if( factor === undefined )	factor	= 0.2;
	
	for(var i = 0; i < geometry.vertices.length; i++) {
		var vertex	= geometry.vertices[i];
		if( type === 'x' )	vertex.axisValue	= vertex.originalPosition.x * factor;
		else if( type === 'y' )	vertex.axisValue	= vertex.originalPosition.y * factor;
		else if( type === 'z' )	vertex.axisValue	= vertex.originalPosition.z * factor;
		else	console.assert(false);
	}
}

THREEx.GeometryWobble.Animate	= function(geometry, phase, magnitude)
{
	if( phase === undefined )	phase		= 0;
	if( magnitude === undefined )	magnitude	= 0.2;

	for(var i = 0; i < geometry.vertices.length; i++) {
		var vertex	= geometry.vertices[i];
		var vertexPhase	= Math.cos(phase + vertex.axisValue);
		
		vertex.position.x = vertex.originalPosition.x + vertexPhase * vertex.dirVector.x * magnitude;
		vertex.position.y = vertex.originalPosition.y + vertexPhase * vertex.dirVector.y * magnitude;
		vertex.position.z = vertex.originalPosition.z + vertexPhase * vertex.dirVector.z * magnitude;
	}
	
	geometry.__dirtyVertices = true;
}
