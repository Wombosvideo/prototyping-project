import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  return json({
    status: "success",
    events: [
      {
        id: "1",
        name: "The Rocks, Tour 2023 - Sydney",
        description:
`🎸🤘 Get ready for an electrifying night of pure rock 'n' roll at "The Rocks, Sydney - Tour 2023"! 🎶

📅 Date: Saturday, December 9th, 2023  
🕖 Time: 7:00 PM onwards

Join us for an adrenaline-fueled experience as legendary rock bands take the stage, setting the night ablaze with their timeless hits and epic guitar riffs! Feel the raw energy pulsating through the crowd, as passionate fans unite in a symphony of cheers and applause. 🎵🔥

Get ready to sway to the music, sing along at the top of your lungs, and create unforgettable memories in the heart of Sydney. 🌟 Don't miss this epic night of rock music that'll leave your soul soaring and your heart pounding! 🤩

Secure your spot now for a night that promises to be nothing short of legendary! 🎉🎸`,
        startDateTime: "2023-12-01T00:00:00.000Z",
        endDateTime: "2023-12-01T01:00:00.000Z",
        price: 150,
        maxParticipants: 150,
        venueId: "1",
        banner: "https://picsum.photos/id/453/800/400",
        /*
        moreInfo: 
`<h2>About the Band</h2>
Once upon a time, in the bustling streets of Sydney, four passionate musicians found themselves magnetically drawn to each other's music. First up, there was Axel, the enigmatic lead guitarist known for shredding solos that could make the heavens weep. His counterpart in energy was Lola, the fiery drummer whose beats could stir the wildest souls. Then there was Max, the bassist with a funky groove that could make anyone dance, and lastly, the soulful vocalist, Ruby, whose voice could charm the stars themselves.

Their paths crossed at a local dive bar where they all happened to be performing on the same night. Fate intervened when a power outage plunged the venue into darkness, leaving only the emergency lights and the band's shared love for rock 'n' roll illuminating the stage. With nothing but raw talent and a spontaneous camaraderie, they jammed together, creating magic that night. The audience went wild, and The Rocks were born in that whirlwind of musical synergy and shared passion.

From that serendipitous moment, they embarked on a wild journey, playing in every garage, pub, and street corner that would have them. Their adventures took them across Australia, each gig adding a new chapter to their story. They braved broken strings, impromptu stage dives, and even once performed atop a moving truck during a city parade! Through it all, their bond only grew stronger, fueled by their love for music and the thrill of the unknown.`,
      
      */
      },
    ] as App.DTEvent[],
  });
};

//"https://picsum.photos/seed/heaven-is-a-place-on-earth/800/400" Coffee
//="https://picsum.photos/id/63/800/400"
//"https://picsum.photos/seed/its-raining-men/800/400" Masse Hall
//= "https://picsum.photos/id/819/800/400"
//"https://picsum.photos/seed/manic-monday/800/400" Wood Planks
//= "https://picsum.photos/id/307/800/400"
//"https://picsum.photos/seed/another-day-in-paradise/800/400" Church
//= "https://picsum.photos/id/1000/800/400"
//"https://picsum.photos/seed/rosanna/800/400" Nature Photography
//= "https://picsum.photos/id/1044/800/400"
//"https://picsum.photos/seed/the-best/800/400" Graffiti
//= "https://picsum.photos/id/101/800/400"
//"https://picsum.photos/seed/girls-just-want-to-have-fun/800/400" Historic Farming
//= "https://picsum.photos/id/729/800/400"
//"https://picsum.photos/seed/sweet-dreams/800/400" Party
//= "https://picsum.photos/id/158/800/400"
//"https://picsum.photos/seed/another-one-bites-the-dust/800/400" Course
//= "https://picsum.photos/id/4/800/400"
//"https://picsum.photos/seed/beat-it/800/400" Train Station in Fog
//= "https://picsum.photos/id/220/800/400"
//"https://picsum.photos/seed/red-red-wine/800/400" Wedding dress
//= "https://picsum.photos/id/1013/800/400"
//"https://picsum.photos/seed/something-got-me-started/800/400" San Francisco
//= "https://picsum.photos/id/693/800/400"
//"https://picsum.photos/seed/believe/800/400" Geweih auf dunklem Sand mit rotem Schal
//= "https://picsum.photos/id/891/800/400"
//"https://picsum.photos/seed/the-bad-touch/800/400" Bücher
//= "https://picsum.photos/id/1073/800/400"
//"https://picsum.photos/seed/im-so-excited/800/400" VW in der Wüste
//= "https://picsum.photos/id/551/800/400"
//"https://picsum.photos/seed/fame/800/400" Church
//= "https://picsum.photos/id/979/800/400"
//"https://picsum.photos/seed/cant-fight-this-feeling/800/400" Analog Camera
//= "https://picsum.photos/id/454/800/400"
//"https://picsum.photos/seed/club-tropicana/800/400" Ferry's Wheel
//= "https://picsum.photos/id/639/800/400"
//"https://picsum.photos/seed/coco-jamboo/800/400" Party2
//= "https://picsum.photos/id/56/800/400"
//"https://picsum.photos/seed/dream-on/800/400" Concert
//= "https://picsum.photos/id/304/800/400"
//"https://picsum.photos/id/437/800/400" Café
//"https://picsum.photos/id/444/800/400" Library
//"https://picsum.photos/id/450/800/400" Peyto Lake
//"https://picsum.photos/id/452/800/400" Concert2
//"https://picsum.photos/id/453/800/400" Concert3
//"https://picsum.photos/id/486/800/400" Typewriter
//"https://picsum.photos/id/1040/800/400" Schloss Neuschwanstein
