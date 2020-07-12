export const commands = {
  START: '/start',
  HELP: '/help',
  AUTHORIZE: '/authorize',
  ALL_CAMP_SCORE: '/all_camp_score',
  LYRICS: '/lyrics',
  ALL_CAMP_SCHEDULE: '/all_camp_schedule',
}

export const markup = {
  initialKeyboard: () => [[commands.HELP], [commands.AUTHORIZE]],
  afterAuthorize: () => [
    [commands.ALL_CAMP_SCHEDULE],
    [commands.ALL_CAMP_SCORE],
    [commands.LYRICS],
  ],
}
