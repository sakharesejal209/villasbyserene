"use client";

import { FC, FormEvent, useState } from "react";

import {
  Autocomplete,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
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
    <div className="container mt-[80px]">
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex w-fit items-center gap-3">
          <div className="grid grid-cols-2 gap-2">
            <Autocomplete
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
                    borderRadius: 1,
                  }}
                />
              )}
            />
            <TextField
              type="number"
              label="Guests"
              size="small"
              fullWidth
              value={newGuests}
              onChange={(e) =>
                setNewGuests(Math.max(1, parseInt(e.target.value)))
              }
              sx={{
                borderRadius: 1,
              }}
            />
          </div>
          <IconButton type="submit">
            {loadingButton ? (
              <CircularProgress size={24} />
            ) : (
              <SearchRoundedIcon />
            )}
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default StaysSearchBox;
