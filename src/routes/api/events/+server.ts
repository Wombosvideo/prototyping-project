import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { events as collection } from "$lib/server/mongodb";
import { ObjectId } from "mongodb";

export const GET: RequestHandler = async ({ url }) => {
  const manager = url.searchParams.get("by");
  const events = (await collection.find(manager ? {managers: new ObjectId(manager)} : {}).toArray()).map(e => ({...e, _id: e._id.toString()})) as App.DTEvent[];

  return json({
    status: "success",
    events,
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
