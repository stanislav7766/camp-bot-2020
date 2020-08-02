export const papyrus = {
  getInitialGreeting: `Welcome to MASCOT bot! Select /authorize in order to register.`,
  getHelpInfo:
    'MASCOT bot is aimed to handle needs of participants during Online MASCOT2020. Use /authorize command in order to register. Note: only campers, JCs and staff members of MASCOT2020 are accepted.',
  getInfoMsg: ({ team, group, teamChat, teamBase }) => `
  \t
  Your team: ${team}
  Your group: ${group}
  Your team chat: ${teamChat}
  Contacts:
  Directors:
  @yura_korol Yura
  @dychakivsky Valera
  Your team leaders: 
  ${teamBase}
  `,
  afterAuthorizeMsgUser: 'Choose something',
  afterAuthorizeMsgAdmin: 'Choose something',
  myScoreMsg: score =>
    `Hey! Your current score: ${score}. Be active during lessons to reach more ;)`,
  privacySettings: 'Check your privacy settings. Something wrong with your nickname ',
  getAllScheduleMsg: link => `Hey, here your schedule's link ${link}`,
  getAllScoresMsg: teamScores => `Scores per team:\n ${teamScores}`,
  getAllScoresMsgPdf: 'Here all scores.',
  getNotAuthorizedMsg:
    'Ooops, can’t find you in the list of participants! Make sure you use the same Telegram nickname as you’ve sent to organizers. If you think something wrong – fell free to contact @astarianka (aka Staff Anka).',
  getChooseGroupMsg: 'Choose the needed group',
  typeNumberInList: list => `${list} \n Type [camper's number]-[points count].\For instance 1-10`,
  incorrectTypedPoints: `Incorrect input. Type [camper's number]-[points count].\For instance 1-10`,
  checkTypedNumber: `Are you sure? Type yes/no`,
  getManageMeetups: 'Choose the needed operation',
  // getMeetupsDayMsg: 'Choose the needed day',
  getNotifyDayMsg: 'Choose the needed day',

  // getAddMeetupTitleMsg: `Type meetup's title`,
  getAddNotifyMsg: `Type notify's msg`,
  // getAddMeetupTimeMsg: `Type meetup's time frame. Format: [hh:mm]-[hh:mm]. For instance 12:00-13:00`,
  getAddNotifyTimeMsg: `Type notify's time. Format: [hh:mm]. For instance 12:00`,

  // getAddMeetupFacilitatorMsg: `Type meetup's facilitators. Type nickname1,nickname2.`,
  // getAddMeetupAudienceMsg: `Type meetup's audience. Type all/group1-3/team's name(orange)`,
  getAddNotifyAudienceMsg: `Type notify's audience. Type all/group1-3/team's name(orange)`,
  // getAddMeetupLinkMsg: `Type meetup's link.`,
  // getAddMeetupConfirmMsg: text =>
  // `Current version of your meetup:\n ${text} \n Are you sure you want to add it? Type yes/no`,
  getAddNotifyConfirmMsg: text =>
    `Current version of your notify:\n ${text} \n Are you sure you want to add it? Type yes/no`,
  // getDeleteMeetupConfirmMsg: `Are you sure you want to delete it? Type yes/no`,
  getDeleteNotifyConfirmMsg: `Are you sure you want to delete it? Type yes/no`,
  // typeMeetupInList: list => `${list} \n Type [meetup's title].\nFor instance hello`,
  typeNotifyInList: list => `${list} \n Type [notify's time].\nFor instance 12:00`,
  // IncorrectMeetupTitle: 'This meetup does not exist',
  // incorrectMeetupTime: `Incorrect time format. Format [hh:mm]-[hh:mm]. Type for instance 08:00-09:00`,
  // incorrectMeetupAudience: `Incorrect audience choice. Type all/group1-3/team's name(orange)`,
  // incorrectMeetupDay: `Incorrect day choice. Type day1-6`,
  // incorrectMeetupLink: 'Incorrect link url',
  IncorrectNotifyTitle: 'This notify does not exist',
  incorrectNotifyTime: `Incorrect time format. Format [hh:mm]-[hh:mm]. Type for instance 08:00-09:00`,
  incorrectNotifyAudience: `Incorrect audience choice. Type all/group1-3/team's name(orange)`,
  incorrectNotifyDay: `Incorrect day choice. Type day1-6`,

  // selectEditInMeetup: 'Select which part of meetup you want to edit',
  selectEditInNotify: 'Select which part of meetup you want to edit',
  // typeNewMeetupProp: prop => `Type new <${prop}> for selected meetup`,
  typeNewNotifyProp: prop => `Type new <${prop}> for selected notify`,
  // getEditMeetupConfirmMsg: ({ prop, from, to }) =>
  // `Are you sure you want to edit <${prop}> from '${from}' to '${to}'? Type yes/no`,
  getEditNotifyConfirmMsg: ({ prop, from, to }) =>
    `Are you sure you want to edit <${prop}> from '${from}' to '${to}'? Type yes/no`,
  typeMsgForSending: 'Type new message for choosed audience',
  askFileForSendingMsg: 'Are you going to load file? Type yes/no',
  selectAudience: 'Select audience',
  incorrectYesNo: 'Incorrect input',
  waitLoadFile: 'Send me needed FILE. FILE, not just a picture from gallery 😉',
  sendMsgFileConfirm: ({ msg, filename, receiver }) =>
    `Are you sure you want to send msg:\n'${msg}'${
      filename ? '\nWith file ' + "'" + filename + "'" : ''
    } for ${receiver}? Type yes/no`,
  chooseInListLyrics: `Type lyrics number. For instance 1`,
}
