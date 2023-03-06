/////////////////////////////////////////////////////////////////////////////
//
//  Square.js
//

function Square(gl, vertexShader, fragmentShader) {

    vertexShader ||= "Square-vertex-shader";
    fragmentShader ||= "Square-fragment-shader";

    let program = initShaders(gl, vertexShader, fragmentShader);

    // Set up our data:
    //   - positions contains our vertex positions
    //   - indices contains how to organize the vertices
    //       into primitives
    //
       let positions = [
        0.0, 0.0, 0.0,//vertex 0
        0.0, 1.0, 0.0,  //vertex 1
        0.0, 0.0, 1.0,  //vertex 2
        0.0, 1.0, 1.0,  //vertex 3
        1.0, 0.0, 0.0,  //vertex 4
        1.0, 1.0, 0.0,  //vertex 5
        1.0, 0.0, 1.0,  //vertex 6
        1.0, 1.0, 1.0 ];//vertex 7


    indices = [ 2,3,0, //Cube Face: 1 Triangle: 1
                3,1,0, //Cube Face: 1 Triangle: 2
                6,7,2, //Cube Face: 2 Triangle: 1
                7,3,2, //Cube Face: 2 Triangle: 2
                4,5,6, //Cube Face: 3 Triangle: 1
                5,7,6, //Cube Face: 3 Triangle: 2
                7,5,3, //Cube Face: 4 Triangle: 1
                5,1,3, //Cube Face: 4 Triangle: 2
                4,6,0, //Cube Face: 5 Triangle: 1
                6,2,0, //Cube Face: 5 Triangle: 2
                0,1,4, //Cube Face: 6 Triangle: 1
                1,5,4]; //Cube Face: 6 Triangle: 2



    // Initialize all of our WebGL "plumbing" variables
    //
    let aPosition = new Attribute(gl, program, positions,
	    "aPosition", 3, gl.FLOAT);

    indices = new Indices(gl, indices);

    let MV = new Uniform(gl, program, "MV");
    let P  = new Uniform(gl, program, "P");

    this.render = () => {
        gl.useProgram(program);

        aPosition.enable();
        indices.enable();

        MV.update(this.MV);
        P.update(this.P);

        gl.drawElements(gl.TRIANGLES, indices.count, indices.type, 0);

        indices.disable();
        aPosition.disable();
    
    };
};
