function halmabrett (dimx, dimy) {
    scaleFactor = dimx / 900;
    var paper = new Raphael(document.getElementById('canvas_container'), dimx , dimy);
    var cx = dimx/2; // center x
    var cy = dimy/2; // center y

    if ( dimx == 600 ) {
        var sv = 70; // vertical step
        var hsv = 35; // half vertical step
        var sh = 46; // horizontal step
        var hsh = 23; // half horizontal step
        var psr = 10; // play stone radius
        var fsr =  6; // field stone radius
    } else if ( dimx == 500 ) {
        var sv = 58; // vertical step
        var hsv = 29; // half vertical step
        var sh = 38; // horizontal step
        var hsh = 19; // half horizontal step
        var psr = 10; // play stone radius
        var fsr =  5; // field stone radius
    } else {
        var sv = 100; // vertical step
        var hsv = 50; // half vertical step
        var sh = 66; // horizontal step
        var fsr =  8; // field stone radius
        var psr = 14; // play stone radius
        var hsh = 33; // half horizontal step
    }

    var sv = 100 * scaleFactor ; // vertical step
    var hsv = 50 * scaleFactor; // half vertical step
    var sh = 66 * scaleFactor; // horizontal step
    var fsr =  8 * scaleFactor; // field stone radius
    var psr = 14 * scaleFactor; // play stone radius
    var hsh = 33 * scaleFactor; // half horizontal step
    steinDmr = psr;

    var rect = paper.rect(0, 0, dimx, dimy);
    rect.attr({fill: '#ff9', stroke: '#000', 'stroke-width': 1});

    var hex = paper.path(hexagon(cx - 8 * hsh, cy + 0 * hsv,
        cx - 4 * hsh, cy - 4 * hsv,
        cx + 4 * hsh, cy - 4 * hsv,
        cx + 8 * hsh, cy + 0 * hsv,
        cx + 4 * hsh, cy + 4 * hsv,
        cx - 4 * hsh, cy + 4 * hsv));

    hex.attr({fill: '#f90', stroke: '#000', 'stroke-width': 1, 'fill-opacity': 0.7});

// red triangles
    var triangle_r1 = paper.path(dreieck (cx - 4 * hsh, cy - 4 * hsv, cx + 0 * hsh, cy - 8 * hsv, cx + 4 * hsh, cy - 4 * hsv));
    triangle_r1.attr({fill: '#f00', stroke: '#000', 'stroke-width': 1, 'fill-opacity': 0.5});

    var triangle_r2 = paper.path(dreieck (cx - 4 * hsh, cy + 4 * hsv, cx + 0 * hsh, cy + 8 * hsv, cx + 4 * hsh, cy + 4 * hsv));
    triangle_r2.attr({fill: '#f00', stroke: '#000', 'stroke-width': 1, 'fill-opacity': 0.5});

// green triangles
    var triangle_g1 = paper.path(dreieck (cx - 12 * hsh, cy - 4 * hsv, cx - 4 * hsh, cy - 4 * hsv, cx - 8 * hsh, cy - 0 * hsv));
    triangle_g1.attr({fill: '#0f0', stroke: '#000', 'stroke-width': 1, 'fill-opacity': 0.3});

    var triangle_g2 = paper.path(dreieck (cx + 4 * hsh, cy + 4 * hsv, cx + 12 * hsh, cy + 4 * hsv, cx + 8 * hsh, cy + 0 * hsv));
    triangle_g2.attr({fill: '#0f0', stroke: '#000', 'stroke-width': 1, 'fill-opacity': 0.3});

// blue triangles
    var triangle_b1 = paper.path(dreieck (cx - 12 * hsh, cy + 4 * hsv, cx - 4 * hsh, cy + 4 * hsv, cx - 8 * hsh, cy - 0 * hsv));
    triangle_b1.attr({fill: '#00f', stroke: '#000', 'stroke-width': 1, 'fill-opacity': 0.5});

    var triangle_b2 = paper.path(dreieck (cx + 4 * hsh, cy - 4 * hsv, cx + 12 * hsh, cy - 4 * hsv, cx + 8 * hsh, cy + 0 * hsv));
    triangle_b2.attr({fill: '#00f', stroke: '#000', 'stroke-width': 1, 'fill-opacity': 0.5});

    var line = paper.path(linie(cx - 10 * hsh, cy - 2 * hsv ,cx + 10 * hsh, cy - 2 * hsv));
    var line = paper.path(linie(cx - 10 * hsh, cy + 2 * hsv ,cx + 10 * hsh, cy + 2 * hsv));
    var line = paper.path(linie(cx - 10 * hsh, cy - 2 * hsv ,cx - 8 * hsh, cy - 4 * hsv));
    var line = paper.path(linie(cx + 10 * hsh, cy - 2 * hsv ,cx + 8 * hsh, cy - 4 * hsv));
    var line = paper.path(linie(cx - 10 * hsh, cy + 4 * hsv ,cx - 11 * hsh, cy + 3 * hsv));
    var line = paper.path(linie(cx + 10 * hsh, cy + 4 * hsv ,cx + 11 * hsh, cy + 3 * hsv));
    var line = paper.path(linie(cx - 10 * hsh, cy + 4 * hsv ,cx + 1 * hsh, cy - 7 * hsv));
    var line = paper.path(linie(cx + 10 * hsh, cy + 4 * hsv ,cx - 1 * hsh, cy - 7 * hsv));
    var line = paper.path(linie(cx - 11 * hsh, cy - 3 * hsv ,cx - 10 * hsh, cy - 4 * hsv));
    var line = paper.path(linie(cx + 11 * hsh, cy - 3 * hsv ,cx + 10 * hsh, cy - 4 * hsv));
    var line = paper.path(linie(cx - 11 * hsh, cy - 3 * hsv ,cx + 11 * hsh, cy - 3 * hsv));
    var line = paper.path(linie(cx - 11 * hsh, cy + 3 * hsv ,cx + 11 * hsh, cy + 3 * hsv));
    var line = paper.path(linie(cx - 1 * hsh, cy + 7 * hsv ,cx + 10 * hsh, cy - 4 * hsv));
    var line = paper.path(linie(cx + 1 * hsh, cy + 7 * hsv ,cx - 10 * hsh, cy - 4 * hsv));
    var line = paper.path(linie(cx - 1 * hsh, cy - 7 * hsv ,cx + 1 * hsh, cy - 7 * hsv));
    var line = paper.path(linie(cx - 1 * hsh, cy + 7 * hsv ,cx + 1 * hsh, cy + 7 * hsv));
    var line = paper.path(linie(cx - 2 * hsh, cy - 6 * hsv ,cx + 2 * hsh, cy - 6 * hsv));
    var line = paper.path(linie(cx - 2 * hsh, cy + 6 * hsv ,cx + 2 * hsh, cy + 6 * hsv));
    var line = paper.path(linie(cx - 2 * hsh, cy + 6 * hsv ,cx + 8 * hsh, cy - 4 * hsv));
    var line = paper.path(linie(cx + 2 * hsh, cy + 6 * hsv ,cx - 8 * hsh, cy - 4 * hsv));
    var line = paper.path(linie(cx - 3 * hsh, cy - 5 * hsv ,cx + 3 * hsh, cy - 5 * hsv));
    var line = paper.path(linie(cx - 3 * hsh, cy + 5 * hsv ,cx + 3 * hsh, cy + 5 * hsv));
    var line = paper.path(linie(cx - 3 * hsh, cy + 5 * hsv ,cx + 6 * hsh, cy - 4 * hsv));
    var line = paper.path(linie(cx + 3 * hsh, cy + 5 * hsv ,cx - 6 * hsh, cy - 4 * hsv));
    var line = paper.path(linie(cx - 4 * hsh, cy + 4 * hsv ,cx + 4 * hsh, cy - 4 * hsv));
    var line = paper.path(linie(cx + 4 * hsh, cy + 4 * hsv ,cx - 4 * hsh, cy - 4 * hsv));
    var line = paper.path(linie(cx - 6 * hsh, cy + 4 * hsv ,cx + 3 * hsh, cy - 5 * hsv));
    var line = paper.path(linie(cx + 6 * hsh, cy + 4 * hsv ,cx - 3 * hsh, cy - 5 * hsv));
    var line = paper.path(linie(cx - 6 * hsh, cy + 4 * hsv ,cx - 9 * hsh, cy + 1 * hsv));
    var line = paper.path(linie(cx + 6 * hsh, cy + 4 * hsv ,cx + 9 * hsh, cy + 1 * hsv));
    var line = paper.path(linie(cx - 8 * hsh, cy + 0 * hsv ,cx + 8 * hsh, cy + 0 * hsv));
    var line = paper.path(linie(cx - 8 * hsh, cy + 4 * hsv ,cx - 10 * hsh, cy + 2 * hsv));
    var line = paper.path(linie(cx + 8 * hsh, cy + 4 * hsv ,cx + 10 * hsh, cy + 2 * hsv));
    var line = paper.path(linie(cx - 8 * hsh, cy + 4 * hsv ,cx + 2 * hsh, cy - 6 * hsv));
    var line = paper.path(linie(cx + 8 * hsh, cy + 4 * hsv ,cx - 2 * hsh, cy - 6 * hsv));
    var line = paper.path(linie(cx - 9 * hsh, cy - 1 * hsv ,cx - 6 * hsh, cy - 4 * hsv));
    var line = paper.path(linie(cx + 9 * hsh, cy - 1 * hsv ,cx + 6 * hsh, cy - 4 * hsv));
    var line = paper.path(linie(cx - 9 * hsh, cy - 1 * hsv ,cx + 9 * hsh, cy - 1 * hsv));
    var line = paper.path(linie(cx - 9 * hsh, cy + 1 * hsv ,cx + 9 * hsh, cy + 1 * hsv));

    var csc =  "#000";
// center field
    x = cx - 6 * hsh; y = cy + 0 * hsv; for (i = 0; i < 7; i++ ) { paper.circle(x, y, fsr) .attr({fill: csc}); x += sh; }
    x = cx - 5 * hsh; y = cy + 1 * hsv; for (i = 0; i < 6; i++ ) { paper.circle(x, y, fsr) .attr({fill: csc}); x += sh; }
    x = cx - 5 * hsh; y = cy - 1 * hsv; for (i = 0; i < 6; i++ ) { paper.circle(x, y, fsr) .attr({fill: csc}); x += sh; }
    x = cx - 4 * hsh; y = cy + 2 * hsv; for (i = 0; i < 5; i++ ) { paper.circle(x, y, fsr) .attr({fill: csc}); x += sh; }
    x = cx - 4 * hsh; y = cy - 2 * hsv; for (i = 0; i < 5; i++ ) { paper.circle(x, y, fsr) .attr({fill: csc}); x += sh; }
    x = cx - 3 * hsh; y = cy + 3 * hsv; for (i = 0; i < 4; i++ ) { paper.circle(x, y, fsr) .attr({fill: csc}); x += sh; }
    x = cx - 3 * hsh; y = cy - 3 * hsv; for (i = 0; i < 4; i++ ) { paper.circle(x, y, fsr) .attr({fill: csc}); x += sh; }

// top and bottom fields
    x = cx - 4 * hsh; y = cy - 4 * hsv; for (i = 0; i < 5; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx - 4 * hsh; y = cy + 4 * hsv; for (i = 0; i < 5; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx - 3 * hsh; y = cy - 5 * hsv; for (i = 0; i < 4; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx - 3 * hsh; y = cy + 5 * hsv; for (i = 0; i < 4; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx - 2 * hsh; y = cy - 6 * hsv; for (i = 0; i < 3; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx - 2 * hsh; y = cy + 6 * hsv; for (i = 0; i < 3; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx - 1 * hsh; y = cy - 7 * hsv; for (i = 0; i < 2; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx - 1 * hsh; y = cy + 7 * hsv; for (i = 0; i < 2; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx - 0 * hsh; y = cy - 8 * hsv; for (i = 0; i < 1; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx - 0 * hsh; y = cy + 8 * hsv; for (i = 0; i < 1; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }

// left up, bottom right fields
    x = cx - 12 * hsh; y = cy - 4 * hsv; for (i = 0; i < 5; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx +  4 * hsh; y = cy + 4 * hsv; for (i = 0; i < 5; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx - 11 * hsh; y = cy - 3 * hsv; for (i = 0; i < 4; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx +  5 * hsh; y = cy + 3 * hsv; for (i = 0; i < 4; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx - 10 * hsh; y = cy - 2 * hsv; for (i = 0; i < 3; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx +  6 * hsh; y = cy + 2 * hsv; for (i = 0; i < 3; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx -  9 * hsh; y = cy - 1 * hsv; for (i = 0; i < 2; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx +  7 * hsh; y = cy + 1 * hsv; for (i = 0; i < 2; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx -  8 * hsh; y = cy - 0 * hsv; for (i = 0; i < 1; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx +  8 * hsh; y = cy + 0 * hsv; for (i = 0; i < 1; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }

// left bottom, top right fields
    x = cx - 12 * hsh; y = cy + 4 * hsv; for (i = 0; i < 5; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx +  4 * hsh; y = cy - 4 * hsv; for (i = 0; i < 5; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx - 11 * hsh; y = cy + 3 * hsv; for (i = 0; i < 4; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx +  5 * hsh; y = cy - 3 * hsv; for (i = 0; i < 4; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx - 10 * hsh; y = cy + 2 * hsv; for (i = 0; i < 3; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx +  6 * hsh; y = cy - 2 * hsv; for (i = 0; i < 3; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx -  9 * hsh; y = cy + 1 * hsv; for (i = 0; i < 2; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx +  7 * hsh; y = cy - 1 * hsv; for (i = 0; i < 2; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx -  8 * hsh; y = cy + 0 * hsv; for (i = 0; i < 1; i++ ) { paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }
    x = cx +  8 * hsh; y = cy - 0 * hsv; for (i = 0; i < 1; i++ ) { var c = paper.circle(x, y, fsr) .attr({fill: "#000"}); x += sh; }

    var snr = c.id + 1;

// rote steine
    x = cx - 4 * hsh; y = cy + 4 * hsv; for (i = 0; i < 5; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#c00", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick red');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'red');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }
    x = cx - 3 * hsh; y = cy + 5 * hsv; for (i = 0; i < 4; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#c00", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick red');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'red');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }
    x = cx - 2 * hsh; y = cy + 6 * hsv; for (i = 0; i < 3; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#c00", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick red');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'red');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }
    x = cx - 1 * hsh; y = cy + 7 * hsv; for (i = 0; i < 2; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#c00", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick red');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'red');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }
    x = cx - 0 * hsh; y = cy + 8 * hsv; for (i = 0; i < 1; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#c00", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick red');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'red');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }

// gruene steine
    x = cx - 12 * hsh; y = cy - 4 * hsv; for (i = 0; i < 5; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#0f0", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick green');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'green');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }
    x = cx - 11 * hsh; y = cy - 3 * hsv; for (i = 0; i < 4; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#0f0", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick green');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'green');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }
    x = cx - 10 * hsh; y = cy - 2 * hsv; for (i = 0; i < 3; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#0f0", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick green');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'green');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }
    x = cx -  9 * hsh; y = cy - 1 * hsv; for (i = 0; i < 2; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#0f0", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick green');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'green');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }
    x = cx -  8 * hsh; y = cy - 0 * hsv; for (i = 0; i < 1; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#0f0", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick green');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'green');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }

// blaue steine
    x = cx +  4 * hsh; y = cy - 4 * hsv; for (i = 0; i < 5; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#00f", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick blue');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'blue');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }
    x = cx +  5 * hsh; y = cy - 3 * hsv; for (i = 0; i < 4; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#00f", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick blue');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'blue');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }
    x = cx +  6 * hsh; y = cy - 2 * hsv; for (i = 0; i < 3; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#00f", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick blue');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'blue');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }
    x = cx +  7 * hsh; y = cy - 1 * hsv; for (i = 0; i < 2; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#00f", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick blue');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'blue');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }
    x = cx +  8 * hsh; y = cy - 0 * hsv; for (i = 0; i < 1; i++, snr++, x += sh ) {
        stein[snr] = paper.circle(x, y, psr) .attr({fill: "#00f", stroke: '#000', 'stroke-width': 1});
        stein[snr].drag(move, mouseDown, mouseUp);
        stein[snr].node.setAttribute('class', 'brick blue');
        stein[snr].node.setAttribute('data-role', 'brick');
        stein[snr].node.setAttribute('data-color', 'blue');
        stein[snr].node.setAttribute('data-raphael-id', snr);
    }

    return paper;

}

var scaleFactor;

var mouseDown = function (x, y, event) {
    cxStart = this.ox = this.attr("cx");
    cyStart = this.oy = this.attr("cy");
    this.animate({r: steinDmr * 1.3, opacity:.5}, 500, ">");
    broadcast({action: 'start', id: this.id, left: this.ox, top : this.oy, steinDmr : steinDmr * 1.3, scaleFactor : scaleFactor });
}

var mouseUp = function(event){
    //console.debug('steindrm up', this.attr("r"));
    this.animate({r: steinDmr, opacity:1}, 500, ">");
    broadcast({action: 'stop', id: this.id, left: this.ox, top : this.oy, steinDmr : steinDmr, scaleFactor : scaleFactor });
    // this.glowing.remove()
//    this.attr({'stroke-width': 1});
//    var bbox = this.getBBox();
    // socket_lm.send('u' + "#" + this.id + "#" + Math.ceil(bbox.x) + '#' + Math.ceil(bbox.y));
    //halmabrettSync();
    var color = this.node.getAttribute('data-color');
    // console.debug('move diff', this.attr('cy'), cyStart, scaleFactor );
    var pointElems = halmabrett.getElementByPoint(event.clientX, event.clientY);

    console.debug('point elems', pointElems);
//    pointElems.forEach(function(element) {
//        console.debug(element.node.nodeName);
//    })


    if (Math.abs( this.attr('cy') - cyStart) > 15*scaleFactor || Math.abs( this.attr('cx') - cxStart) > 15*scaleFactor ) {
        var name = $('#myname').val();
        var msg = translate(color);
        if (name.trim != '') {
            msg += ' (' + name + ')';
        }
        msg += ' hat gezogen';

        addChatMessage(msg, 'DrRobot');
    }
}

var move = function (dx, dy, x, y) {
    //   console.debug('move');
    this.attr({cx: this.ox + dx, cy: this.oy + dy});
    // console.debug(this.id, halmabrett.getById(this.id), this.ox + dx, this.oy + dy);
    broadcast({action: 'move', id: this.id, left: this.ox + dx, top : this.oy + dy, scaleFactor : scaleFactor });
//    if ( x > 5 && x < dimx && y > 5 && y < dimy ) {
//        // this.glowing.remove()
//        var trans_x = x-this.ox;
//        var trans_y = y-this.oy;
//        this.translate(trans_x,trans_y);
//        this.ox = x;
//        this.oy = y;
//        // this.glowing = this.glow()
//        var bbox = this.getBBox();
//       // socket_lm.send('m' + "#" + this.id + "#" + Math.ceil(bbox.x) + '#' + Math.ceil(bbox.y));
//       // if (debug == 1) DBG.write(this.id + "#" + dx + '#' + dy + "#" + x + '#' + y + '#' + Math.ceil(bbox.x) + '#' + Math.ceil(bbox.y));
//    }
}


function halmabrettSync() {
    var positions = {};
    $('#canvas_container .brick').each( function(){
        var brick = $(this);
        // console.debug('brick', brick);
        positions[brick.attr('data-raphael-id')] =  { cx: brick.attr('cx'), cy:  brick.attr('cy'), r: brick.attr('r')};
    });
    // console.debug('brick pos', positions);
    syncBrett({'action' :'syncBrett', scaleFactor: scaleFactor, positions : positions});

}

function dreieck (x0, y0, x1, y1, x2, y2) {
    var area = 'M' + ' ' + x0 + ' ' + y0 + ' ' + 'L' + ' ' + x1 + ' ' + y1 + ' ' + 'L' + ' ' + x2 + ' ' + y2 + ' ' + 'z' ;
    return area;
}