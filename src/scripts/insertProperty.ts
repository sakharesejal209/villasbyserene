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
  //     name: "Air Eco Stay By Serene",
  //     description:
  //       "Experience a refreshing getaway at our Matheran foothills retreat. The property welcomes you with a lush green lawn under the shade of a majestic mango tree, perfect for unwinding or celebrating. A gazebo sits ready for peaceful conversations, while evenings come alive with campfires under the stars. With scenic drives leading up to the property and pet-friendly access, it’s the perfect setting for bonding with loved ones amidst nature.",
  //     map_location:
  //       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5974288947923!2d73.2542342!3d19.037453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7efb76bd0655b%3A0x2828f9def6e17990!2sAir%20Eco%20Stay%20Resort!5e0!3m2!1sen!2sin!4v1757824907295!5m2!1sen!2sin",
  //     address: "Gadeshwar, Panvel",
  //     area: "Gadeshwar",
  //     city: "Panvel",
  //     state: "Maharashtra",
  //     country: "India",
  //     checkin_time: "12:00 PM",
  //     checkout_time: "01:00 PM",
  //     maxcapacity: 45,
  //     bedroomcount: 9,
  //   },
  // });

  //4. create unit

  // await prisma.unit.create({
  //   data: {
  //     property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6",
  //     unit_type: "CHALET",
  //     title: "Wooden Chalets",
  //     description: "Our wooden chalets are designed to create the perfect couple’s retreat. With a cozy, warm vibe and rustic charm, they offer an intimate space to relax and unwind. Each chalet comes with an attached washroom for comfort and a private sit-out area where you can enjoy peaceful mornings or starlit evenings together.",
  //     no_of_bedrooms: 1,
  //     max_capacity: 3,
  //   },
  // });

  // 5. Link House Rules to Unit

  // await prisma.propertyRule.createMany({
  //   data: [
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", rule_id: 'petCharge', display_order: 1 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", rule_id: 'poolTime', display_order: 2 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", rule_id: 'alcoholConsumption', display_order: 3 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", rule_id: 'damageCost', display_order: 4 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", rule_id: 'governmentId', display_order: 5 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", rule_id: 'lastServiceTime', display_order: 6 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", rule_id: "musicTime", display_order: 7 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", rule_id: "smoking", display_order: 8 },
  //   ],
  // });

  // 6. Link Amenities to property
  // await prisma.propertyAmenity.createMany({
  //   data: [
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: 'airconditioned', display_order: 1 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: 'bonfire', display_order: 2 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: 'swimmingpool', display_order: 3 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: 'gazebo', display_order: 4 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: 'evcharging', display_order: 5 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: 'lawn', display_order: 6 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: 'sitoutarea', display_order: 7 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: 'freeparking', display_order: 8 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: 'indoorgames', display_order: 9 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: 'restaurant', display_order: 10 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: 'television', display_order: 11 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: 'watersupply', display_order: 12 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: 'wifi', display_order: 13 },
  //     { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: "geyser", display_order: 14 },
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
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/air-eco%2Fbonfire.webp?alt=media&token=c9082c82-3936-4727-a948-3cc9c6d5702e",
  //       image_category_id: 12,
  //       image_alt: "air-eco-bonfire",
  //     }
  //   ],
  //   skipDuplicates: true,
  // });

  // 9. Create property images

  // await prisma.propertyImage.createMany({
  //   data: [
  //     {
  //       image_id: 
  //       "32566d3a-a367-4ba4-9dad-6ff60a75fc24",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "aec83bda-041b-4e30-a394-1619fcd28980",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "56a6cd23-dc1a-49c7-bcd1-44c23b3851f3",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "5d367773-acee-4c48-b0fb-11ceab5a59a3",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "e461ac90-0b6f-4f73-9b33-9dcbd36eab39",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "9a101818-fbf8-474b-9dfa-f077bd9f3619",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "263d88a4-e00f-42d7-865e-5f14e8e47d96",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "ef3c9af3-f82c-46b4-84fe-f2da9f13148e",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "406ea1f6-5485-4897-a833-5d8e4a344c89",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "420905b4-a5fc-49b0-a653-769e47b2b662",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "600887f9-d3cf-438a-8424-b70b2054d574",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "35029572-301c-4a4d-8520-9e1cb1496d32",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "3fbfd1ae-8d79-49de-a7c3-7dab26d09530",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "b8c432af-fd7b-4a56-bf06-d1158a3f62f6",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "251732e8-f584-4cc2-a45d-572b62ac66e7",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "d79bdb3d-a3de-4df6-82a8-dcb344cf0c47",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "5c1adf25-0a7e-4ed0-a067-776c3fdbbde5",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "a58d3349-840e-4619-8f04-9a2bc2bfd6c3",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "3a457fd6-9eb6-43ff-a5e2-70db8c9a6611",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "142f3a3b-02dd-46f6-8bb6-4e7b44e7814d",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "45a1a2ce-2c8d-49ea-b7f4-6b9094ebd03f",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "d811885b-25a4-4b7d-9252-3ded0484ab70",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "bfaf0bb6-94f0-4e61-9df4-e45a94cc536e",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "453184d5-a666-45ca-b2ed-c720a3a93ff3",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "178444c3-a615-4755-bf3a-1f2d69ec6d66",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "b3613b11-50ee-41ac-95f3-d240a7f68755",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     },
  //     {
  //       image_id: 
  //       "07c69103-4657-4a91-9af2-eb9409c13c29",
  //       property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
  //       display_order: 1,
  //     }
     
  //   ],
  // });

  // 10. create unit image

  await prisma.unitImage.createMany({
    data: [
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
      {
        image_id: "",
        unit_id: "207ea450-8380-4782-955d-080a39816565",
      },
    ]
  })

  // 11. food menu

  //   await prisma.foodMenu.create({
  // data: {
  //   property_id: 'fac2cbb4-d938-4342-a369-312d2cd24604',
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
  //       property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624",
  //       title: "Peb Fort Trek",
  //       description:
  //         "he Peb Fort trek, also known as Vikatgad. The trek offers a mix of easy and challenging sections, with a steep climb towards the fort and stunning views of the surrounding Sahyadri mountains. ",
  //       distance: "10 mins away",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fpeb-fort-trek.webp?alt=media&token=8ee564ae-a094-4693-8e95-221445dc9a79",
  //     },
  //     {
  //       property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624",
  //       title: "Gadeshwar Dam",
  //       description:
  //         "Gadeshwar Dam is well wrapped by Lush green Paddy fields and hilly terrains. Small rivulets cross our path while travelling towards the dam. The dam is perfectly nestled amidst of Chanderi, Mhaismal, Peb and Matheran Hills near Panvel.",
  //       distance: "5 mins away",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fgadeshwar-dam.webp?alt=media&token=fe928439-a009-4605-b0d4-edee86de4475",
  //     },
  //     {
  //       property_id: "fac2cbb4-d938-4342-a369-312d2cd24604",
  //       title: "Kegav Beach",
  //       description:
  //         "a serene and picturesque destination known for its peaceful atmosphere and beautiful views, especially during sunrise and sunset.",
  //       distance: "1 min away",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fkegav-beach.webp?alt=media&token=20691095-43d9-42db-bf4e-529c32da41eb",
  //     },
  //     {
  //       property_id: "fac2cbb4-d938-4342-a369-312d2cd24604",
  //       title: "Mankeshwar Beach",
  //       description:
  //         "Mankeshwar Beach, nestled in Uran, Navi Mumbai, is a tranquil coastal haven that offers a serene escape from the hustle and bustle of city life. Known for its pristine environment and serene ambiance. This lesser-known gem features clean, golden sands and clear waters that create a picturesque setting for relaxation and leisure activities",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fmankeshwar-beach.webp?alt=media&token=bb5eabdc-5bbd-4192-bd7f-7fa3bdb6e738",
  //       distance: "7 mins away",
  //     },
  //     {
  //       property_id: "fac2cbb4-d938-4342-a369-312d2cd24604",
  //       title: "Pirwadi Beach",
  //       description:
  //         "When it comes to activities, Pirwadi Beach has something for everyone! Whether you’re an adventure seeker or someone looking to unwind, you’ll find plenty of options to keep you entertained such as Swimming, Horse cart riding, Biking, Beach volleyball.",
  //       distance: "14 mins away",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fpirwadi-beach.webp?alt=media&token=5c3b0a2c-e9b6-4086-882a-ddaa9f598921",
  //     },
  //   ],
  // });

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
  //       property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624",
  //       theme_id: "26d7a659-2945-476a-9c1a-f4519f02f704",
  //       propertyName: "Cliff View Villa By Serene",
  //     },
  //     {
  //       property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624",
  //       theme_id: "c2f06f42-328e-4cc0-ba4e-60e50c39bf7f",
  //       propertyName: "Cliff View Villa By Serene",
  //     },
  //     {
  //       property_id: "fac2cbb4-d938-4342-a369-312d2cd24604",
  //       theme_id: "89143637-8b16-46f9-8f76-3d988eaf2f6c",
  //       propertyName: "Ocean Breeze Villa By Serene",
  //     },
  //     {
  //       property_id: "fac2cbb4-d938-4342-a369-312d2cd24604",
  //       theme_id: "c2f06f42-328e-4cc0-ba4e-60e50c39bf7f",
  //       propertyName: "Ocean Breeze Villa By Serene",
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
