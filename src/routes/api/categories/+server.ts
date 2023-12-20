import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { mdiBank, mdiBasketball, mdiCurtains, mdiDramaMasks, mdiGuitarElectric, mdiHumanMaleFemaleChild, mdiPalette, mdiPartyPopper, mdiSchool, mdiStadium } from "@mdi/js";

export const GET: RequestHandler = async () => {
  // FIXME: Replace with categories from database
  return json({
    status: "success",
    categories: [
      { _id: "concerts", name: "Concerts", icon: mdiGuitarElectric },
      { _id: "festivals", name: "Festivals", icon: mdiStadium },
      { _id: "parties", name: "Parties", icon: mdiPartyPopper },
      { _id: "theatre", name: "Theatre", icon: mdiCurtains },
      { _id: "comedy", name: "Comedy", icon: mdiDramaMasks },
      { _id: "sport", name: "Sport", icon: mdiBasketball },
      { _id: "family", name: "Family", icon: mdiHumanMaleFemaleChild },
      { _id: "arts", name: "Arts", icon: mdiPalette },
      { _id: "exhibitions", name: "Exhibitions", icon: mdiBank },
      { _id: "courses", name: "Courses", icon: mdiSchool },
    ] as App.DTCategory[],
  });
};
