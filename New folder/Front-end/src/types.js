export const TEAMS = ["FirstTeam", "SecondTeam", "ThirdTeam"];

export const TEAM_LABELS = {
  FirstTeam: "First Team",
  SecondTeam: "Second Team",
  ThirdTeam: "Third Team",
};

export const POSITIONS = [
  "Prop",
  "Hooker",
  "Lock",
  "Flanker",
  "Number8",
  "ScrumHalf",
  "FlyHalf",
  "Centre",
  "Wing",
  "FullBack",
];

// Default values for a blank "Add Player" form
export const EMPTY_PLAYER_FORM = {
  name: "",
  surname: "",
  nickName: "",
  age: 18,
  position: POSITIONS[0],
};

// Default values for a blank "Add Match" form
export const EMPTY_MATCH_FORM = {
  opponent: "",
  date: "",
  location: "",
  team: TEAMS[0],
  titans: 0,
  opponentScore: 0,
};