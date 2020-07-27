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
  afterAuthorizeMsgUser: 'Choose something',
  afterAuthorizeMsgAdmin: 'Choose something',
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
  getChooseGroupMsg: 'Choose the needed group',
  typeNumberInList: list => `${list} \n Type [camper's number]-[points count].\For instance 1-10`,
  incorrectTypedPoints: `Incorrect input. Type [camper's number]-[points count].\For instance 1-10`,
  checkTypedNumber: `Are you sure? Type yes/no`,
  getManageMeetups: 'Choose the needed operation',
  getMeetupsDayMsg: 'Choose the needed day',
  getAddMeetupTitleMsg: `Type meetup's title`,
  getAddMeetupTimeMsg: `Type meetup's time. Format: hh:mm`,
  getAddMeetupFacilitatorMsg: `Type meetup's facilitators. Type nickname1,nickname2.`,
  getAddMeetupAudienceMsg: `Type meetup's audience. Type all/group1-3/team's name(orange)`,
  getAddMeetupLinkMsg: `Type meetup's link.`,
  getAddMeetupConfirmMsg: text =>
    `Current version of your meetup:\n ${text} \n Are you sure you want to add it? Type yes/no`,
  getDeleteMeetupConfirmMsg: `Are you sure you want to delete it? Type yes/no`,
  typeMeetupInList: list => `${list} \n Type [meetup's title].\nFor instance hello`,
  IncorrectMeetupTitle: 'This meetup does not exist',
  incorrectMeetupTime: `Incorrect time format. Format hh:mm. Type for instance 08:00`,
  incorrectMeetupAudience: `Incorrect audience choice. Type all/group1-3/team's name(orange)`,
  incorrectMeetupDay: `Incorrect day choice. Type day1-6`,
  incorrectMeetupLink: 'Incorrect link url',
  selectEditInMeetup: 'Select which part of meetup you want to edit',
  typeNewMeetupProp: prop => `Type new <${prop}> for selected meetup`,
  getEditMeetupConfirmMsg: ({ prop, from, to }) =>
    `Are you sure you want to edit <${prop}> from '${from}' to '${to}'? Type yes/no`,
  typeMsgForSending: 'Type new message for choosed audience',
  askFileForSendingMsg: 'Are you going to load file? Type yes/no',
  selectAudience: 'Select audience',
  incorrectYesNo: 'Incorrect input',
  waitLoadFile: 'Send me needed file',
  sendMsgFileConfirm: ({ msg, filename, receiver }) =>
    `Are you sure you want to send msg:\n'${msg}'${
      filename ? '\nWith file ' + "'" + filename + "'" : ''
    } for ${receiver}? Type yes/no`,
}
