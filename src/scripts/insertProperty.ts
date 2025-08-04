import { PrismaClient } from '../../generated/prisma'
const prisma = new PrismaClient()

async function main() {
  // 1. Create ImageCategory and Images
  const natureCategory = await prisma.imageCategory.create({
    data: {
      name: 'Nature',
      images: {
        create: [
          { image_url: 'https://example.com/image1.jpg' },
          { image_url: 'https://example.com/image2.jpg' }
        ]
      }
    }
  })

  // 2. Create Amenities
  const wifi = await prisma.amenity.create({ data: { name: 'WiFi' } })
  const pool = await prisma.amenity.create({ data: { name: 'Swimming Pool' } })

  // 3. Create House Rules
  const noSmoking = await prisma.houseRule.create({
    data: { description: 'No smoking inside the property' }
  })

  const noPets = await prisma.houseRule.create({
    data: { description: 'No pets allowed' }
  })

  // 4. Create Property with Unit and related data
  const property = await prisma.property.create({
    data: {
      name: 'Serene Eco Villa',
      description: 'An eco-friendly villa surrounded by nature.',
      map_location: 'https://goo.gl/maps/example',
      address: '123 Coconut Lane',
      area: 'South Goa',
      city: 'Canacona',
      state: 'Goa',
      country: 'India',
      checkin_time: new Date('1970-01-01T14:00:00Z'),
      checkout_time: new Date('1970-01-01T11:00:00Z'),
      maxcapacity: 12,
      Unit: {
        create: {
          unit_type: '1BHK',
          title: 'Jungle Hideout',
          description: 'Peaceful retreat nestled in nature.',
          no_of_bedrooms: 1,
          max_capacity: 3,
          unitRules: {
            create: [
              { rule_id: noSmoking.rule_id, display_order: 1 },
              { rule_id: noPets.rule_id, display_order: 2 }
            ]
          },
          unitAmenities: {
            create: [
              { amenity_id: wifi.amenity_id, display_order: 1 },
              { amenity_id: pool.amenity_id, display_order: 2 }
            ]
          },
          unitImages: {
            create: [
              {
                image_url: 'https://example.com/unit1.jpg',
                display_order: 1,
                is_banner_image: 'true'
              }
            ]
          }
        }
      },
      PropertyImage: {
        create: [
          {
            image_url: 'https://example.com/property1.jpg',
            display_order: 1,
            is_banner_image: 'true'
          }
        ]
      }
    }
  })

  console.log('Seed completed ✅')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
