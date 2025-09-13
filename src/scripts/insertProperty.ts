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
  //   const property = await prisma.property.create({
  //     data: {
  //       name: "Ocean Breeze Villa By Serene",
  //       description: "Sea facing, Luxurious 3BHK",
  //       map_location: "https://share.google/SRCrJTq4mRVL1fuj5",
  //       address: "Kegarv Beach, Uran",
  //       area: "Uran",
  //       city: "Panvel",
  //       state: "Maharashtra",
  //       country: "India",
  //       checkin_time: '12:00 PM',
  //       checkout_time: '01:00 PM',
  //       maxcapacity: 40,
  // }
  // })

  //4. create unit

  // const unit = await prisma.unit.create({
  //   data: {
  //     property_id: "fac2cbb4-d938-4342-a369-312d2cd24604",
  //     unit_type: "VILLA",
  //     title: "4BHK villa",
  //     description: "Peaceful retreat nestled by the beach.",
  //     no_of_bedrooms: 4,
  //     max_capacity: 40,
  //   },
  // });

  // 5. Link House Rules to Unit

  // await prisma.propertyRule.createMany({
  //   data: [
  //     { property_id: "fac2cbb4-d938-4342-a369-312d2cd24604", rule_id: 'petCharge', display_order: 1 },
  //     { property_id: "fac2cbb4-d938-4342-a369-312d2cd24604", rule_id: 'poolTime', display_order: 2 },
  //     { property_id: "fac2cbb4-d938-4342-a369-312d2cd24604", rule_id: 'alcoholConsumption', display_order: 3 },
  //     { property_id: "fac2cbb4-d938-4342-a369-312d2cd24604", rule_id: 'damageCost', display_order: 4 },
  //     { property_id: "fac2cbb4-d938-4342-a369-312d2cd24604", rule_id: 'governmentId', display_order: 5 },
  //     { property_id: "fac2cbb4-d938-4342-a369-312d2cd24604", rule_id: 'lastServiceTime', display_order: 6 },
  //     { property_id: "fac2cbb4-d938-4342-a369-312d2cd24604", rule_id: "musicTime", display_order: 7 },
  //   ],
  // });

  // 6. Link Amenities to property
  // await prisma.propertyAmenity.createMany({
  //   data: [
  //     { property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624", amenity_id: 'airconditioned', display_order: 1 },
  //     { property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624", amenity_id: 'freeparking', display_order: 2 },
  //     { property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624", amenity_id: 'indoorgames', display_order: 3 },
  //     { property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624", amenity_id: 'lawn', display_order: 4 },
  //     { property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624", amenity_id: 'swimmingpool', display_order: 5 },
  //     { property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624", amenity_id: 'television', display_order: 6 },
  //     { property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624", amenity_id: 'watersupply', display_order: 7 },
  //     { property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624", amenity_id: 'wifi', display_order: 8 },
  //     { property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624", amenity_id: "cliffview", display_order: 9 },
  //     { property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624", amenity_id: "geyser", display_order: 10 },
  //     { property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624", amenity_id: "hillviews", display_order: 11 },
  //     { property_id: "1cf56e86-e0ce-424c-81dd-301e29b3d624", amenity_id: "raindance", display_order: 11 },
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
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Faddiitional7.webp?alt=media&token=53579ef5-6606-47eb-83d2-8d29ccfe08e5",
  //       image_category_id: 9,
  //       image_alt: "ocean-pearl-games",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fadditional1.webp?alt=media&token=83ee05a9-44f1-47bd-bef0-fe745c11c32a",
  //       image_category_id: 2,
  //       image_alt: "ocean-pearl-additional",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fadditional3.webp?alt=media&token=12a4c364-7b2b-4416-b825-f3a531abcb2b",
  //       image_category_id: 2,
  //       image_alt: "ocean-pearl-additional",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fadditional4.webp?alt=media&token=5fc8016f-ea26-40eb-b1c8-bda68ddadbbc",
  //       image_category_id: 2,
  //       image_alt: "ocean-pearl-additional",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fadditional5.webp?alt=media&token=b7b421c3-c3e3-47ac-868b-0da4641aa404",
  //       image_category_id: 2,
  //       image_alt: "ocean-pearl-additional",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fadditional6.webp?alt=media&token=cf639bff-04b9-4ad8-906d-bd00f41656ca",
  //       image_category_id: 2,
  //       image_alt: "ocean-pearl-additional",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbarcounter2.webp?alt=media&token=d2da6f3d-a4a8-4299-8356-44c3172bc261",

  //       image_category_id: 11,
  //       image_alt: "ocean-pearl-4bhk-barcounter",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom1.webp?alt=media&token=36596e70-ae91-4d5c-b3d5-3118bb2b85a0",
  //       image_category_id: 5,
  //       image_alt: "ocean-pearl-4bhk-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom1.webp?alt=media&token=36596e70-ae91-4d5c-b3d5-3118bb2b85a0",
  //       image_category_id: 5,
  //       image_alt: "ocean-pearl-4bhk-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom2.webp?alt=media&token=1ca8cb85-e426-4605-8793-c60a190df29c",
  //       image_category_id: 5,
  //       image_alt: "ocean-pearl-4bhk-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom3.webp?alt=media&token=f19e1452-bb70-4b73-b491-2be451f75d0a",
  //       image_category_id: 5,
  //       image_alt: "ocean-pearl-4bhk-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom4.webp?alt=media&token=f4cc6c7a-9c1c-45d5-9115-852198c1e150",
  //       image_category_id: 5,
  //       image_alt: "ocean-pearl-4bhk-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom5.webp?alt=media&token=5e49ffd4-35fa-47ff-b17c-933952fb3741",
  //       image_category_id: 5,
  //       image_alt: "ocean-pearl-4bhk-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom6.webp?alt=media&token=ce38ba42-c4f8-42fd-9ee2-f6e260ff9e39",
  //       image_category_id: 5,
  //       image_alt: "ocean-pearl-4bhk-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom7.webp?alt=media&token=43d9e8b9-de88-4f55-ac3a-6e86d55e0c6a",
  //       image_category_id: 5,
  //       image_alt: "ocean-pearl-4bhk-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom8.webp?alt=media&token=c58b6cb0-018f-437b-9ade-dd6e43dea256",
  //       image_category_id: 5,
  //       image_alt: "ocean-pearl-4bhk-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom9.webp?alt=media&token=8e064587-c6f6-4943-a9a0-50254f8867bb",
  //       image_category_id: 5,
  //       image_alt: "ocean-pearl-4bhk-bedroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior1.webp?alt=media&token=64cf6a47-c420-491e-9178-e82ded54f785",
  //       image_category_id: 7,
  //       image_alt: "ocean-pearl-4bhk-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior10.webp?alt=media&token=6bc6b24b-0c0f-4981-8544-0a11bbf1617b",
  //       image_category_id: 7,
  //       image_alt: "ocean-pearl-4bhk-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior2.webp?alt=media&token=15ce7dda-57ac-450f-8dc0-efe9287b52b0",
  //       image_category_id: 7,
  //       image_alt: "ocean-pearl-4bhk-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior3.webp?alt=media&token=3373c9d7-5de9-49ba-b3d6-bcfd430a34b9",
  //       image_category_id: 7,
  //       image_alt: "ocean-pearl-4bhk-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior4.webp?alt=media&token=a378f271-726c-4813-aaca-24d98f1d14f6",
  //       image_category_id: 7,
  //       image_alt: "ocean-pearl-4bhk-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior5.webp?alt=media&token=1dad372f-1216-4627-add4-e20bc1a9605c",
  //       image_category_id: 7,
  //       image_alt: "ocean-pearl-4bhk-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior6.webp?alt=media&token=caf8c31c-33bb-4bd3-8dee-008ba44537c0",
  //       image_category_id: 7,
  //       image_alt: "ocean-pearl-4bhk-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior7.webp?alt=media&token=8d04d5c8-8a6e-4a7d-9f77-5a3034ee2ae5",
  //       image_category_id: 7,
  //       image_alt: "ocean-pearl-4bhk-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior9.webp?alt=media&token=c080ed21-dc4e-456c-8c16-c5d44f5ad545",
  //       image_category_id: 7,
  //       image_alt: "ocean-pearl-4bhk-exterior",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fkitchen1.webp?alt=media&token=4edf7a48-5707-4a3c-8603-5c9abfd67282",
  //       image_category_id: 3,
  //       image_alt: "ocean-pearl-4bhk-kitchen",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fkitchen2.webp?alt=media&token=91fa5d4f-63ca-4261-9510-06fb730e263d",
  //       image_category_id: 3,
  //       image_alt: "ocean-pearl-4bhk-kitchen",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fkitchen3.webp?alt=media&token=e2c08f35-778d-4de4-9a14-8af6f2a6813f",
  //       image_category_id: 3,
  //       image_alt: "ocean-pearl-4bhk-kitchen",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Flivingroom1.webp?alt=media&token=361760c6-8d27-4f34-8e7f-fccd7144222e",
  //       image_category_id: 4,
  //       image_alt: "ocean-pearl-4bhk-livingroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Flivingroom2.webp?alt=media&token=6e792162-431e-4e29-ae76-20d661b89cc8",
  //       image_category_id: 4,
  //       image_alt: "ocean-pearl-4bhk-livingroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Flivingroom4.webp?alt=media&token=ac446a60-791c-4f13-9929-d7205e9b2b62",
  //       image_category_id: 4,
  //       image_alt: "ocean-pearl-4bhk-livingroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool1.webp?alt=media&token=5681cffc-18b4-487f-a74e-0be187fe5329",
  //       image_category_id: 6,
  //       image_alt: "ocean-pearl-4bhk-livingroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool2.webp?alt=media&token=556bd5da-3a97-46c7-8494-b00d1cbe1079",
  //       image_category_id: 6,
  //       image_alt: "ocean-pearl-4bhk-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool3.webp?alt=media&token=a0b053f2-45c8-49a9-8137-8b2b89a09a05",
  //       image_category_id: 6,
  //       image_alt: "ocean-pearl-4bhk-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool4.webp?alt=media&token=c148b534-1546-44c8-8e6d-925597ef6753",
  //       image_category_id: 6,
  //       image_alt: "ocean-pearl-4bhk-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool5.webp?alt=media&token=22545f12-6b43-40cc-b6b0-e52b012e0f99",
  //       image_category_id: 6,
  //       image_alt: "ocean-pearl-4bhk-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool6.webp?alt=media&token=fd99a74a-c4af-4382-9555-9b44c9977917",
  //       image_category_id: 6,
  //       image_alt: "ocean-pearl-4bhk-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool7.webp?alt=media&token=bb15b760-8407-48b2-886b-29a75a647c21",
  //       image_category_id: 6,
  //       image_alt: "ocean-pearl-4bhk-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool8.webp?alt=media&token=ea7c4955-a36b-44a2-b01e-3c15308fc14c",
  //       image_category_id: 6,
  //       image_alt: "ocean-pearl-4bhk-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool9.webp?alt=media&token=4d4e883c-4172-44e3-986d-471816051039",
  //       image_category_id: 6,
  //       image_alt: "ocean-pearl-4bhk-swimmingpool",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fwashroom1.webp?alt=media&token=3453645b-10f6-46f7-9102-984dafe10832",
  //       image_category_id: 10,
  //       image_alt: "ocean-pearl-4bhk-bathroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fwashroom2.webp?alt=media&token=3c7ebe53-54aa-4adf-a7a9-56f953a2247f",
  //       image_category_id: 10,
  //       image_alt: "ocean-pearl-4bhk-bathroom",
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fwashroom3.webp?alt=media&token=19f69325-853a-45dd-8c33-5e143d3571f0",
  //       image_category_id: 10,
  //       image_alt: "ocean-pearl-4bhk-bathroom",
  //     },
  //   ],
  //   skipDuplicates: true,
  // });

  // 9. Create property images

  // await prisma.propertyImage.createMany({
  //   data: [
  //     {
  //       image_id: "6e43a2c1-6056-4e5e-8279-04ba3148295e",
  //       property_id: 'fac2cbb4-d938-4342-a369-312d2cd24604',
  //       display_order: 24,
  //     },
  //   ],
  // });

  // 10. create unit image

  // await prisma.unitImage.createMany({
  //   data: [
  //     {
  //       image_id: "4e2cdd33-17c2-4b79-aef4-e3bce6c0278f",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "512e1f2d-a13d-43e6-bd6e-f54f0820c808",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "b6624d8c-bc9d-40fb-9952-9388616cf4ea",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "6e43a2c1-6056-4e5e-8279-04ba3148295e",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "3455a93b-2885-46a7-8372-87306d87db99",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "86420e2a-cb8b-4201-86f4-afaae2a57ab5",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "3522044e-22b5-4b01-a544-e83889a2f3fd",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "1e0ea283-e788-4891-ae8a-d4508066bb3d",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "78a5aab8-73e8-446a-a77c-a729a0f1f586",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "11d9587f-4fd6-46fc-aa51-9895a89edb54",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "2c887455-51d5-4d46-9a9e-a30dbe9f4db8",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "ed8b47a1-869b-4511-a18c-f83956bd5713",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "0d9d5614-783a-43ac-bf45-ccd911393ea8",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "0c7f465c-1066-4241-98c5-cc1ae5b82226",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "735c3263-104c-4529-802a-1d5c02a47b76",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "07e3b681-f550-4c3b-a023-0c38454a8eb3",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "b8a3d786-fe37-4da3-9386-8fc8c677594b",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "e306e992-0a79-41b8-84d6-115931e4d3b5",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "da3e04a9-0036-4ae3-a0a8-bdd2b8454fa1",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "73aa5b7e-5740-42b0-ba0b-d00231484277",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "2c48a6e6-cbf3-4a4c-8b68-6522d7b71965",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "d6b75054-935f-4051-a333-6d155bc4af7f",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "0cab901f-8bb7-47ac-bc9a-3ba28699ac0f",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "a840a039-13ba-46f6-aefd-23fe157f586e",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
  //     {
  //       image_id: "70da2f06-b572-4bdd-8c0c-6ad459701019",
  //       unit_id: "4f81c5b8-6baf-4a36-a5b5-a2119e3a2327",
  //     },
      
  //   ]
  // })

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
