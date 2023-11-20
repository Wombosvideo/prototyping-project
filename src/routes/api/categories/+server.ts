import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { mdiBank, mdiBasketball, mdiCurtains, mdiDramaMasks, mdiGuitarElectric, mdiHumanMaleFemaleChild, mdiPalette, mdiPartyPopper, mdiSchool, mdiStadium } from "@mdi/js";

export const GET: RequestHandler = async () => {
  return json({
    status: "success",
    categories: [
      { id: "concerts", name: "Concerts", icon: mdiGuitarElectric },
      { id: "festivals", name: "Festivals", icon: mdiStadium },
      { id: "parties", name: "Parties", icon: mdiPartyPopper },
      { id: "theatre", name: "Theatre", icon: mdiCurtains },
      { id: "comedy", name: "Comedy", icon: mdiDramaMasks },
      { id: "sport", name: "Sport", icon: mdiBasketball },
      { id: "family", name: "Family", icon: mdiHumanMaleFemaleChild },
      { id: "arts", name: "Arts", icon: mdiPalette },
      { id: "exhibitions", name: "Exhibitions", icon: mdiBank },
      { id: "courses", name: "Courses", icon: mdiSchool },
    ] as App.DTCategory[],
  });
};
