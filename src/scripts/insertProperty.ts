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
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0019.webp?alt=media&token=e1f6ccad-899f-48bb-8305-83b9be6db747",
  //       image_category_id: 5,
  //       image_alt: 'gadeshwar-cliffview-4bhk-bedroom'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0015.webp?alt=media&token=df7065ed-2c26-4c1c-b95f-00dc414b59e7",
  //       image_category_id: 5,
  //       image_alt: 'gadeshwar-cliffview-4bhk-bedroom'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0013.webp?alt=media&token=d1ab10c3-6fa8-44cb-a79b-16a1e76753d6",

  //       image_category_id: 5,
  //       image_alt: 'gadeshwar-cliffview-4bhk-bedroom'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0010.webp?alt=media&token=17ab874d-22f5-43b0-9286-66c640ad5458",
  //       image_category_id: 5,
  //       image_alt: 'gadeshwar-cliffview-4bhk-bedroom'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0001.webp?alt=media&token=e62690b6-e439-4265-b76b-c95957e22840",
  //       image_category_id: 7,
  //       image_alt: 'gadeshwar-cliffview-4bhk-exterior'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0005.webp?alt=media&token=157fe785-388f-4ee9-b342-9cc992e956c2",
  //       image_category_id: 7,
  //       image_alt: 'gadeshwar-cliffview-4bhk-exterior'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0012.webp?alt=media&token=2e079aaa-ff91-4e6e-bf96-5b0719252dca",
  //       image_category_id: 7,
  //       image_alt: 'gadeshwar-cliffview-4bhk-exterior'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0014.webp?alt=media&token=a0026966-6434-4621-9dd5-58f430e65ca9",
  //       image_category_id: 7,
  //       image_alt: 'gadeshwar-cliffview-4bhk-exterior'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0016.webp?alt=media&token=c4fc59ee-6ffe-4297-a21f-10447ebcac71",
  //       image_category_id: 7,
  //       image_alt: 'gadeshwar-cliffview-4bhk-exterior'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0016.webp?alt=media&token=c4fc59ee-6ffe-4297-a21f-10447ebcac71",
  //       image_category_id: 7,
  //       image_alt: 'gadeshwar-cliffview-4bhk-exterior'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0022.webp?alt=media&token=7dfd056e-613e-4e41-bcd2-c4d686d4f95e",
  //       image_category_id: 7,
  //       image_alt: 'gadeshwar-cliffview-4bhk-exterior'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0025.webp?alt=media&token=81888438-f01c-4410-9421-0b4b7b3a4b5d",
  //       image_category_id: 7,
  //       image_alt: 'gadeshwar-cliffview-4bhk-exterior'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0025.webp?alt=media&token=81888438-f01c-4410-9421-0b4b7b3a4b5d",
  //       image_category_id: 6,
  //       image_alt: 'gadeshwar-cliffview-4bhk-swimmingpool'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0012.webp?alt=media&token=2e079aaa-ff91-4e6e-bf96-5b0719252dca",
  //       image_category_id: 6,
  //       image_alt: 'gadeshwar-cliffview-4bhk-swimmingpool'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0012.webp?alt=media&token=2e079aaa-ff91-4e6e-bf96-5b0719252dca",
  //       image_category_id: 4,
  //       image_alt: 'gadeshwar-cliffview-4bhk-livingroom'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0008.webp?alt=media&token=e8d00a66-e8f9-4529-9928-33fb4c37e605",
  //       image_category_id: 4,
  //       image_alt: 'gadeshwar-cliffview-4bhk-livingroom'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0011.webp?alt=media&token=28361fc2-ed01-47f1-83b1-fe28716a6935",
  //       image_category_id: 3,
  //       image_alt: 'gadeshwar-cliffview-4bhk-kitchen'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0009.webp?alt=media&token=079d009c-6677-4ff4-9816-4c3aae27712b",
  //       image_category_id: 1,
  //       image_alt: 'gadeshwar-cliffview-4bhk-dinningarea'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0017.webp?alt=media&token=dbf04454-2fef-4686-a1d4-322819946f09",
  //       image_category_id: 5,
  //       image_alt: 'gadeshwar-cliffview-4bhk-bedroom'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2Fswimming%20pool.jpg?alt=media&token=fa9a4d84-a5b1-438d-ab22-301b95920dae",
  //       image_category_id: 6,
  //       image_alt: 'gadeshwar-cliffview-4bhk-swimmingpool'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2Frestroom1.jpg?alt=media&token=a413bc1d-3e71-4a30-b480-0cd9d9c3ed0d",
  //       image_category_id: 10,
  //       image_alt: 'gadeshwar-cliffview-4bhk-restroom'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2Frestroom2.jpg?alt=media&token=54c74663-5c17-43fc-8e9f-0be9a3bffc85",
  //       image_category_id: 10,
  //       image_alt: 'gadeshwar-cliffview-4bhk-restroom'
  //     },

  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0021.webp?alt=media&token=e28caf94-5d10-43ca-b0a7-0114cac797b6",
  //       image_category_id: 8,
  //       image_alt: 'gadeshwar-cliffview-4bhk-glassroom'
  //     },
  //     {
  //       image_url:
  //         "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0006.webp?alt=media&token=46cef2b7-0c4d-4479-8698-a016c24fff52",
  //       image_category_id: 2,
  //       image_alt: 'gadeshwar-cliffview-4bhk-additionalimages'
  //     },
  //   ],
  //   skipDuplicates: true,
  // });

  // 9. Create property images

  // await prisma.propertyImage.createMany({
  //   data: [
  //     {
  //       image_id: "0282de74-02e9-4488-9dc1-81d53eb6d947",
  //       property_id: 'fac2cbb4-d938-4342-a369-312d2cd24604',
  //       display_order: 7,
  //     },
  //   ],
  // });

  // 10. create unit image

  // await prisma.unitImage.createMany({
  //   data: [
  //     {
  //       image_id: "1ef1a690-e54e-45be-bb33-69208a2877e4",
  //       unit_id: "6c9825fd-ae00-4d41-a887-a43c6a913c97",
  //     },
  //     {
  //       image_id: "23ef87f9-6cf9-4b1c-84b3-f6c2dc39e109",
  //       unit_id: "6c9825fd-ae00-4d41-a887-a43c6a913c97",
  //     },
  //     {
  //       image_id: "07d80d15-086d-4f31-820c-abeba42a6036",
  //       unit_id: "6c9825fd-ae00-4d41-a887-a43c6a913c97",
  //     },
  //     {
  //       image_id: "ae47feba-ed1a-4d9c-941d-cc1e16112c32",
  //       unit_id: "6c9825fd-ae00-4d41-a887-a43c6a913c97",
  //     },
  //     {
  //       image_id: "4c81a620-8db9-4fab-9c36-5e32158e8d98",
  //       unit_id: "6c9825fd-ae00-4d41-a887-a43c6a913c97",
  //     },
  //     {
  //       image_id: "5d00d33b-7b8a-4c56-b6b6-0b8de6ca4597",
  //       unit_id: "6c9825fd-ae00-4d41-a887-a43c6a913c97",
  //     },
  //     {
  //       image_id: "1d35cf31-4044-4801-a4c5-46aba804154f",
  //       unit_id: "6c9825fd-ae00-4d41-a887-a43c6a913c97",
  //     },
  //     {
  //       image_id:"cd9bbe02-5b4c-43de-b23d-437ecbca2527",
  //       unit_id: "6c9825fd-ae00-4d41-a887-a43c6a913c97",
  //     },
  //     {
  //       image_id: "49644734-f2e7-463c-ad85-ed17b002ac9f",
  //       unit_id: "6c9825fd-ae00-4d41-a887-a43c6a913c97",
  //     },
  //     {
  //       image_id: "18ff3f18-a1ce-42fa-8b95-48e64a760a52",
  //       unit_id: "6c9825fd-ae00-4d41-a887-a43c6a913c97",
  //     },
  //     {
  //       image_id: "d46c63c9-1593-4a49-b1f3-3475ebfadd82",
  //       unit_id: "6c9825fd-ae00-4d41-a887-a43c6a913c97",
  //     },
  //     {
  //       image_id: "8233a705-5077-4434-ba47-4ffb391114ef",
  //       unit_id: "6c9825fd-ae00-4d41-a887-a43c6a913c97",
  //     },
  //     {
  //       image_id: "60e544c7-ae29-4809-9af6-2eab2de9d638",
  //       unit_id: "6c9825fd-ae00-4d41-a887-a43c6a913c97",
  //     },
  //   ]
  // })

  console.log("Seed completed ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
