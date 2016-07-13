function detectRectangleCollision(r1, r2) {
  var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  hit = false;
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  r1.centerX = r1.x;
  r1.centerY = r1.y;
  r2.centerX = r2.x; 
  r2.centerY = r2.y; 
  
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;
 
  if ((Math.abs(vx) < combinedHalfWidths - 5) && (Math.abs(vy) < combinedHalfHeights - 10)) {
      hit = true;
  }
  return hit;
};