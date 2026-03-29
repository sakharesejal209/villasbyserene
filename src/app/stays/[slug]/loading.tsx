// src/app/stays/[slug]/loading.tsx

import { Card, Skeleton, Box } from "@mui/material";

function PropertyCardSkeleton() {
  return (
    <Card
      elevation={0}
      sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}
    >
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        <Skeleton variant="text" width="70%" height={28} />
        <Skeleton variant="text" width="50%" height={20} />
        <Skeleton variant="text" width="40%" height={20} />
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Skeleton variant="rounded" width={60} height={24} />
          <Skeleton variant="rounded" width={80} height={24} />
        </Box>
      </Box>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className="mt-10">
      {/* Desktop */}
      <section className="hidden h-full w-full md:grid grid-cols-12 relative">
        {/* Filter sidebar skeleton */}
        <div className="col-span-3 px-4 h-full">
          <Card sx={{ p: 2 }}>
            <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
            {[1, 2, 3, 4].map((i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Skeleton
                  variant="text"
                  width="30%"
                  height={20}
                  sx={{ mb: 0.5 }}
                />
                <Skeleton variant="rounded" width="100%" height={40} />
              </Box>
            ))}
          </Card>
        </div>

        {/* Property cards skeleton */}
        <div className="col-span-9 px-4">
          <Skeleton variant="text" width="40%" height={48} sx={{ mb: 3 }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="md:hidden px-4">
        <Skeleton variant="text" width="50%" height={48} sx={{ mb: 3 }} />
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
