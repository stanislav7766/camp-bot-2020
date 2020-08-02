export const GROUPS = ['group1', 'group2', 'group3']
export const DAYS = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6']
export const TEAMS = ['orange', 'pink', 'purple', 'navy', 'white']
export const STATUS = ['user', 'admin']
export const ALL_CAMP_AUDIENCE = 'all'
export const MEETUP_PROPS = ['day', 'time', 'audience', 'facilitator', 'link', 'title']
export const ALL_CAMP_SCHEDULE_LINK =
  'https://calendar.google.com/calendar/b/0?cid=ODFuNGIyNXIxYThiZzJidmNxa3JqcWkyY2dAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ'
export const DAYS_DATES_MAP = {
  day1: '2020-08-03T', //+12:00:00
  day2: '2020-08-04T',
  day3: '2020-08-05T',
  day4: '2020-08-06T',
  day5: '2020-08-07T',
  day6: '2020-08-08T',
}

export const getTgUrl = ({ id, msg }) =>
  `https://api.telegram.org/bot${process.env.BOT_ACCOUNT_TOKEN}/sendMessage?chat_id=${id}&text=${msg}`

export const getTeamBase = team =>
  ({
    ['orange']: `
    https://t.me/orangeteam10820
    @secretgeorge Sviat
    @irynachr Ira`,
    ['pink']: `
    https://t.me/joinchat/GLclpxlDO3LYQNqQNPkq0Q
    @Yana_Pokora Yana
    @xnamed Vlad`,
    ['purple']: `
    https://t.me/joinchat/FvaHrByXzfjWw3cb4bAAQw
    @yelyzavetar Liza
    @alinakolpakova Alina`,
    ['navy']: `
    https://t.me/joinchat/DOTCqxvQlRKkB3JxvSyr2A
    @annamtshk Annushka
    @hrynchakm Max`,
    ['white']: `
    https://t.me/joinchat/Gat8Llfdf0SUL_5qmuXZOw
    @DashaKorotkevych Dasha
    @astarianka Anka`,
  }[team])

export const allLyrics = {
  [1]: {
    title: 'Baby Shark',
    text: `Baby Shark
    (shark mouth with hands connected at wrist)
    Baby shark, Doh-doh, doh, doh
    Baby shark, Doh-doh, doh, doh
    Baby shark, Doh-doh, doh, doh
    Baby shark
    Continue by replacing “baby” with the following lines:
    Momma shark (Shark mouth with forearms connected at elbows)
    Daddy shark (Shark mouth with full arms)
    Grandma shark (Same as baby, but with fists instead of fingers to look like no teeth)
    For a swim (Swimming crawl motion with arms)
    Saw a fin (Hand on top of head like shark fin)
    Swimming fast (Fast swimming motion with arms)
    Shark attack (Shark mouth with full arms and fingers as teeth while hands clap together)
    Lost a leg (Hop on one leg to the beat)
    Happy shark (Thumbs up and swaying to the beat)
    `,
  },
  [2]: {
    title: 'Bananas',
    text: `(This can be done in two different ways. First, you can sing this song as one large group that is spread out. The second time, the students can be brought closely together in a tight group. This song should start quiet and then get very loud at the end.)
    Bananas of the world UNITE! (Teacher should sound very authoritative when saying this phrase.
    Motion: Slowly raise both arms and clap them above your head.)
    Pick bananas, pick, pick bananas
    (Make motion like you are picking bananas)
    Peel bananas, peel, peel bananas
    (Bend one arm down in a peeling motion)
    Chop bananas, chop, chop bananas
    (Hold your left hand flat and then use your right hand in a chopping motion)
    Eat bananas, eat, eat bananas
    (Make a motion like you are eating with a spoon)
    Shake bananas, shake, shake bananas
    (Drop arms and twist and shake body)
    Jump bananas, jump, jump bananas
    (Jump up and down)
    Go bananas, go, go bananas!
    (Continue jumping up and down and also wave your arms in the air)    
    `,
  },
  [3]: {
    title: 'Boom Chick-A-Boom (Repeat after me)',
    text: `Boom Chick-A-Boom (Repeat after me)
    (Person in the center shows a dance move)
    I said a boom chick-a boom
    (Everyone repeats) I said a boom chick-a boom
    (Person in center shows a different dance move)
    I said a boom chick-a boom
    (Everyone repeats) I said a boom chick-a boom
    (Person in center shows another dance move) I said a boom chick-a rock-a chick-a rock-a chick-a boom
    (Everyone repeats) I said a boom chick-a rock-a chick-a rock-a chick-a boom
    (Person in center) That's alright!
    (Person in center) That's ok!
    (Person in center, pointing at new person) Let's do it.... (name)'s way!
    (New person goes to center to lead)       
    `,
  },
  [4]: {
    title: 'Funky Chicken',
    text: `Funky Chicken
    (This is should be done in 2 single file lines with each group facing each other)
    Everyone: 1, 2, 3, 4, 5, 6, 7, 8!
    Group 1: Let me see your funky chicken!
    Group 2: What did you say?!
    Group 1: I said let me see your funky chicken!
    Group 2: What did you say?!
    Everyone: (All campers should make their way to the space between the 2 groups while flapping their arms like a chicken) I said ooh ahh ahh ahh, ooh ahh ahh ahh
    Ooh ahh ahh ahh, ooh, one more time
    (All campers should make their way back to their single file line
    while flapping their arms like a chicken)
    Ooh ahh ahh ahh, ooh ahh ahh ahh
    Ooh ahh ahh ahh ooh, Back in line!
    *Repeat verse with Babushka, Klitschko Brothers, Superman, Harry Potter, etc.    
    `,
  },
  [5]: {
    title: 'Hi, My Name is Joe!',
    text: `Hi, My Name is Joe!
    Hi, my name is Joe,
    And I work in a button factory.
    One day, my boss said to me and said “Hi Joe! Are ya busy?” I said no
    So I pushed the button with my right hand.
    (Make a push gesture with the right hand.)
    *Repeat the song by adding new body parts to push with and keep doing all actions simultaneously.
    Body parts: left hand, right foot, left food, head.     
    `,
  },
  [6]: {
    title: 'Little Red Wagon (Repeat after me)',
    text: `Little Red Wagon (Repeat after me)
    (Starts off quietly, gets louder after each verse)
    You can’t ride in my little red wagon.
    The front seats broken
    And the axle's dragging.
    Choga, choga, choga-choga-choga!
    SECOND VERSE, SAME AS THE FIRST
    EXCEPT A WHOLE LOT LOUDER AND A WHOLE LOT WORSE!
    (Repeat 4x)     
    `,
  },
  [7]: {
    title: 'Penguin Song (Repeat after me)',
    text: `Chorus:
    Have you ever seen
    A penguin come to tea?
    When you look at me
    A penguin you will see!
    PENGUINS ATTENTION! PENGUINS BEGIN!
    (In between each chorus, add one of the following by calling out the following commands with actions. Each time you call out a new command, you add it to the existing motions.)
    Right Flipper (Flap right arm)
    Left Flipper (Flap left arm)
    Right Foot (Kick right foot)
    Left Foot (Kick left foot)
    Bob your head (Bob your head)
    Turn in a circle (Turn in a circle)
    Stick out your tongue (Stick out your tongue and sing song)
    (At the end)... it's PENGUINS ATTENTION! PENGUINS DISMISSED!    
    `,
  },
  [8]: {
    title: 'Jig-A-Lo',
    text: `Hey (name)!
    -Hey what!
    Can you Jig?
    -Jig what?
    -A jigalo!
    -You mean my hands up high
    My knees down low
    This is how I jigalo
    Jig-a-lo, jig, jig-a-looooo
    Jig-a-lo, jig, jig-a-looooo
    (repeat multiple times)    
    `,
  },
  [9]: {
    title: 'Show me how you get down',
    text: `Insert the name instead of “___”
    "Hey _________!"
    "Hey what?"
    "HEY _________!!!!!"
    "HEY WHAT?"
    "Show me how to get down!"
    "No way!"
    ‘Show me how you get down!”
    “Okay! D-O-W-N and this is how I get down!” (2x)       
    `,
  },
  [10]: {
    title: 'Sixties Party! (Repeat after me)',
    text: `Sixties Party! (Repeat after me)
    It’s a sixties party from a sixties movie! (dance while turning around)
    See the surfers on their surfboards (hand as though shielding eyes from sun, looking back and forth)
    Da-na-na-na-na na-na-na-na na! (jump to the left and act like you are standing on a surf board)
    Da-na-na-na-na na-na-na-na na! (jump to the right side and act like you are standing on a surf board)
    It's a sixties party from a sixties movie!
    See the swimmers in the water
    Swim Swim Swim Swim! (move arms as though swimming)
    Da-na-na-na-na na-na-na-na na,
    Da-na-na-na-na na-na-na-na na!
    It's a sixties party from a sixties movie!
    See the jellyfish on the beaches!
    Squishy Squishy Squishy Squish (stamp out imaginary jellyfish with foot)
    Swim Swim Swim Swim!
    Da-na-na-na-na na-na-na-na na,
    Da-na-na-na-na na-na-na-na na!
    It's a sixties party from a sixties movie!
    See the tanners on their towels!
    Ouchie Ouchie Ouchie Ouch! (pat hands on arms as though burned)
    Squishy Squishy Squishy Squish!
    Swim Swim Swim Swim!
    Da-na-na-na-na na-na-na-na na,
    Da-na-na-na-na na-na-na-na na!
    It's a sixties party from a sixties movie!
    See the lifegaurds on their towers!
    Flexie Flexie Flexie Flex! (Flex arms)
    Ouchie Ouchie Ouchie Ouch!
    Squishy Squishy Squishy Squish!
    Swim Swim Swim Swim!
    Da-na-na-na-na na-na-na-na na,
    Da-na-na-na-na na-na-na-na na!    
    `,
  },
  [11]: {
    title: 'Good Job!',
    text: `(do this after anyone has done a good job, or after any of the songs)
    Oooooooooohhhhhhhhh (roll your fists around in circles)
    Good job! (2 thumbs up)
    Good, (right thumb up)
    Good, (left thumb up)
    Good, (right thumb up)
    HUH! (knee up)    
    `,
  },
  [12]: {
    title: 'Red HOT!',
    text: `Red HOT!
    (Name) is red hot!
    _____ is red hot!
    _____ is R-E-D, red, H-O-T, hot, he (or she, or they) can’t help but what he’s got!
    He’s red hot, huh!
    Red hot, huh!     
    `,
  },
  [13]: {
    title: 'You’re so fine!',
    text: `You’re so fine!
    Hey, (name), you’re so fine,
    You’re so fine, you blow my mind!
    Hey (name)! (clap-clap, clap-clap)
    Hey (name)! (clap-clap, clap-clap)    
    `,
  },
  [14]: {
    title: 'Борщ (Repeat after me)',
    text: `Борщ (Repeat after me)
    Борщ! (hold up a bowl of borshch)
    Зелений! (hold up greens in the other hand)
    Зелений зі сметаною! (mix the sour cream in the borshch)
    Ми їли на вечерю! (act like you’re eating from the bowl)
    Це було дуже смачно! (rub your stomach in satisfaction)
    (Repeat over and over, louder every time)    
    `,
  },
  [15]: {
    title: 'Aleleh (Repeat after me)',
    text: `Aleleh (Repeat after me)
    (First time, act like you’re holding something very small in your hand)
    Oh! (hold the “thing”)
    Alele!
    Alele kita ponga!
    A masa, masa, masa!
    Ooooooh woop! (throw the “thing” away)
    (Repeat multiple times, making the “thing” bigger and heavier every time)   
    `,
  },
  [16]: {
    title: 'Secret note song',
    text: `(do this during mail-time when someone picks up a secret note)
    SECRET NOTE, it’s secret SECRET NOTE, don’t read it
    SECRET NOTE, it’s mine
    ARRRRR     
    `,
  },
  [17]: {
    title: `East-West`,
    text: `CHORUS
    You: Na na na na na
    Campers: Na na na na na
    You: Na na na na na
    Campers: Na na na na
    You: From East to West,
    Campers: From East to West,
    You: Camp Mascot is the best!
    Campers: Camp Mascot is the best!
    You:From East to West,
    Campers: From East to West,
    You: Camp Mascot is the best!
    Campers camp Mascot is the best!
    CHORUS
    From city to city,
    From city to city,
    Camp Mascot is really pretty!
    Camp Mascot is really pretty!
    From city to city,
    From city to city,
    Camp Mascot is really pretty!
    Camp Mascot is really pretty!
    CHORUS
    From town to town,
    From town to town,
    Camp Mascot is getting down!
    Camp Mascot is getting down!
    From town to town,
    From town to town,
    Camp Mascot is getting down!
    Camp Mascot is getting down!
    `,
  },
  [18]: {
    title: `Bear Hunt`,
    text: `(bend your knees and start slapping them)
    We’re going on a bear hunt! (wait so that campers can repeat after you)
    We’re not scared!
    Cause we have bullets.
    And guns (show them)
    Yeah! (continue slapping your knees)
    We’re coming to the forest!
    We can’t go over it (throw your hand up in the air)
    We can’t go under it (put your hand down)
    We can go through it.
    Swoosh! Swoosh! Swoosh-swoosh-swoosh! (show like you’re pushing the bushes apart)
    Now clean yourself. (clean yourself from the leaves and slap your knees)
    We’re coming to the river!
    We can’t go over it! (do the same as in the forest)
    We can’t go under it!
    We can swim through it!
    Swim! Swim! Swim-swim-swim! (do like if you were swimming)
    Now let’s get dry. (shake the water off and keep slapping your knees)
    We’re coming to the mountain!
    We can’t go under it! (the same movements)
    We can’t go through it!
    We can climb over!
    Climb! Climb! Climb-climb-climb! (do like if you were climbing a mountain)
    Now let’s take a photo on the top. (taking a photo)
    Now slide down!
    Slide! Slide! Slide-slide-slide! (do like if you were surfing the board and keep slapping your knees)
    Oh no! It’s a cave!
    We can’t go under it!
    We can’t go over it!
    We can go into it!
    Tip-toe! Tip-tip toe! (whisper it)
    What is it?
    It has big brown fur!
    White fangs and claws!
    Oh no, IT’S A BEAR!
    Run! Run! (slap your knees faster)
    Climb the mountain!
    Climb! Climb! Climb-climb-climb!
    Slide down the mountain!
    Slide! Slide! Slide-slide-slide!
    Swim through the river!
    Swim! Swim! Swim-swim-swim!
    Run through the forest!
    Swoosh! Swoosh! Swoosh-swoosh-swoosh!
    Run to the home!
    Close the door and run upstairs!
    Jump into your bed!
    (a little pause and slap your knees again)
    We were on the bear hunt.
    We were NOT scared.
    Cause we had bullets!
    And guns! (show them)
    A lot of them! Yeah.    
    `,
  },
  [19]: {
    title: `Big Fat Pony`,
    text: `(Campers need to form a circle and the one who starts this energizer is running inside this circle near the campers. When the lyrics go to ‘Front! Front! Front!’ this person stops in front of the last person he had passed and then this person joins the leader and they continue singing all together. All ends when the chain of participants is full and everybody joined this game)
    Here we go with a big fat pony (x3)
    Early in the morning!
    Front-front-front my baby
    Side-side-side my baby
    Back-back-back to my baby
    Early in the morning.    
    `,
  },
}

export const getAllLyrics = () =>
  Object.keys(allLyrics).reduce((accum, key) => `${accum}${key}.  ${allLyrics[key].title}\n `, '')
