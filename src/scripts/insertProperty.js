"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = require("../../generated/prisma");
var prisma = new prisma_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
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
                return [4 /*yield*/, prisma.image.createMany({
                        data: [
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Faddiitional7.webp?alt=media&token=53579ef5-6606-47eb-83d2-8d29ccfe08e5",
                                image_category_id: 9,
                                image_alt: "ocean-pearl-games",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fadditional1.webp?alt=media&token=83ee05a9-44f1-47bd-bef0-fe745c11c32a",
                                image_category_id: 2,
                                image_alt: "ocean-pearl-additional",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fadditional3.webp?alt=media&token=12a4c364-7b2b-4416-b825-f3a531abcb2b",
                                image_category_id: 2,
                                image_alt: "ocean-pearl-additional",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fadditional4.webp?alt=media&token=5fc8016f-ea26-40eb-b1c8-bda68ddadbbc",
                                image_category_id: 2,
                                image_alt: "ocean-pearl-additional",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fadditional5.webp?alt=media&token=b7b421c3-c3e3-47ac-868b-0da4641aa404",
                                image_category_id: 2,
                                image_alt: "ocean-pearl-additional",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fadditional6.webp?alt=media&token=cf639bff-04b9-4ad8-906d-bd00f41656ca",
                                image_category_id: 2,
                                image_alt: "ocean-pearl-additional",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbarcounter2.webp?alt=media&token=d2da6f3d-a4a8-4299-8356-44c3172bc261",
                                image_category_id: 11,
                                image_alt: "ocean-pearl-4bhk-barcounter",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom1.webp?alt=media&token=36596e70-ae91-4d5c-b3d5-3118bb2b85a0",
                                image_category_id: 5,
                                image_alt: "ocean-pearl-4bhk-bedroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom1.webp?alt=media&token=36596e70-ae91-4d5c-b3d5-3118bb2b85a0",
                                image_category_id: 5,
                                image_alt: "ocean-pearl-4bhk-bedroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom2.webp?alt=media&token=1ca8cb85-e426-4605-8793-c60a190df29c",
                                image_category_id: 5,
                                image_alt: "ocean-pearl-4bhk-bedroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom3.webp?alt=media&token=f19e1452-bb70-4b73-b491-2be451f75d0a",
                                image_category_id: 5,
                                image_alt: "ocean-pearl-4bhk-bedroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom4.webp?alt=media&token=f4cc6c7a-9c1c-45d5-9115-852198c1e150",
                                image_category_id: 5,
                                image_alt: "ocean-pearl-4bhk-bedroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom5.webp?alt=media&token=5e49ffd4-35fa-47ff-b17c-933952fb3741",
                                image_category_id: 5,
                                image_alt: "ocean-pearl-4bhk-bedroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom6.webp?alt=media&token=ce38ba42-c4f8-42fd-9ee2-f6e260ff9e39",
                                image_category_id: 5,
                                image_alt: "ocean-pearl-4bhk-bedroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom7.webp?alt=media&token=43d9e8b9-de88-4f55-ac3a-6e86d55e0c6a",
                                image_category_id: 5,
                                image_alt: "ocean-pearl-4bhk-bedroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom8.webp?alt=media&token=c58b6cb0-018f-437b-9ade-dd6e43dea256",
                                image_category_id: 5,
                                image_alt: "ocean-pearl-4bhk-bedroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fbedroom9.webp?alt=media&token=8e064587-c6f6-4943-a9a0-50254f8867bb",
                                image_category_id: 5,
                                image_alt: "ocean-pearl-4bhk-bedroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior1.webp?alt=media&token=64cf6a47-c420-491e-9178-e82ded54f785",
                                image_category_id: 7,
                                image_alt: "ocean-pearl-4bhk-exterior",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior10.webp?alt=media&token=6bc6b24b-0c0f-4981-8544-0a11bbf1617b",
                                image_category_id: 7,
                                image_alt: "ocean-pearl-4bhk-exterior",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior2.webp?alt=media&token=15ce7dda-57ac-450f-8dc0-efe9287b52b0",
                                image_category_id: 7,
                                image_alt: "ocean-pearl-4bhk-exterior",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior3.webp?alt=media&token=3373c9d7-5de9-49ba-b3d6-bcfd430a34b9",
                                image_category_id: 7,
                                image_alt: "ocean-pearl-4bhk-exterior",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior4.webp?alt=media&token=a378f271-726c-4813-aaca-24d98f1d14f6",
                                image_category_id: 7,
                                image_alt: "ocean-pearl-4bhk-exterior",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior5.webp?alt=media&token=1dad372f-1216-4627-add4-e20bc1a9605c",
                                image_category_id: 7,
                                image_alt: "ocean-pearl-4bhk-exterior",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior6.webp?alt=media&token=caf8c31c-33bb-4bd3-8dee-008ba44537c0",
                                image_category_id: 7,
                                image_alt: "ocean-pearl-4bhk-exterior",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior7.webp?alt=media&token=8d04d5c8-8a6e-4a7d-9f77-5a3034ee2ae5",
                                image_category_id: 7,
                                image_alt: "ocean-pearl-4bhk-exterior",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior9.webp?alt=media&token=c080ed21-dc4e-456c-8c16-c5d44f5ad545",
                                image_category_id: 7,
                                image_alt: "ocean-pearl-4bhk-exterior",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fkitchen1.webp?alt=media&token=4edf7a48-5707-4a3c-8603-5c9abfd67282",
                                image_category_id: 3,
                                image_alt: "ocean-pearl-4bhk-kitchen",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fkitchen2.webp?alt=media&token=91fa5d4f-63ca-4261-9510-06fb730e263d",
                                image_category_id: 3,
                                image_alt: "ocean-pearl-4bhk-kitchen",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fkitchen3.webp?alt=media&token=e2c08f35-778d-4de4-9a14-8af6f2a6813f",
                                image_category_id: 3,
                                image_alt: "ocean-pearl-4bhk-kitchen",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Flivingroom1.webp?alt=media&token=361760c6-8d27-4f34-8e7f-fccd7144222e",
                                image_category_id: 4,
                                image_alt: "ocean-pearl-4bhk-livingroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Flivingroom2.webp?alt=media&token=6e792162-431e-4e29-ae76-20d661b89cc8",
                                image_category_id: 4,
                                image_alt: "ocean-pearl-4bhk-livingroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Flivingroom4.webp?alt=media&token=ac446a60-791c-4f13-9929-d7205e9b2b62",
                                image_category_id: 4,
                                image_alt: "ocean-pearl-4bhk-livingroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool1.webp?alt=media&token=5681cffc-18b4-487f-a74e-0be187fe5329",
                                image_category_id: 6,
                                image_alt: "ocean-pearl-4bhk-livingroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool2.webp?alt=media&token=556bd5da-3a97-46c7-8494-b00d1cbe1079",
                                image_category_id: 6,
                                image_alt: "ocean-pearl-4bhk-swimmingpool",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool3.webp?alt=media&token=a0b053f2-45c8-49a9-8137-8b2b89a09a05",
                                image_category_id: 6,
                                image_alt: "ocean-pearl-4bhk-swimmingpool",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool4.webp?alt=media&token=c148b534-1546-44c8-8e6d-925597ef6753",
                                image_category_id: 6,
                                image_alt: "ocean-pearl-4bhk-swimmingpool",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool5.webp?alt=media&token=22545f12-6b43-40cc-b6b0-e52b012e0f99",
                                image_category_id: 6,
                                image_alt: "ocean-pearl-4bhk-swimmingpool",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool6.webp?alt=media&token=fd99a74a-c4af-4382-9555-9b44c9977917",
                                image_category_id: 6,
                                image_alt: "ocean-pearl-4bhk-swimmingpool",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool7.webp?alt=media&token=bb15b760-8407-48b2-886b-29a75a647c21",
                                image_category_id: 6,
                                image_alt: "ocean-pearl-4bhk-swimmingpool",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool8.webp?alt=media&token=ea7c4955-a36b-44a2-b01e-3c15308fc14c",
                                image_category_id: 6,
                                image_alt: "ocean-pearl-4bhk-swimmingpool",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool9.webp?alt=media&token=4d4e883c-4172-44e3-986d-471816051039",
                                image_category_id: 6,
                                image_alt: "ocean-pearl-4bhk-swimmingpool",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fwashroom1.webp?alt=media&token=3453645b-10f6-46f7-9102-984dafe10832",
                                image_category_id: 10,
                                image_alt: "ocean-pearl-4bhk-bathroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fwashroom2.webp?alt=media&token=3c7ebe53-54aa-4adf-a7a9-56f953a2247f",
                                image_category_id: 10,
                                image_alt: "ocean-pearl-4bhk-bathroom",
                            },
                            {
                                image_url: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fwashroom3.webp?alt=media&token=19f69325-853a-45dd-8c33-5e143d3571f0",
                                image_category_id: 10,
                                image_alt: "ocean-pearl-4bhk-bathroom",
                            },
                        ],
                        skipDuplicates: true,
                    })];
                case 1:
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
                    _a.sent();
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
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return prisma.$disconnect(); });
