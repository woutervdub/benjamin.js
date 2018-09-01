import freesewing from "freesewing";

var sleeve = {
  draft: function(part) {
    // prettier-ignore
    let {debug, store, units, sa, measurements, options, Point, points, Path, paths, Snippet, snippets, final, paperless, macro} = part.shorthand();

    // Wrist
    let top = paths.sleevecap.bbox().topLeft.y;
    debug("Sleevecap height is ", units(Math.abs(top)));
    debug("Sleeve width is ", units(points.bicepsRight.x * 2));
    points.centerWrist = new Point(
      0,
      top + measurements.shoulderToWrist * (1 + options.sleeveLengthBonus)
    );
    points.wristRight = points.centerWrist.shift(
      0,
      (measurements.wristCircumference * (1 + options.cuffEase)) / 2
    );
    points.wristLeft = points.wristRight.rotate(180, points.centerWrist);

    // Paths
    paths.sleevecap.render = false;
    paths.seam = new Path()
      .move(points.bicepsLeft)
      .move(points.wristLeft)
      .move(points.wristRight)
      .line(points.bicepsRight)
      .join(paths.sleevecap)
      .close()
      .attr("class", "fabric");

    // Anchor point for sampling
    points.gridAnchor = points.origin;
    points.test = new Point(10, 10);

    // Final?
    if (final) {
      points.logo = points.centerBiceps.shiftFractionTowards(
        points.centerWrist,
        0.3
      );
      snippets.logo = new Snippet("logo", points.logo);
      macro("title", { at: points.centerBiceps, nr: 3, title: "sleeve" });
      macro("grainline", { from: points.centerWrist, to: points.centerBiceps });
      points.scaleboxAnchor = points.scalebox = points.centerBiceps.shiftFractionTowards(
        points.centerWrist,
        0.5
      );
      macro("scalebox", { at: points.scalebox });

      points.sleeveTip = paths.sleevecap.shiftFractionAlong(0.5);
      points.frontNotch = paths.sleevecap.shiftAlong(
        paths.sleevecap.length() / 2 -
          store.get("frontShoulderToArmholePitch") -
          store.get("sleevecapEase") / 2
      );
      points.backNotch = paths.sleevecap.shiftAlong(
        paths.sleevecap.length() / 2 +
          store.get("backShoulderToArmholePitch") +
          store.get("sleevecapEase") / 2
      );
      snippets.frontNotch = new Snippet("notch", points.frontNotch);
      snippets.backNotch = new Snippet("bnotch", points.backNotch);
      if (sa) paths.sa = paths.seam.offset(sa).attr("class", "fabric sa");
    }

    // Paperless?
    if (paperless) {
      macro("vd", {
        from: points.wristLeft,
        to: points.bicepsLeft,
        x: points.bicepsLeft.x - sa - 15
      });
      macro("vd", {
        from: points.wristLeft,
        to: points.sleeveTip,
        x: points.bicepsLeft.x - sa - 30
      });
      macro("hd", {
        from: points.bicepsLeft,
        to: points.bicepsRight,
        y: points.sleeveTip.y - sa - 30
      });
      macro("pd", {
        path: paths.sleevecap.reverse(),
        d: -1 * sa - 15
      });
    }
    return part;
  }
};

export default sleeve;
