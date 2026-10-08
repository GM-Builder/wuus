"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Heart,
  Images,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  Users,
  Wifi,
  X,
} from "lucide-react";
import type { PropertyData, RatePlan, Room } from "./demo-data";
import { BrandArtwork } from "@/components/marketing/brand-artwork";
import { BookingFlow } from "@/components/hospitality/booking-flow";
import { DemoDialog } from "@/components/hospitality/demo-dialog";
import { DateCalendar } from "@/components/hospitality/date-calendar";
import {
  emptyStay,
  money,
  quote,
  roomFits,
  sampleStay,
  shortDate,
  stayNights,
  validateStay,
  type Currency,
  type Stay,
} from "@/components/hospitality/booking-model";
import s from "@/components/hospitality/demo.module.css";

const concepts = [
  { slug: "seaside-guesthouse", name: "Coastal retreat" },
  { slug: "lakeside-wine-estate", name: "Wine estate" },
  { slug: "city-apartments", name: "City suites" },
];
const themes: Record<
  string,
  { key: string; name: string; intro: string; title: string; story: string }
> = {
  "seaside-guesthouse": {
    key: "coast",
    name: "ARTISAN",
    intro: "A SLOWER KIND OF SEASIDE",
    title: "Stay a little closer to the sea.",
    story:
      "Salt in the air. Sun on the stone. A small coastal hideaway made for unhurried mornings and finding your own corner of the Riviera.",
  },
  "lakeside-wine-estate": {
    key: "wine",
    name: "SAVORIA",
    intro: "LAKE. LAND. A LITTLE HISTORY.",
    title: "Good days age beautifully.",
    story:
      "Wake to the lake, wander through the vines, and linger over something local. An intimate estate where the best plans leave a little room for discovery.",
  },
  "city-apartments": {
    key: "city",
    name: "METROPOLITAN",
    intro: "YOUR OWN PIECE OF THE CITY",
    title: "Check in. Step out. Belong.",
    story:
      "A quiet place above the rhythm of the old town. Thoughtful suites, beautiful details, and a neighborhood worth getting a little lost in.",
  },
};
type Gallery = { images: string[]; title: string; index: number };

export function DemoPropertyClient({
  property,
  slug,
}: {
  property: PropertyData;
  slug: string;
}) {
  const theme = themes[slug];
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [saved, setSaved] = useState(false);
  const [draft, setDraft] = useState<Stay>({ ...emptyStay, childAges: [] });
  const [stay, setStay] = useState<Stay | null>(null);
  const [searchError, setSearchError] = useState("");
  const [guestOpen, setGuestOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [breakfastOnly, setBreakfastOnly] = useState(false);
  const [flexibleOnly, setFlexibleOnly] = useState(false);
  const [sort, setSort] = useState("curated");
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [details, setDetails] = useState<Room | null>(null);
  const [booking, setBooking] = useState<{
    room: Room;
    plan: RatePlan;
    stay: Stay;
  } | null>(null);
  const [area, setArea] = useState(0);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const fmt = (cents: number) => money(cents, currency);
  const lowest = Math.min(
    ...property.rooms.flatMap((room) =>
      room.ratePlans.map((plan) => plan.rate),
    ),
  );
  const photos = [
    ...new Set([
      property.heroImage,
      ...property.rooms.flatMap((room) => room.gallery),
      property.atmosphereImage,
    ]),
  ];
  const visibleRooms = property.rooms
    .map((room, index) => ({
      room,
      inventory: index === 0 ? 3 : 2,
      plans: room.ratePlans.filter(
        (plan) =>
          (!breakfastOnly || plan.breakfastIncluded) &&
          (!flexibleOnly || plan.freeCancellation),
      ),
    }))
    .filter(
      (item) =>
        item.plans.length &&
        (!stay || roomFits(item.room, stay, item.inventory)),
    )
    .sort((a, b) =>
      sort === "price"
        ? Math.min(...a.plans.map((p) => p.rate)) -
          Math.min(...b.plans.map((p) => p.rate))
        : sort === "space"
          ? Number(b.room.size.replace(/[^\d.]/g, "")) -
            Number(a.room.size.replace(/[^\d.]/g, ""))
          : 0,
    );
  const dirty = stay && JSON.stringify(draft) !== JSON.stringify(stay);
  function applyStay(value = draft) {
    const error = validateStay(value);
    setSearchError(error || "");
    if (error) return false;
    setStay({ ...value, childAges: [...value.childAges] });
    return true;
  }
  function trySample() {
    const value = sampleStay();
    setDraft(value);
    applyStay(value);
  }
  function choose(room: Room, plan: RatePlan) {
    if (!stay || dirty) {
      setSearchError(
        "Apply your dates and guest count before choosing a rate.",
      );
      document
        .getElementById("stay-search")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setBooking({ room, plan, stay });
  }
  function changeGuests(key: "adults" | "children" | "rooms", delta: number) {
    const value = draft[key] + delta;
    setDraft({
      ...draft,
      [key]: value,
      childAges:
        key === "children"
          ? Array.from(
              { length: value },
              (_, index) => draft.childAges[index] ?? 8,
            )
          : draft.childAges,
    });
  }
  const facilities = [
    {
      icon: Wifi,
      label: "Fast, complimentary Wi-Fi",
      note: "Stay connected, when you want to.",
    },
    {
      icon: Coffee,
      label: "Breakfast worth waking for",
      note: "Choose a breakfast-inclusive rate.",
    },
    {
      icon: Sun,
      label:
        theme.key === "city"
          ? "A neighborhood at your doorstep"
          : "Room to enjoy the outdoors",
      note: property.locationHighlight,
    },
    {
      icon: BedDouble,
      label: "Comfort in every detail",
      note: "Beautiful linen and a thoughtful space.",
    },
    {
      icon: ShieldCheck,
      label: "Simple arrival",
      note: "Check-in from 14:00 · check-out by 11:00.",
    },
    {
      icon: MapPin,
      label: "Local recommendations",
      note: "A few favorite places to start exploring.",
    },
  ];
  return (
    <div
      className={s.site}
      data-theme={theme.key}
      lang="en"
      onClickCapture={(event) => {
        if (event.target instanceof Element)
          event.target
            .closest<HTMLButtonElement>("button")
            ?.focus({ preventScroll: true });
      }}
    >
      <div className={s.inspector}>
        <Link
          href="/hospitality"
          className={s.wuus}
          aria-label="WUUS Hospitality"
        >
          <BrandArtwork />
        </Link>
        <span className={s.conceptLabel}>INTERACTIVE CONCEPT</span>
        <nav aria-label="Other property concepts">
          {concepts.map((concept) => (
            <Link
              key={concept.slug}
              href={`/hospitality/demo/${concept.slug}`}
              aria-current={slug === concept.slug ? "page" : undefined}
            >
              {concept.name}
            </Link>
          ))}
        </nav>
        <Link className={s.inspectorCta} href="/hospitality#review">
          Want this for your property? <ArrowRight size={14} />
        </Link>
      </div>
      <div className={s.demoNotice}>
        Fictional property · AI-generated concept photography · booking and
        prices are demonstrations
      </div>
      <header className={s.propertyNav}>
        <a href="#overview" className={s.wordmark}>
          {theme.name}
          <small>
            {theme.key === "wine"
              ? "ESTATE & VINEYARDS"
              : theme.key === "city"
                ? "LOFT SUITES · SARAJEVO"
                : "COASTAL RETREAT"}
          </small>
        </a>
        <nav aria-label="Property navigation">
          {["Rooms", "Facilities", "Area", "Reviews", "FAQ"].map((label) => (
            <a key={label} href={`#${label.toLowerCase()}`}>
              {label}
            </a>
          ))}
        </nav>
        <label className={s.currency}>
          <span className={s.srOnly}>Display currency</span>
          <select
            aria-label="Display currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
          >
            <option>EUR</option>
            <option>USD</option>
            <option>GBP</option>
          </select>
        </label>
        <a className={s.button} href="#stay-search">
          Find your stay <ArrowRight size={15} />
        </a>
      </header>
      <nav className={s.mobileNav} aria-label="Explore the property">
        {["Rooms", "Facilities", "Area", "Reviews", "FAQ"].map((label) => (
          <a key={label} href={`#${label.toLowerCase()}`}>
            {label}
          </a>
        ))}
      </nav>
      <main>
        <section id="overview" className={s.hero}>
          <div className={s.heroHeading}>
            <div>
              <p className={s.eyebrow}>{theme.intro}</p>
              <h1>{theme.title}</h1>
              <p className={s.location}>
                <MapPin size={16} />
                {property.location}
              </p>
            </div>
            <button
              className={`${s.saveButton} ${saved ? s.saved : ""}`}
              aria-pressed={saved}
              onClick={() => setSaved(!saved)}
            >
              <Heart size={17} fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved for this visit" : "Save this stay"}
            </button>
          </div>
          <div className={s.heroPhotos}>
            <button
              className={s.mainPhoto}
              onClick={() =>
                setGallery({ images: photos, title: "A closer look", index: 0 })
              }
              aria-label="View property gallery"
            >
              <Image
                src={property.heroImage}
                alt={`${property.name} — concept property photography`}
                fill
                preload
                sizes="(max-width: 700px) 100vw, 70vw"
              />
              <span className={s.photoCaption}>
                <span>Some places make you pause.</span>
                <small>{property.category}</small>
              </span>
            </button>
            <div className={s.sidePhotos}>
              {property.rooms.slice(0, 2).map((room) => (
                <button
                  key={room.id}
                  onClick={() =>
                    setGallery({
                      images: room.gallery,
                      title: room.name,
                      index: 0,
                    })
                  }
                  aria-label={`View ${room.name} photos`}
                >
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    sizes="(max-width: 700px) 50vw, 30vw"
                  />
                  <span>{room.name}</span>
                </button>
              ))}
            </div>
            <button
              className={s.allPhotos}
              onClick={() =>
                setGallery({ images: photos, title: "A closer look", index: 0 })
              }
            >
              <Images size={16} />
              All {photos.length} photos
            </button>
          </div>
          <div id="stay-search" className={s.searchWrap}>
            <div className={s.searchIntro}>
              <span>
                <Sparkles size={16} /> Make yourself at home
              </span>
              <button className={s.textButton} onClick={trySample}>
                Try a sample stay <ArrowRight size={14} />
              </button>
            </div>
            <form
              className={s.searchBar}
              onSubmit={(e) => {
                e.preventDefault();
                if (applyStay())
                  document
                    .getElementById("rooms")
                    ?.scrollIntoView({ behavior: "smooth" });
              }}
              noValidate
            >
              <label>
                Check-in
                <input
                  type="date"
                  aria-label="Check-in"
                  value={draft.checkIn}
                  onChange={(e) =>
                    setDraft({ ...draft, checkIn: e.target.value })
                  }
                />
              </label>
              <label>
                Check-out
                <input
                  type="date"
                  aria-label="Check-out"
                  value={draft.checkOut}
                  onChange={(e) =>
                    setDraft({ ...draft, checkOut: e.target.value })
                  }
                />
              </label>
              <button
                className={s.calendarButton}
                aria-label="Open date calendar"
                type="button"
                onClick={() => setCalendarOpen(true)}
              >
                <CalendarDays size={20} />
              </button>
              <button
                type="button"
                className={s.guestTrigger}
                onClick={() => setGuestOpen(true)}
              >
                <span>Guests & rooms</span>
                <strong>
                  <Users size={17} />
                  {draft.adults + draft.children} guests · {draft.rooms}{" "}
                  {draft.rooms === 1 ? "room" : "rooms"}
                </strong>
              </button>
              <button type="submit" className={s.button}>
                Check availability <ArrowRight size={17} />
              </button>
            </form>
            {searchError && (
              <p className={s.error} role="alert">
                {searchError}
              </p>
            )}
            {dirty && (
              <p className={s.searchHint}>
                Your choices changed. Check availability to update room prices.
              </p>
            )}
            <small>
              Example availability only. Nothing is reserved until connected to
              a real booking system.{" "}
              {currency !== "EUR" &&
                "Currency conversion is fixed for this demo."}
            </small>
          </div>
        </section>
        <section className={`${s.story} ${s.container}`}>
          <div>
            <p className={s.eyebrow}>LESS ORDINARY. MORE YOURS.</p>
            <h2>
              A place to settle in.
              <br />A reason to step outside.
            </h2>
          </div>
          <div>
            <p>{theme.story}</p>
            <div className={s.storyHighlights}>
              <span>
                <Check size={16} /> Two distinctive room types
              </span>
              <span>
                <Check size={16} /> Flexible example rates
              </span>
              <span>
                <Check size={16} /> A clear price before you book
              </span>
            </div>
          </div>
        </section>
        <section id="rooms" className={s.roomsSection}>
          <div className={s.container}>
            <div className={s.sectionHeading}>
              <div>
                <p className={s.eyebrow}>FIND YOUR FAVORITE</p>
                <h2>Rooms with a point of view.</h2>
                <p>
                  {stay
                    ? `${shortDate(stay.checkIn)}–${shortDate(stay.checkOut)} · ${stayNights(stay)} nights · ${stay.adults + stay.children} guests · ${stay.rooms} room(s)`
                    : "A little space, a good night’s sleep, and something to look forward to."}
                </p>
              </div>
              <span className={s.smallBadge}>
                {visibleRooms.length} room types
                {stay ? " match" : " to explore"}
              </span>
            </div>
            <div className={s.filters}>
              <span>
                <SlidersHorizontal size={16} />
                Refine your stay
              </span>
              <button
                className={breakfastOnly ? s.activeFilter : ""}
                aria-pressed={breakfastOnly}
                onClick={() => setBreakfastOnly(!breakfastOnly)}
              >
                <Coffee size={15} />
                Breakfast included
              </button>
              <button
                className={flexibleOnly ? s.activeFilter : ""}
                aria-pressed={flexibleOnly}
                onClick={() => setFlexibleOnly(!flexibleOnly)}
              >
                <ShieldCheck size={15} />
                Free cancellation
              </button>
              <label>
                <span className={s.srOnly}>Sort rooms</span>
                <select
                  aria-label="Sort rooms"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="curated">Our collection</option>
                  <option value="price">Lowest price</option>
                  <option value="space">Most spacious</option>
                </select>
              </label>
            </div>
            {!stay && (
              <div className={s.availabilityNote}>
                <CalendarDays size={19} />
                <span>Select dates to see the total for your stay.</span>
                <button className={s.textButton} onClick={trySample}>
                  Use sample dates
                </button>
              </div>
            )}
            {visibleRooms.length === 0 && (
              <div className={s.emptyState}>
                <BedDouble size={32} />
                <h3>No matching rooms in this example.</h3>
                <p>
                  Try fewer guests or rooms, or clear your filters. Example
                  inventory is limited to 2–3 units per room type.
                </p>
                <button
                  className={s.secondaryButton}
                  onClick={() => {
                    setBreakfastOnly(false);
                    setFlexibleOnly(false);
                    setStay(null);
                    setSearchError("");
                  }}
                >
                  Reset room search
                </button>
              </div>
            )}
            <div className={s.roomList}>
              {visibleRooms.map(({ room, plans }) => (
                <article key={room.id} className={s.roomCard}>
                  <div className={s.roomPresentation}>
                    <button
                      className={s.roomPhoto}
                      aria-label={`Open ${room.name} gallery`}
                      onClick={() =>
                        setGallery({
                          images: room.gallery,
                          title: room.name,
                          index: 0,
                        })
                      }
                    >
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        sizes="(max-width: 700px) 100vw, 440px"
                      />
                      <span>
                        <Images size={15} />
                        {room.gallery.length} photos
                      </span>
                    </button>
                    <div className={s.roomInfo}>
                      <small>{room.view}</small>
                      <h3>{room.name}</h3>
                      <div className={s.roomSpecs}>
                        <span>
                          <BedDouble size={16} />
                          {room.bed.split(" (")[0]}
                        </span>
                        <span>
                          <Users size={16} />
                          Up to {room.maxGuests}
                        </span>
                        <span>{room.size}</span>
                      </div>
                      <p>{room.description}</p>
                      <div className={s.amenityTags}>
                        {room.amenities.slice(0, 4).map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                      <button
                        className={s.textButton}
                        onClick={() => setDetails(room)}
                      >
                        All room details <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                  <div className={s.rateList}>
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`${s.rateCard} ${plan.recommended ? s.recommendedRate : ""}`}
                      >
                        <div className={s.rateDescription}>
                          {plan.recommended && (
                            <small className={s.recommendation}>
                              THE LITTLE EXTRAS
                            </small>
                          )}
                          <h4>
                            {plan.breakfastIncluded
                              ? "Stay & breakfast"
                              : "The room, your way"}
                          </h4>
                          <p>{plan.description}</p>
                          <span>
                            <Coffee size={14} />
                            {plan.breakfastIncluded
                              ? "Breakfast included"
                              : "Breakfast optional"}
                          </span>
                          <span>
                            <ShieldCheck size={14} />
                            {plan.freeCancellation
                              ? "Free cancellation · 48h before arrival"
                              : "Non-refundable"}
                          </span>
                          <span>
                            <Check size={14} />
                            Pay-at-property option
                          </span>
                        </div>
                        <div className={s.ratePrice}>
                          <small>
                            {stay
                              ? `${stayNights(stay)} nights · ${stay.rooms} room(s)`
                              : "Per room, per night"}
                          </small>
                          <strong>
                            {fmt(
                              stay ? quote(plan, stay).total : plan.rate * 100,
                            )}
                          </strong>
                          <small>
                            {stay
                              ? "Includes example 10% tax"
                              : "Before example 10% tax"}
                          </small>
                          <button
                            className={s.button}
                            onClick={() => choose(room, plan)}
                          >
                            {stay && !dirty ? "Choose rate" : "Choose dates"}
                            <ArrowRight size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="facilities"
          className={`${s.container} ${s.facilitiesSection}`}
        >
          <div className={s.sectionHeading}>
            <div>
              <p className={s.eyebrow}>THOUGHTFULLY INCLUDED</p>
              <h2>The comforts that count.</h2>
            </div>
            <p>
              Everything you need.
              <br />
              Space to enjoy the rest.
            </p>
          </div>
          <div className={s.facilitiesGrid}>
            {facilities.map(({ icon: Icon, label, note }) => (
              <div key={label}>
                <Icon size={25} strokeWidth={1.4} />
                <h3>{label}</h3>
                <p>{note}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="area" className={s.areaSection}>
          <div className={`${s.container} ${s.areaGrid}`}>
            <div className={s.areaPhoto}>
              <Image
                src={property.atmosphereImage}
                alt={`The atmosphere of ${property.name}`}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <span>{property.location}</span>
            </div>
            <div>
              <p className={s.eyebrow}>GO A LITTLE FURTHER</p>
              <h2>
                A good stay.
                <br />A great starting point.
              </h2>
              <p className={s.muted}>A few places to put on your map.</p>
              <div className={s.localPlaces}>
                {property.localGuide.map((place, index) => (
                  <button
                    key={place.title}
                    aria-pressed={index === area}
                    className={index === area ? s.selectedPlace : ""}
                    onClick={() => setArea(index)}
                  >
                    <span className={s.placeNumber}>0{index + 1}</span>
                    <span>
                      <strong>{place.title}</strong>
                      <small>
                        {place.category} · {place.dist}
                      </small>
                    </span>
                    <ArrowRight size={17} />
                  </button>
                ))}
              </div>
              <div className={s.placeDetail}>
                <MapPin size={20} />
                <p>{property.localGuide[area].desc}</p>
              </div>
              <small>
                Neighborhood recommendations and distances are illustrative.
              </small>
            </div>
          </div>
        </section>
        <section id="reviews" className={`${s.container} ${s.reviewsSection}`}>
          <div className={s.sectionHeading}>
            <div>
              <p className={s.eyebrow}>THE EXPERIENCE, IN WORDS</p>
              <h2>Little moments. Lasting memories.</h2>
              <p>
                Sample guest feedback for this concept · these are not real
                reviews.
              </p>
            </div>
            <div className={s.reviewScore}>
              <strong>9.4</strong>
              <span>
                Example rating
                <br />
                <small>3 demonstration reviews</small>
              </span>
            </div>
          </div>
          <div className={s.reviewGrid}>
            {[
              {
                name: "Alex",
                country: "United Kingdom",
                title: "An easy place to feel at home.",
                text: "The room felt considered, the surroundings were beautiful, and choosing a stay was refreshingly simple.",
              },
              {
                name: "Sofia",
                country: "Italy",
                title: "The small details made it special.",
                text: "A slow breakfast, a comfortable bed, and local recommendations that helped us make the most of the day.",
              },
              {
                name: "Jamie",
                country: "Australia",
                title: "Exactly the kind of stay we wanted.",
                text: "A distinctive space and a clear booking experience. Everything we needed was easy to find.",
              },
            ].map((review) => (
              <article key={review.name}>
                <div className={s.stars} aria-label="Example five-star review">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} size={14} fill="currentColor" />
                  ))}
                </div>
                <h3>{review.title}</h3>
                <p>“{review.text}”</p>
                <footer>
                  <span className={s.avatar}>{review.name[0]}</span>
                  <span>
                    <strong>{review.name}</strong>
                    <small>{review.country} · sample guest</small>
                  </span>
                </footer>
              </article>
            ))}
          </div>
        </section>
        <section id="faq" className={`${s.container} ${s.faqSection}`}>
          <div>
            <p className={s.eyebrow}>BEFORE YOU ARRIVE</p>
            <h2>
              A few things
              <br />
              worth knowing.
            </h2>
            <p>Clear answers, fewer surprises.</p>
          </div>
          <div>
            {[
              {
                q: "Is this a real hotel booking?",
                a: "This is a WUUS website concept for a fictional property. Photos are generated, availability and prices are examples, and the checkout creates a local demonstration only. No room is reserved, no email is sent, and no payment is taken.",
              },
              {
                q: "What is included in the total?",
                a: "Room price × nights × rooms, any extras you choose, and an illustrative 10% tax. The STAY10 example code discounts only the room price. Prices and currency conversions are for demonstration.",
              },
              {
                q: "Can I change or cancel my stay?",
                a: "The flexible example rates show free cancellation until 48 hours before arrival. A real property would confirm its cancellation, payment and house rules before launch.",
              },
              {
                q: "What time are check-in and check-out?",
                a: "For this concept, check-in is from 14:00 and checkout is by 11:00. A late checkout option extends this to 13:00. Arrival preferences and requests are demonstrated without contacting the property.",
              },
            ].map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <Plus size={18} />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className={s.closing}>
          <Image src={property.heroImage} alt="" fill sizes="100vw" />
          <div>
            <p className={s.eyebrow}>YOUR NEXT CHAPTER</p>
            <h2>
              Stay somewhere
              <br />
              you’ll remember.
            </h2>
            <a className={s.lightButton} href="#stay-search">
              Find your stay <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </main>
      <footer className={`${s.container} ${s.footer}`}>
        <div className={s.wordmark}>
          {theme.name}
          <small>A FICTIONAL HOSPITALITY CONCEPT</small>
        </div>
        <span>Photography, reviews and reservations are demonstrations.</span>
        <Link href="/hospitality">
          Designed by <strong>WUUS</strong> <ArrowRight size={14} />
        </Link>
      </footer>
      <div className={s.mobileBooking}>
        <span>
          <small>Example rates from</small>
          <strong>
            {fmt(lowest * 100)} <small>/ night, before tax</small>
          </strong>
        </span>
        <a className={s.button} href="#rooms">
          Choose a room <ArrowDown size={16} />
        </a>
      </div>
      <button
        className={s.conciergeButton}
        aria-expanded={conciergeOpen}
        aria-label={
          conciergeOpen ? "Close stay assistant" : "Open stay assistant"
        }
        onClick={() => setConciergeOpen(!conciergeOpen)}
      >
        {conciergeOpen ? <X size={21} /> : <MessageCircle size={21} />}
      </button>
      {conciergeOpen && (
        <aside className={s.concierge}>
          <header>
            <span>
              <strong>Your stay assistant</strong>
              <small>Scripted demo · no AI service</small>
            </span>
            <button
              className={s.iconButton}
              aria-label="Close assistant panel"
              onClick={() => setConciergeOpen(false)}
            >
              <X size={17} />
            </button>
          </header>
          <p>A few quick answers to help you explore.</p>
          <div>
            {["Check-in", "Breakfast", "Booking"].map((question) => (
              <button
                className={s.secondaryButton}
                key={question}
                onClick={() =>
                  setAnswer(
                    question === "Check-in"
                      ? "Example check-in starts at 14:00, with checkout by 11:00. Choose your arrival preference in the demo checkout."
                      : question === "Breakfast"
                        ? "Choose a breakfast rate, or add it to room-only stays for €13 per adult and €7 per child, per night."
                        : "Choose dates, guests and a rate, then try the local checkout. It does not create a reservation or charge.",
                  )
                }
              >
                {question}
              </button>
            ))}
          </div>
          {answer && (
            <p className={s.assistantAnswer} role="status">
              {answer}
            </p>
          )}
        </aside>
      )}
      {calendarOpen && (
        <DateCalendar
          start={draft.checkIn}
          end={draft.checkOut}
          onClose={() => setCalendarOpen(false)}
          onApply={(checkIn, checkOut) => {
            setDraft({ ...draft, checkIn, checkOut });
            setCalendarOpen(false);
          }}
        />
      )}
      {guestOpen && (
        <DemoDialog title="Who’s staying?" onClose={() => setGuestOpen(false)}>
          <div className={s.dialogBody}>
            {(
              [
                {
                  key: "adults",
                  label: "Adults",
                  hint: "18 years and over",
                  min: 1,
                  max: 8,
                },
                {
                  key: "children",
                  label: "Children",
                  hint: "Ages 0–17",
                  min: 0,
                  max: 4,
                },
                {
                  key: "rooms",
                  label: "Rooms",
                  hint: "At least one adult per room",
                  min: 1,
                  max: 4,
                },
              ] as const
            ).map((item) => (
              <div className={s.guestRow} key={item.key}>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.hint}</small>
                </span>
                <div>
                  <button
                    className={s.iconButton}
                    disabled={draft[item.key] <= item.min}
                    aria-label={`Fewer ${item.label.toLowerCase()}`}
                    onClick={() => changeGuests(item.key, -1)}
                  >
                    <Minus size={16} />
                  </button>
                  <strong>{draft[item.key]}</strong>
                  <button
                    className={s.iconButton}
                    disabled={draft[item.key] >= item.max}
                    aria-label={`More ${item.label.toLowerCase()}`}
                    onClick={() => changeGuests(item.key, 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
            {draft.childAges.map((age, index) => (
              <label key={index}>
                Age of child {index + 1}
                <select
                  value={age}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      childAges: draft.childAges.map((value, i) =>
                        i === index ? Number(e.target.value) : value,
                      ),
                    })
                  }
                >
                  {Array.from({ length: 18 }, (_, i) => (
                    <option key={i} value={i}>
                      {i} years
                    </option>
                  ))}
                </select>
              </label>
            ))}
            <button className={s.button} onClick={() => setGuestOpen(false)}>
              Done <Check size={17} />
            </button>
          </div>
        </DemoDialog>
      )}
      {gallery && (
        <DemoDialog title={gallery.title} onClose={() => setGallery(null)} wide>
          <div className={s.galleryPhoto}>
            <Image
              src={gallery.images[gallery.index]}
              alt={`${gallery.title} — photo ${gallery.index + 1}`}
              fill
              sizes="(max-width: 700px) 95vw, 1000px"
            />
          </div>
          <div className={s.galleryControls}>
            <button
              className={s.iconButton}
              aria-label="Previous photo"
              onClick={() =>
                setGallery({
                  ...gallery,
                  index:
                    (gallery.index + gallery.images.length - 1) %
                    gallery.images.length,
                })
              }
            >
              <ChevronLeft size={20} />
            </button>
            <span>
              {gallery.index + 1} / {gallery.images.length} · generated concept
              photography
            </span>
            <button
              className={s.iconButton}
              aria-label="Next photo"
              onClick={() =>
                setGallery({
                  ...gallery,
                  index: (gallery.index + 1) % gallery.images.length,
                })
              }
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className={s.galleryThumbs}>
            {gallery.images.map((image, index) => (
              <button
                className={gallery.index === index ? s.selectedThumb : ""}
                key={image}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={gallery.index === index}
                onClick={() => setGallery({ ...gallery, index })}
              >
                <Image src={image} alt="" fill sizes="80px" />
              </button>
            ))}
          </div>
        </DemoDialog>
      )}
      {details && (
        <DemoDialog title={details.name} onClose={() => setDetails(null)}>
          <div className={s.dialogBody}>
            <p>{details.description}</p>
            <p>
              <strong>
                {details.size} · {details.bed} · Up to {details.maxGuests}{" "}
                guests
              </strong>
            </p>
            <h3>In your room</h3>
            <div className={s.detailAmenities}>
              {details.amenities.map((amenity) => (
                <span key={amenity}>
                  <Check size={17} />
                  {amenity}
                </span>
              ))}
            </div>
            <p>{details.view}</p>
            <button
              className={s.button}
              onClick={() => {
                setGallery({
                  images: details.gallery,
                  title: details.name,
                  index: 0,
                });
                setDetails(null);
              }}
            >
              Explore room photos <Images size={17} />
            </button>
          </div>
        </DemoDialog>
      )}
      {booking && (
        <BookingFlow
          property={property}
          room={booking.room}
          plan={booking.plan}
          stay={booking.stay}
          currency={currency}
          onClose={() => setBooking(null)}
        />
      )}
    </div>
  );
}
