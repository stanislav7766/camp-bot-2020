export const papyrus = {
  getInitialGreeting: `Welcome to MASCOT bot! Select /authorize in order to register.`,
  getHelpInfo:
    'MASCOT bot is aimed to handle needs of participants during Online MASCOT2020. Use /authorize command in order to register. Note: only campers, JCs and staff members of MASCOT2020 are accepted.',
  getInfoMsg: `Need any help? Feel free to contact!
  Directors:
  Valera Dychakivskyi: @dychakivsky, +380672174564
  Yurij Korolyshyn - @yura_korol, +380966693128
  Your Team Leaders:
  … (info from base)
  `,
  afterAuthorizeMsgUser: 'конгратс, ты юзер',
  afterAuthorizeMsgAdmin: 'конгратс, ты админ',
  myScoreMsg: score =>
    `Hey! Your current score: ${score}. Be active during lessons to reach more ;)`,
  getTodayMsg: 'Вот расписание на сегодня',
  getTomorrowMsg: 'Вот расписание на завтра',
  getWholeMsg: 'Вот расписание на все дни',
  getMyScheduleMsg: 'На когда нужно расписание?',
  getAllScheduleMsg: 'На какую группу нужно расписание?',
  getAllScoresMsg: teamScores => `Scores per team:\n ${teamScores}`,
  getAllScoresMsgPdf: 'Here all scores.',
  getNotAuthorizedMsg:
    'Ooops, can’t find you in the list of participants! Make sure you use the same Telegram nickname as you’ve sent to organizers. If you think something wrong – fell free to contact @astarianka (aka Staff Anka).',
}
