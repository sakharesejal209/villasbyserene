import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

async function main() {
  // 1. Create ImageCategory and Images

  // const glasshouse = await prisma.imageCategory.create({
  //   data: {
  //     name: "Glass House",
  //     images: {
  //       create: [
  //         {
  //           image_url:
  //             "https://drive.google.com/file/d/1-MuIB8Uqsa3EDb5So0JJXaJ_1SEwtDGP/view?usp=drive_link",
  //         },
  //       ],
  //     },
  //   },
  // });

  // 2. Create Amenities
  // const Gazebo = await prisma.amenity.create({ data: { name: "Gazebo" } });

  // 3. Create House Rules

  // const alcoholConsumption = await prisma.houseRule.create({
  //   data: {
  //     rule_id: "alcoholConsumption",
  //     description:
  //       "The consumption of alcohol is permitted only within personal spaces",
  //   },
  // });

  // 4. Create Property
  // await prisma.property.create({
  //   data: {
  //     name: "Sparsh Villa By Serene",
  //     description:
  //       "Spread across acres of lush greenery, this grand villa welcomes you with a fountain at the entrance and a beautifully landscaped lawn. The property features a huge swimming pool, a spacious turf area, and modern amenities for a luxurious stay. With open sit-out spaces and a serene ambiance surrounded by nature, it’s perfect for hosting gatherings or enjoying a peaceful getaway. A blend of comfort, elegance, and expansive outdoor charm awaits here.",
  //     map_location:
  //       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.480628548402!2d73.4938423!3d19.106867299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd5f002d4c31bb%3A0x105e2a788fdc76ca!2sSparsh%20villa!5e1!3m2!1sen!2sin!4v1758487839387!5m2!1sen!2sin",
  //     address: "Bhimashankar, Karjat",
  //     area: "Karjat",
  //     city: "Karjat",
  //     state: "Maharashtra",
  //     country: "India",
  //     checkin_time: "01:00 PM",
  //     checkout_time: "10:30 AM",
  //     maxcapacity: 35,
  //     bedroomcount: 4,
  //   },
  // });

  //4. create unit

  // await prisma.unit.create({
  //   data: {
  //     property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //     unit_type: "VILLA",
  //     title: "4BHK Villa",
  //     description:
  //     "This luxurious 4BHK villa features a private swimming pool with floaters, and a spacious lawn with a welcoming fountain. Guests can enjoy a beautiful gazebo, open sit-out areas with lush green views, and a turf ground for sports and activities. With a BBQ grill, outdoor speakers, and customizable meals by a private chef, it’s perfect for gatherings and getaways. The villa also offers 24/7 caretaker support, power backup, and all modern conveniences for a truly relaxing stay.",
  //     no_of_bedrooms: 4,
  //     max_capacity: 35,
  //   },
  // });

  // 5. Link House Rules to property

  // await prisma.propertyRule.createMany({
  //   data: [
  //     { property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4", rule_id: 'petCharge', display_order: 1 },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       rule_id: "poolTime",
  //       display_order: 2,
  //     },
  //     { property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4", rule_id: 'alcoholConsumption', display_order: 3 },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       rule_id: "damageCost",
  //       display_order: 4,
  //     },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       rule_id: "governmentId",
  //       display_order: 5,
  //     },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       rule_id: "lastServiceTime",
  //       display_order: 6,
  //     },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       rule_id: "musicTime",
  //       display_order: 7,
  //     },
  //     // { property_id: "757aa342-92ff-42af-97e4-48692b740954", rule_id: "smoking", display_order: 8 },
  //     // { property_id: "1c324aaf-1c8d-4cf7-be6a-35458297205c", rule_id: "onlyFamilies", display_order: 1 },
  //   ],
  // });

  // 6. Link Amenities to property
  // await prisma.propertyAmenity.createMany({
  //   data: [
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       amenity_id: "airconditioned",
  //       display_order: 1,
  //     },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       amenity_id: "turf",
  //       display_order: 2,
  //     },
  //     { property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4", amenity_id: 'gazebo', display_order: 2 },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       amenity_id: "swimmingpool",
  //       display_order: 3,
  //     },
  //     { property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4", amenity_id: 'openDinning', display_order: 4 },
  //     { property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4", amenity_id: 'bbqgrill', display_order: 5 },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       amenity_id: "lawn",
  //       display_order: 6,
  //     },
  //     // // {
  //     // //   property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //     // //   amenity_id: "workspace",
  //     // //   display_order: 5,
  //     // // },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       amenity_id: "sitoutarea",
  //       display_order: 7,
  //     },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       amenity_id: "freeparking",
  //       display_order: 8,
  //     },
  //     // // {
  //     // //   property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //     // //   amenity_id: "indoorgames",
  //     // //   display_order: 9,
  //     // // },
  //     // // {
  //     // //   property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //     // //   amenity_id: "restaurant",
  //     // //   display_order: 10,
  //     // // },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       amenity_id: "television",
  //       display_order: 11,
  //     },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       amenity_id: "watersupply",
  //       display_order: 12,
  //     },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       amenity_id: "wifi",
  //       display_order: 13,
  //     },
  //     // // {
  //     // //   property_id: "92b62470-9dea-46ee-b943-6940f31546e4",
  //     // //   amenity_id: "bathtub",
  //     // //   display_order: 2,
  //     // // },
  //     // // { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: "geyser", display_order: 14 },
  //   ],
  // });

  // 7. image category
  // await prisma.imageCategory.createMany({
  //   data: [
  //     {
  //       name: "Games",
  //       category_id: 9,
  //     },
  //     {
  //       name: "Restroom",
  //       category_id: 10,
  //     },
  //   ],
  // });

  // 8. Add images

  // await prisma.image.createMany({
  //   data: [
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fexterior9.webp?alt=media&token=53fb9a9a-eb24-41dc-8cbe-06304f6a5784",
  //       image_category_id: 7,
  //       image_alt: "savali-exterior",
  //     },
  //   ],
  //   skipDuplicates: true,
  // });

  // 9. Create property images

  // await prisma.propertyImage.createMany({
  //   data: [
  //     {
  //       image_id: "6455df56-0fab-4718-8584-8fcced25bf98",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //       is_banner_image: "true",
  //       is_carousel_image: "true",
  //     },
  //   ],
  // });

  // 10. create unit image

  // await prisma.unitImage.createMany({
  //   data: [
  //     {
  //       image_id: "3e70d05a-b785-449a-909a-a66d00f64560",
  //       unit_id: "47159732-ac52-4504-aa1c-190dc5fd765d",
  //     },
  //   ],
  // });

  // 11. food menu

  //   await prisma.foodMenu.create({
  // data: {
  //   property_id: '8c73c8ea-6cce-4cfa-8550-74ce566205b4',
  //   description: 'Enjoy the taste of freshly made home-cooked gourmet meals prepared using locally sourced ingredients by our in-house chef. Tea/Coffee will be served during breakfast and high tea time. If you would like tea/coffee at any other time of the day, it can be arranged at an additional charge.',
  //   isVeg: true,
  //   isNonVeg: true,
  //   menuUrl: 'https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2F11.webp?alt=media&token=3d5a3209-c1c8-4233-94b3-779c44318103',
  //   breakfastTime: '08:00AM - 09.30AM',
  //   lunchTime: '01.30PM - 03.00PM',
  //   dinnerTime: '09:00PM-10:30PM',
  //   highteaTime: '05:00PM-06:00PM'
  // }
  //   })

  // 12. Near By Attractions

  // await prisma.nearByAttractions.createMany({
  //   data: [
  //     {
  //       property_id: "8fb8859f-cbd4-4488-bd06-906b25f48cdc",
  //       title: "Panchayatan Mandir",
  //       description:
  //         "Panchayatan Mandir, located at Nadhal, is a newly opened temple complex featuring five beautifully built temples. The spacious premises offer ample parking, a clean and peaceful environment, and positive vibes all around, making it a serene spot for devotees and visitors alike.",
  //       distance: "5 mins away",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fpanchayatan.webp?alt=media&token=46c32565-0a85-44d3-b3c8-c73b5eb0bc65",
  //     },
  //     {
  //       property_id: "8fb8859f-cbd4-4488-bd06-906b25f48cdc",
  //       title: "Bilavle Dam",
  //       distance: "17 mins away",
  //       description:
  //         "Bhilavle Dam offers a refreshing escape surrounded by nature. The drive to the dam is scenic and calming, with lush green plantations lining the way, making the journey as beautiful as the destination.",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fbhilavle-dam.jpg?alt=media&token=5f03a0b7-d378-4ddd-80d1-5a61a8377c50",
  //     },
  //     {
  //       property_id: "8fb8859f-cbd4-4488-bd06-906b25f48cdc",
  //       title: "Morbe Dam",
  //       description:
  //         "Morbe Dam in Raigad is a scenic reservoir surrounded by hills, known for its tranquil waters and lush greenery. A peaceful spot to enjoy nature and breathtaking views.",
  //       distance: "24 mins away",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fmorbe_dam.webp?alt=media&token=24f86089-7640-4f79-bd92-b5a1b81014b2",
  //     },
  //     // {
  //     //   property_id: "757aa342-92ff-42af-97e4-48692b740954",
  //     //   title: "Wet-N-Joy",
  //     //   description:
  //     //     "Wet n Joy Lonavala is famous for being India's largest water and amusement park, offering a world-class experience with numerous international water slides and thrill rides, a 60,000 sq ft wave pool, and other attractions like the Crazy River and Rain Dance. ",
  //     //   distance: "25 mins away",
  //     //   imageUrl:
  //     //     "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fwet-n-joy.webp?alt=media&token=fafcfdf4-5ad4-471e-8095-90e6f5bd75bd",
  //     // },
  //   ],
  // });

  // // 13. Create Themes

  // // const Themes = await prisma.theme.createMany({
  // //   data: [
  // //     {
  // //       name: "Entire Home",
  // //     },
  // //     {
  // //       name: "Couple Friednly",
  // //     },
  // //     {
  // //       name: "Pet Friednly",
  // //     },
  // //     {
  // //       name: "Luxury Escapes",
  // //     },
  // //   ],
  // // });

  // // 14. Link themes to property

  // await prisma.propertyTheme.createMany({
  //   data: [
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       theme_id: "entireHome",
  //       propertyName: "Sparsh Villa By Serene",
  //     },
  //     // {
  //     //   property_id: "92b62470-9dea-46ee-b943-6940f31546e4",
  //     //   theme_id: "entireHome",
  //     //   propertyName: "Sparsh Villa By Serene",
  //     // },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       theme_id: "petFriendly",
  //       propertyName: "Sparsh Villa By Serene",
  //     },
  //     {
  //       property_id: "8c73c8ea-6cce-4cfa-8550-74ce566205b4",
  //       theme_id: "ecoRetreat",
  //       propertyName: "Sparsh Villa By Serene",
  //     },
  //   ],
  // });

  console.log("Seed completed ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
