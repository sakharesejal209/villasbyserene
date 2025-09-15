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
  //     property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //     unit_type: "COTTAGE",
  //     title: "Standard Cottage",
  //     description:
  //       "Our Standard Room is compact yet cozy, designed for comfort and simplicity. Perfect for couples or small groups, it offers a warm ambiance and all the essentials for a relaxed stay.",
  //     no_of_bedrooms: 1,
  //     max_capacity: 4,
  //   },
  // });

  // 5. Link House Rules to Unit

  // await prisma.propertyRule.createMany({
  //   data: [
  //     // { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", rule_id: 'petCharge', display_order: 1 },
  //     {
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       rule_id: "poolTime",
  //       display_order: 2,
  //     },
  //     // { property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624", rule_id: 'alcoholConsumption', display_order: 3 },
  //     {
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       rule_id: "damageCost",
  //       display_order: 4,
  //     },
  //     {
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       rule_id: "governmentId",
  //       display_order: 5,
  //     },
  //     {
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       rule_id: "lastServiceTime",
  //       display_order: 6,
  //     },
  //     {
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       rule_id: "musicTime",
  //       display_order: 7,
  //     },
  //     // { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", rule_id: "smoking", display_order: 8 },
  //   ],
  // });

  // 6. Link Amenities to property
  // await prisma.propertyAmenity.createMany({
  //   data: [
  //     {
  //       property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624",
  //       amenity_id: "airconditioned",
  //       display_order: 1,
  //     },
  //     // { property_id: "7dea80f2-f2a3-4dd9-a954-ed7b64ae0de6", amenity_id: 'bonfire', display_order: 2 },
  //     {
  //       property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624",
  //       amenity_id: "swimmingpool",
  //       display_order: 3,
  //     },
  //     // { property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624", amenity_id: 'gazebo', display_order: 4 },
  //     // { property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624", amenity_id: 'evcharging', display_order: 5 },
  //     {
  //       property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624",
  //       amenity_id: "lawn",
  //       display_order: 6,
  //     },
  //     {
  //       property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624",
  //       amenity_id: "sitoutarea",
  //       display_order: 7,
  //     },
  //     {
  //       property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624",
  //       amenity_id: "freeparking",
  //       display_order: 8,
  //     },
  //     {
  //       property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624",
  //       amenity_id: "indoorgames",
  //       display_order: 9,
  //     },
  //     // {
  //     //   property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //     //   amenity_id: "restaurant",
  //     //   display_order: 10,
  //     // },
  //     {
  //       property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624",
  //       amenity_id: "television",
  //       display_order: 11,
  //     },
  //     {
  //       property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624",
  //       amenity_id: "watersupply",
  //       display_order: 12,
  //     },
  //     {
  //       property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624",
  //       amenity_id: "wifi",
  //       display_order: 13,
  //     },
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
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fexterior8.webp?alt=media&token=ffb4baeb-b5be-4c3f-bdab-bee68efc1abf",
  //       image_category_id: 7,
  //       image_alt: "savali-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fexterior7.webp?alt=media&token=b7072e6e-f71a-4fea-bf83-a5330046095e",
  //       image_category_id: 7,
  //       image_alt: "savali-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fexterior6.webp?alt=media&token=0f709982-bd1b-4179-889d-a7306cba8e94",
  //       image_category_id: 7,
  //       image_alt: "savali-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fexterior5.webp?alt=media&token=62d05a57-1561-4902-a232-b5ff95bf001f",
  //       image_category_id: 7,
  //       image_alt: "savali-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fexterior4.webp?alt=media&token=cfdb0850-150e-42b0-a946-372021fffe87",
  //       image_category_id: 7,
  //       image_alt: "savali-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fexterior3.webp?alt=media&token=45ba3db9-5921-4486-99b5-3783d2b5f3bc",
  //       image_category_id: 7,
  //       image_alt: "savali-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fexterior2.webp?alt=media&token=cd65e385-61e2-4743-9a03-b1c46f71c4e5",
  //       image_category_id: 7,
  //       image_alt: "savali-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fexterior10.webp?alt=media&token=3d0f77df-7d4f-49e9-8233-1828278a5874",
  //       image_category_id: 7,
  //       image_alt: "savali-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fexterior1.webp?alt=media&token=1cfa5312-0af5-49f7-96ea-81c189553f1b",
  //       image_category_id: 7,
  //       image_alt: "savali-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Frestaurant1.webp?alt=media&token=ceb3fca8-64e7-41db-8fc8-75e09c3a012c",
  //       image_category_id: 15,
  //       image_alt: "savali-restaurant",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Frestaurant2.webp?alt=media&token=efb6245d-ff43-4165-8bdf-9b12d4cbd9ea",
  //       image_category_id: 15,
  //       image_alt: "savali-restaurant",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Frestaurant3.webp?alt=media&token=315845ab-3ee0-4b8d-8d6a-fe8ebe76191b",
  //       image_category_id: 15,
  //       image_alt: "savali-restaurant",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Frestaurant4.webp?alt=media&token=f4e4f260-a80a-439f-b9a6-d8d14f15733d",
  //       image_category_id: 15,
  //       image_alt: "savali-restaurant",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fswimming1.webp?alt=media&token=5c9a7206-e29a-4fb4-9f84-2c6d6696b187",
  //       image_category_id: 6,
  //       image_alt: "savali-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fswimming2.jpg?alt=media&token=bb468ad5-ea62-419b-809a-926a66d46b6f",
  //       image_category_id: 6,
  //       image_alt: "savali-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fwashroom1.webp?alt=media&token=bc8d8ab8-fefa-43c3-adbc-c5f4be3bff63",
  //       image_category_id: 10,
  //       image_alt: "savali-bathroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fsuite-swimming-4.webp?alt=media&token=cd3c097f-d37e-4305-b1ba-ed70fab10aca",
  //       image_category_id: 6,
  //       image_alt: "savali-suite-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fsuite-swimming1.webp?alt=media&token=a092d8ca-a40d-480f-b3c5-307e28d70d56",
  //       image_category_id: 6,
  //       image_alt: "savali-suite-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fsuite-swimming2.webp?alt=media&token=68130519-0ab2-4474-9166-1ce69c196308",
  //       image_category_id: 6,
  //       image_alt: "savali-suite-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fsuite-swimming11.webp?alt=media&token=435c86de-4fa0-4044-90c6-d72c3dd20bbd",
  //       image_category_id: 15,
  //       image_alt: "savali-restaurant",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fsuite-swimming3.webp?alt=media&token=08372fcd-4221-4f8e-9ee3-b9d0be940177",
  //       image_category_id: 6,
  //       image_alt: "savali-suite-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fsuite-swimming5.webp?alt=media&token=f908cd34-c3cd-4796-902b-897d32a2df4f",
  //       image_category_id: 6,
  //       image_alt: "savali-suite-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fsuite-swimming6.webp?alt=media&token=dfec873d-9a89-43d5-8cf5-a93974feb160",
  //       image_category_id: 6,
  //       image_alt: "savali-suite-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fsuite.webp?alt=media&token=594307a0-477b-4af0-bf2e-39f3f5038666",
  //       image_category_id: 5,
  //       image_alt: "savali-suite-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fsuite1.webp?alt=media&token=d9f3657d-3972-4db5-911e-7e95e329e9b1",
  //       image_category_id: 5,
  //       image_alt: "savali-suite-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fsuite2.webp?alt=media&token=050df274-b740-41d1-a5fc-d4eb19d15d28",
  //       image_category_id: 5,
  //       image_alt: "savali-suite-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fsuite3.webp?alt=media&token=681052b0-5a16-4b93-954e-b952468c6739",
  //       image_category_id: 5,
  //       image_alt: "savali-suite-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fstandard.webp?alt=media&token=ae8c6f71-0bba-4d39-aa0b-214ea2b90bb4",
  //       image_category_id: 5,
  //       image_alt: "savali-standard-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fstandard1.webp?alt=media&token=9349e26e-8ada-40ac-91fb-7f44833a5f7c",
  //       image_category_id: 5,
  //       image_alt: "savali-standard-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fstandard2.webp?alt=media&token=7780915e-ac50-4adc-9317-efade3836c48",
  //       image_category_id: 5,
  //       image_alt: "savali-standard-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/savali-red-stone%2Fstandard3.webp?alt=media&token=6a12fbb3-3597-49bd-8ccd-09cd23131977",
  //       image_category_id: 5,
  //       image_alt: "savali-standard-bedroom",
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
  //     {
  //       image_id: "bee7c0e8-d359-49e3-9d2e-ce85dac6e3bb",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "2186ce67-4796-43f7-9005-446de7d58333",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "5bccc272-564e-4372-ac81-dfe90964180a",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "7c0951e5-a484-4637-9e52-827e0f242b27",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "7e84f09c-8e04-49fa-9edb-e7945ba1d673",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "93e4febd-13c5-44cc-8310-b64249a2c840",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "1a1e61c2-cdf1-45db-9377-37151311ff28",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //       is_carousel_image: "true",
  //     },
  //     {
  //       image_id: "526419b5-14e4-4721-a27d-9f98a04084aa",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "622896b3-61f1-4818-b78d-d9ac8f71bd6a",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "97828aad-e162-4d72-87f5-cd77988c2168",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "ada90abb-f700-43f2-8b9c-2b265cb69866",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "8e70d05a-b785-449a-909a-a66d00f6456b",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "b2d02712-f90b-4265-9fd2-edd6de118235",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "93ba79d8-47a9-4d5c-99f0-ab86c2e9429e",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "4f1b7591-ef13-4c54-af53-d3a5a3860d4f",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "0e657329-5629-4ec9-a0b5-5d9d729e28d6",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
  //     },
  //     {
  //       image_id: "b06aa7b3-e2f0-443a-a6d1-b540a3ae6a7a",
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       display_order: 1,
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
  //     {
  //       image_id: "9e70d05a-b785-449a-909a-a66d00f64561",
  //       unit_id: "47159732-ac52-4504-aa1c-190dc5fd765d",
  //     },
  //     {
  //       image_id: "1e70d05a-b785-449a-909a-a66d00f64562",
  //       unit_id: "47159732-ac52-4504-aa1c-190dc5fd765d",
  //       is_banner_image: 'true'
  //     },

  //   ],
  // });

  // 11. food menu

  //   await prisma.foodMenu.create({
  // data: {
  //   property_id: '9cf43e86-e0ce-424c-81dd-301e29b3d624',
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
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       title: "Morbe Dam",
  //       description:
  //         "Morbe Dam in Raigad is a scenic reservoir surrounded by hills, known for its tranquil waters and lush greenery. A peaceful spot to enjoy nature and breathtaking views.",
  //       distance: "10 mins away",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fpeb-fort-trek.webp?alt=media&token=8ee564ae-a094-4693-8e95-221445dc9a79",
  //     },
  //     {
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       title: "Panchayatan Mandir",
  //       description:
  //         "Morbe Dam in Raigad is a scenic reservoir surrounded by hills, known for its tranquil waters and lush greenery. A peaceful spot to enjoy nature and breathtaking views.",
  //       distance: "10 mins away",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fpanchayatan.webp?alt=media&token=46c32565-0a85-44d3-b3c8-c73b5eb0bc65",
  //     },
  //     {
  //       property_id: "9cf43e86-e0ce-424c-81dd-301e29b3d624",
  //       title: "Bilavle Dam",
  //       description:
  //         "Bhilavle Dam offers a refreshing escape surrounded by nature. The drive to the dam is scenic and calming, with lush green plantations lining the way, making the journey as beautiful as the destination.",
  //       distance: "20 mins away",
  //       imageUrl:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/near-by-attractions%2Fbhilavle-dam.jpg?alt=media&token=5f03a0b7-d378-4ddd-80d1-5a61a8377c50",
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
