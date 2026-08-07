export const TEAMS = ["FirstTeam", "SecondTeam", "ThirdTeam"];

export const TEAM_LABELS = {
  FirstTeam: "First Team",
  SecondTeam: "Second Team",
  ThirdTeam: "Third Team",
};

export const LEAGUE_OPPONENTS = [
  "Rocklands",
  "Retreat",
  "Masiphumelele",
  "Pininsula",
  "Retreat",
  "khayaelitsha",
  "Blue Jets",
  "Imiqhayi",
  "Lagunya",
  "Young Wesleys",
];

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
  bio: "",
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