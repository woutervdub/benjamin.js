export function saBase(side, points, Path) {
  let path = new Path();
  if (side === "back") path.move(points.cbHips);
  else path.move(points.cfHips);
  path
    .line(points.hips)
    .line(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck);
  if (side === "back") {
    path.curve(points.neckCp2, points.cbNeck, points.cbNeck);
  } else {
    path.curve(points.neckCp2, points.cfNeck, points.cfNeck);
  }

  return path;
}

export function armholeLength(points, Path) {
  return new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .length();
}

export function shoulderToArmholePitch(points, Path) {
  return new Path()
    .move(points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .length();
}

export function dimensions(macro, points, Path, sa) {
  macro("pd", {
    path: new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
      .curve(
        points.armholeHollowCp2,
        points.armholePitchCp1,
        points.armholePitch
      )
      .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder),
    d: sa + 15
  });
  macro("pd", {
    path: new Path()
      .move(points.armholePitch)
      .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder),
    d: -15
  });
  macro("vd", {
    from: points.hips,
    to: points.armhole,
    x: points.hips.x + sa + 15
  });
  macro("vd", {
    from: points.hips,
    to: points.armholePitch,
    x: points.hips.x + sa + 30
  });
  macro("vd", {
    from: points.hips,
    to: points.shoulder,
    x: points.hips.x + sa + 45
  });
  macro("vd", {
    from: points.hips,
    to: points.neck,
    x: points.hips.x + sa + 60
  });
  macro("ld", { from: points.neck, to: points.shoulder, d: sa + 15 });
}
