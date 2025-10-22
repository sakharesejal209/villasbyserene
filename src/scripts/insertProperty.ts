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
  await prisma.property.create({
    data: {
      name: "House of Mars Villa By Serene",
      description:
        "Experience a cozy stay at our well-furnished villa offering stunning hill views and a peaceful sit-out area with a gazebo. The property is pet-friendly and comes with a 24/7 caretaker, CCTV (blockable), and reliable power backup for complete comfort. Guests can enjoy indoor games, and even a private chef on request. Located close to the market area with two malls nearby, it ensures easy accessibility. Perfect for families and groups looking for a relaxing yet well-connected getaway.",
      map_location:
        "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3447.0009834192942!2d73.74464037536394!3d24.643188478071774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDM4JzM1LjUiTiA3M8KwNDQnNTAuMCJF!5e1!3m2!1sen!2sin!4v1759669005154!5m2!1sen!2sin",
      address: "Udaipur, Rajasthan",
      area: "Udaipur",
      city: "Udaipur",
      state: "Rajasthan",
      country: "India",
      checkin_time: "01:00 PM",
      checkout_time: "10:30 AM",
      maxcapacity: 15,
      bedroomcount: 5,
    },
  });

  //4. create unit

  // await prisma.unit.create({
  //   data: {
  //     property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //     unit_type: "VILLA",
  //     title: "3BHK Villa",
  //     description:
  //     "Discover the perfect blend of luxury and comfort at this 3BHK villa, complete with a private swimming pool and panoramic hill views. Designed with elegant interiors and inviting sit-out spaces, it’s an ideal escape for relaxation and togetherness. Unwind by the pool, savor gourmet meals prepared by a private chef, or simply enjoy the villa’s serene ambience with family and friends. With dedicated caretaker service and thoughtfully curated amenities, every moment here feels effortless and indulgent.",
  //     no_of_bedrooms: 3,
  //     max_capacity: 12,
  //   },
  // });

  // 5. Link House Rules to property

  // await prisma.propertyRule.createMany({
  //   data: [
  //     { property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d", rule_id: 'petCharge', display_order: 1 },
  //     // {
  //     //   property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //     //   rule_id: "poolTime",
  //     //   display_order: 2,
  //     // },
  //     { property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d", rule_id: 'alcoholConsumption', display_order: 3 },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       rule_id: "damageCost",
  //       display_order: 4,
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       rule_id: "governmentId",
  //       display_order: 5,
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       rule_id: "lastServiceTime",
  //       display_order: 6,
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       rule_id: "musicTime",
  //       display_order: 7,
  //     },
  //     { property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d", rule_id: "smoking", display_order: 8 },
  //     // { property_id: "1c324aaf-1c8d-4cf7-be6a-35458297205c", rule_id: "onlyFamilies", display_order: 1 },
  //   ],
  // });

  // 6. Link Amenities to property
  // await prisma.propertyAmenity.createMany({
  //   data: [
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       amenity_id: "airconditioned",
  //       display_order: 1,
  //     },
  //     // {
  //     //   property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //     //   amenity_id: "automatedCurtains",
  //     //   display_order: 2,
  //     // },
  //     // { property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d", amenity_id: 'jacuzzi', display_order: 2 },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       amenity_id: "swimmingpool",
  //       display_order: 3,
  //     },
  //     { property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d", amenity_id: 'privateChef', display_order: 4 },
  //     // { property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d", amenity_id: 'bbqgrill', display_order: 5 },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       amenity_id: "lawn",
  //       display_order: 6,
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       amenity_id: "gazebo",
  //       display_order: 5,
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       amenity_id: "sitoutarea",
  //       display_order: 7,
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       amenity_id: "freeparking",
  //       display_order: 8,
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       amenity_id: "indoorgames",
  //       display_order: 9,
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       amenity_id: "cctv",
  //       display_order: 10,
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       amenity_id: "television",
  //       display_order: 11,
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       amenity_id: "watersupply",
  //       display_order: 12,
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
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
  //       name: "Jacuzzi",
  //       category_id: 9,
  //     },
  //     // {
  //     //   name: "Restroom",
  //     //   category_id: 10,
  //     // },
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
  //   property_id: '0d9ad374-c078-46e1-9fb5-380b1ed53e0d',
  //   description: 'Enjoy the taste of freshly made home-cooked gourmet meals prepared using locally sourced ingredients by our in-house chef. Tea/Coffee will be served during breakfast and high tea time. If you would like tea/coffee at any other time of the day, it can be arranged at an additional charge.',
  //   isVeg: true,
  //   isNonVeg: true,
  //   isJain: true,
  //   menuUrl: '',
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
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       title: "Saheliyon ki bari",
  //       description:
  //         "A royal garden in Udaipur known for its beautiful architecture, lush greenery, and intricate fountains, built in the 18th century by Maharana Sangram Singh for the queen and her friends.",
  //       distance: "20km",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fsaheliyonki_bari.webp?alt=media&token=c4e11d52-1c76-459b-80cb-d902ee71c60c",
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       title: "Pichola Lake, Udaipur",
  //       description:
  //         "Lake Pichola is famous for its scenic beauty and historic landmarks, including the City Palace complex on its eastern banks and the Jag Mandir palace on one of its islands.",
  //       distance: "27km",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fpichola-lake.webp?alt=media&token=9ec6ea19-fffd-4f91-a759-f75dbd27af84",
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       title: "Ambrai Ghat",
  //       distance: "26km",
  //       description:
  //         "Ambrai Ghat offers an unparalleled view of the City Palace, Jag Mandir, and the shimmering waters of Lake Pichola.",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fambrai-ghat.webp?alt=media&token=0ef20a59-e8ad-43d7-a4c2-cc2d4fe04d06",
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       title: "City Palace",
  //       distance: "27km",
  //       description:
  //         "A large, historic palace complex and museum showcasing 400 years of Mewar royalty, with its architecture blending Rajput and Medieval European styles, intricate carvings, murals, and ornate courtyards, all overlooking Lake Pichola",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fcity-palace.webp?alt=media&token=50f8e8d8-785a-436d-a65d-9b00265dcb61",
  //     },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       title: "Monsoon Palace",
  //       description:
  //         "The Monsoon Palace (Sajjangarh Palace) is famous for its panoramic views of Udaipur, including the city, lakes, and surrounding Aravalli Hills",
  //       distance: "30km",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fmonsoon-palace.webp?alt=media&token=5d67311a-d0d8-439b-8646-dcd281fe18fa",
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

  // // 14. Link themes to property

  // await prisma.propertyTheme.createMany({
  //   data: [
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       theme_id: "entireHome",
  //       propertyName: "House Of Mars Villa By Serene",
  //     },
  //     // {
  //     //   property_id: "92b62470-9dea-46ee-b943-6940f31546e4",
  //     //   theme_id: "entireHome",
  //     //   propertyName: "House Of Mars Villa By Serene",
  //     // },
  //     {
  //       property_id: "0d9ad374-c078-46e1-9fb5-380b1ed53e0d",
  //       theme_id: "petFriendly",
  //       propertyName: "House Of Mars Villa By Serene",
  //     },
  //     // {
  //     //   property_id: "d62d784a-99d8-4353-8794-a29902cfd912",
  //     //   theme_id: "luxuryStay",
  //     //   propertyName: "Corum8 Villa By Serene",
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
