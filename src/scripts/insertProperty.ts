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
  //     unit_type: "VILLA",
  //     title: "3BHK Villa",
  //     description: "Escape to a spacious 3BHK fully air-conditioned villa designed for comfort and relaxation. With a private sit-out area, this villa is the perfect getaway for families or groups of friends looking to spend quality time together. The inviting interiors offer a warm and cozy ambiance, while the outdoor space is ideal for unwinding, chatting, or enjoying a quiet evening. Whether it’s a family vacation or a friends’ retreat, this villa ensures a memorable stay with privacy, comfort, and convenience.",
  //     no_of_bedrooms: 3,
  //     max_capacity: 18,
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

  // await prisma.unitImage.createMany({
  //   data: [
  //     {
  //       image_id: "d0d5fceb-cc00-47d8-9841-7d2628e98dde",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //     {
  //       image_id: "6889e998-250c-448e-ac64-bf93bd6c162a",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //     {
  //       image_id: "28e1f0db-2654-4887-8639-b5bbe23340ab",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //     {
  //       image_id: "010efe5a-34d2-40f0-a609-82670064d8dc",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //     {
  //       image_id: "b3613b11-50ee-41ac-95f3-d240a7f68755",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //     {
  //       image_id: "07c69103-4657-4a91-9af2-eb9409c13c29",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //     {
  //       image_id: "967d6c51-0e29-4270-9397-44c5e2296d66",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //     {
  //       image_id: "27308243-26f8-4bd1-94e3-abb2479de238",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //     {
  //       image_id: "53d75b1b-9569-433f-8b9e-74c8c3e2cfba",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //     {
  //       image_id: "8e3c4614-ac3b-4bfb-9dfb-c530dbf223ed",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //     {
  //       image_id: "b38d6e85-ea5d-4346-9ed2-620d538079ed",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //     {
  //       image_id: "e278c98e-d637-453a-bc22-1b77b974dd55",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //     {
  //       image_id: "857cff06-ad5c-47f7-b004-d4bee15832ba",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //     {
  //       image_id: "ca77c5d7-9b93-4c70-a095-0814a4e057c6",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //     {
  //       image_id: "8a2bb249-81fb-4947-9677-3cb851e61ae7",
  //       unit_id: "cd990069-156e-49f0-81ae-bee65a9300bb",
  //     },
  //   ],
  // });

  // 11. food menu

  //   await prisma.foodMenu.create({
  // data: {
  //   property_id: '7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6',
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
  //       property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6",
  //       title: "Peb Fort Trek",
  //       description:
  //         "he Peb Fort trek, also known as Vikatgad. The trek offers a mix of easy and challenging sections, with a steep climb towards the fort and stunning views of the surrounding Sahyadri mountains. ",
  //       distance: "10 mins away",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fpeb-fort-trek.webp?alt=media&token=8ee564ae-a094-4693-8e95-221445dc9a79",
  //     }
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
  //       property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6",
  //       theme_id: "coupleFriendly",
  //       propertyName: "Air Eco Stay By Serene",
  //     },
  //     {
  //       property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6",
  //       theme_id: "petFriendly",
  //       propertyName: "Air Eco Stay By Serene",
  //     },
  //     {
  //       property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6",
  //       theme_id: "ecoRetreat",
  //       propertyName: "Air Eco Stay By Serene",
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
