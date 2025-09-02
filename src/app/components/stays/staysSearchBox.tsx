"use client";

import { FC, FormEvent, useState } from "react";

import {
  Autocomplete,
  Button,
  Card,
  CircularProgress,
  TextField,
} from "@mui/material";
import { locations } from "../home/searchBox";
import { useRouter } from "next/navigation";

type StaysSearchBoxPropType = {
  slug: string;
  guests: number;
};

const StaysSearchBox: FC<StaysSearchBoxPropType> = (props) => {
  const { slug, guests } = props;
  const [newLocation, setNewLocation] = useState<string>(slug);
  const [newGuests, setNewGuests] = useState<number>(guests);
  const [loadingButton, setLoadingButton] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    setLoadingButton(true);
    e.preventDefault();

    const locSlug = newLocation
      ? newLocation.toLowerCase().replace(/\s+/g, "-")
      : "all";

    let path = `/stays/${locSlug}`;

    if (newGuests && newGuests > 0) {
      path += `?guests=${newGuests}`;
    }
    router.push(path);

    setLoadingButton(false);
  };

  return (
    <div className="container mt-[40px]">
      <Card className="py-3 md:py-6 px-4 md:px-10 flex">
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center gap-1 md:gap-3"
        >
          <div className="w-full grid grid-cols-5 gap-4">
            <Autocomplete
              className="col-span-2"
              options={locations}
              value={newLocation}
              onChange={(e, val) => setNewLocation(val || "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Location"
                  fullWidth
                  size="small"
                  sx={{
                    borderRadius: 0,
                  }}
                />
              )}
            />
            <TextField
              className="col-span-2"
              type="number"
              label="Guests"
              size="small"
              fullWidth
              value={newGuests}
              onChange={(e) =>
                setNewGuests(Math.max(1, parseInt(e.target.value)))
              }
              sx={{
                borderRadius: 0,
              }}
            />
            <Button className="col-span-1" variant="contained" type="submit">
              {loadingButton ? (
                <CircularProgress size={24} />
              ) : (
                <span>
                  <span className="hidden sm:inline">Search Properties</span>
                  <span className="sm:hidden">Search</span>
                </span>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default StaysSearchBox;
