// The pieces that exist, described in words. This file has no components in
// it so that the server can read it too: it is how the agent knows what it is
// able to put on the stage.

export const catalog = [
  {
    id: "rectangles",
    title: "Today, in rectangles",
    shows:
      "Today's Hacker News front page and Rory's latest public commits as one set of rectangles that rearranges itself: sized by points, ranked, laid out through the day.",
    question:
      "Can real material and one shape carry a piece with almost no type?",
  },
  {
    id: "operator",
    title: "An interface that operates itself",
    shows:
      "A small control panel and a sample interface built from the same design tokens, with a cursor working the controls so that everything restyles as you watch.",
    question:
      "Is generated UI more interesting as the performer than as the furniture?",
  },
] as const;

export type PieceId = (typeof catalog)[number]["id"];
export const pieceIds = catalog.map((piece) => piece.id) as [
  PieceId,
  ...PieceId[],
];
