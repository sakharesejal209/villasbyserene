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
  //     name: "Deena Villa By Serene",
  //     description:
  //       "Experience indulgence at this private villa in Lonavala’s prime location, featuring a sparkling private pool, elegant open-sky sit-out area, and thoughtfully designed modern interiors. Perfect for families, this well-maintained retreat combines comfort, exclusivity, and easy access to popular tourist attractions—crafted for a truly premium getaway.",
  //     map_location:
  //       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21226.94391204432!2d73.38567155579703!3d18.75966410876843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be800e3f1a4b841%3A0xcbc1351653765de6!2sTungarli%2C%20Lonavala%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1758093843807!5m2!1sen!2sin",
  //     address: "Tungarli, Lonavala",
  //     area: "Lonavala",
  //     city: "Lonavala",
  //     state: "Maharashtra",
  //     country: "India",
  //     checkin_time: "01:00 PM",
  //     checkout_time: "10:30 AM",
  //     maxcapacity: 12,
  //     bedroomcount: 3,
  //   },
  // });

  //4. create unit

  // await prisma.unit.create({
  //   data: {
  //     property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //     unit_type: "VILLA",
  //     title: "3BHK Villa",
  //     description:
  //       "Unwind in a lavish 3BHK villa with spacious rooms, attached baths, and a modern kitchen. Enjoy the indulgence of a temperature-controlled private pool and premium amenities — your perfect luxurious home away from home.",
  //     no_of_bedrooms: 3,
  //     max_capacity: 12,
  //   },
  // });

  // 5. Link House Rules to property

  // await prisma.propertyRule.createMany({
  //   data: [
  //     // { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", rule_id: 'petCharge', display_order: 1 },
  //     {
  //       property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //       rule_id: "poolTime",
  //       display_order: 2,
  //     },
  //     { property_id: "f7131619-5e74-457b-8924-9b03c340f0fd", rule_id: 'alcoholConsumption', display_order: 3 },
  //     {
  //       property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //       rule_id: "damageCost",
  //       display_order: 4,
  //     },
  //     {
  //       property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //       rule_id: "governmentId",
  //       display_order: 5,
  //     },
  //     {
  //       property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //       rule_id: "lastServiceTime",
  //       display_order: 6,
  //     },
  //     {
  //       property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //       rule_id: "musicTime",
  //       display_order: 7,
  //     },
  //     { property_id: "f7131619-5e74-457b-8924-9b03c340f0fd", rule_id: "smoking", display_order: 8 },
  //     { property_id: "f7131619-5e74-457b-8924-9b03c340f0fd", rule_id: "onlyFamilies", display_order: 1 },
  //   ],
  // });

  // 6. Link Amenities to property
  // await prisma.propertyAmenity.createMany({
  //   data: [
  //     {
  //       property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //       amenity_id: "airconditioned",
  //       display_order: 1,
  //     },
  //     // {
  //     //   property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //     //   amenity_id: "barCounter",
  //     //   display_order: 2,
  //     // },
  //     { property_id: "f7131619-5e74-457b-8924-9b03c340f0fd", amenity_id: 'tempControllingPool', display_order: 2 },
  //     {
  //       property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //       amenity_id: "swimmingpool",
  //       display_order: 3,
  //     },
  //     { property_id: "f7131619-5e74-457b-8924-9b03c340f0fd", amenity_id: 'openDinning', display_order: 4 },
  //     // { property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624", amenity_id: 'evcharging', display_order: 5 },
  //     // {
  //     //   property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //     //   amenity_id: "lawn",
  //     //   display_order: 6,
  //     // },
  //     // {
  //     //   property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //     //   amenity_id: "gym",
  //     //   display_order: 4,
  //     // },
  //     // {
  //     //   property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //     //   amenity_id: "workspace",
  //     //   display_order: 5,
  //     // },
  //     {
  //       property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //       amenity_id: "sitoutarea",
  //       display_order: 7,
  //     },
  //     {
  //       property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //       amenity_id: "freeparking",
  //       display_order: 8,
  //     },
  //     {
  //       property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //       amenity_id: "indoorgames",
  //       display_order: 9,
  //     },
  //     // {
  //     //   property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //     //   amenity_id: "restaurant",
  //     //   display_order: 10,
  //     // },
  //     {
  //       property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //       amenity_id: "television",
  //       display_order: 11,
  //     },
  //     {
  //       property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //       amenity_id: "watersupply",
  //       display_order: 12,
  //     },
  //     {
  //       property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //       amenity_id: "wifi",
  //       display_order: 13,
  //     },
  //     // {
  //     //   property_id: "92b62470-9dea-46ee-b943-6940f31546e4",
  //     //   amenity_id: "bathtub",
  //     //   display_order: 2,
  //     // },
  //     // { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: "geyser", display_order: 14 },
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
  //   property_id: '2406e581-8c17-42bd-9835-ed869391338a',
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

  await prisma.nearByAttractions.createMany({
    data: [
      {
        property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
        title: "Tiger Point",
        description:
          "Nestled in the Sahyadri ranges, it offers a panoramic view of the lush green valleys, misty hills, and small waterfalls, making it a photographer's paradise.",
        distance: "25 mins away",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2FtigerPoint.webp?alt=media&token=63eebb44-7fb0-4611-aab2-28e61a73f1c6",
      },
      {
        property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
        title: "Bhaja Caves",
        description:
          "The Bhaja Caves, are a cluster of 22 rock-cut Buddhist caves from the 2nd century BCE. Once monasteries and meditation centers, they feature monastic cells and a grand Chaitya hall with a distinctive horseshoe-shaped ceiling.",
        distance: "25 mins away",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fbhaja-caves.webp?alt=media&token=89b3e8f5-cfff-4b7c-ac3f-5c5fc7d473f1",
      },
      {
        property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
        title: "Narayani Dham",
        description:
          "This temple is a popular tourist attraction and is dedicated to Goddess Narayani. Built in 2002, this temple is a beautiful white marble structure. The deities inside the temple are beautifully decorated with glittering jeweleries.",
        distance: "3 mins away",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fnarayani-dham.webp?alt=media&token=98c8f3f9-d8ec-4e9e-8bc7-930cd7290deb",
      },
      {
        property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
        title: "Wet-N-Joy",
        description:
          "Wet n Joy Lonavala is famous for being India's largest water and amusement park, offering a world-class experience with numerous international water slides and thrill rides, a 60,000 sq ft wave pool, and other attractions like the Crazy River and Rain Dance. ",
        distance: "18 mins away",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fwet-n-joy.webp?alt=media&token=fafcfdf4-5ad4-471e-8095-90e6f5bd75bd",
      },
    ],
  });

  // 13. Create Themes

  // const Themes = await prisma.theme.createMany({
  //   data: [
  //     {
  //       name: "Entire Home",
  //     },
  //     {
  //       name: "Couple Friednly",
  //     },
  //     {
  //       name: "Pet Friednly",
  //     },
  //     {
  //       name: "Luxury Escapes",
  //     },
  //   ],
  // });

  // 14. Link themes to property

  // await prisma.propertyTheme.createMany({
  //   data: [
  //     {
  //       property_id: "f7131619-5e74-457b-8924-9b03c340f0fd",
  //       theme_id: "entireHome",
  //       propertyName: "Deena Villa By Serene",
  //     },
  //     // {
  //     //   property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //     //   theme_id: "petFriendly",
  //     //   propertyName: "Savali Red Stone By Serene",
  //     // },
  //     // {
  //     //   property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //     //   theme_id: "ecoRetreat",
  //     //   propertyName: "Savali Red Stone By Serene",
  //     // },
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
