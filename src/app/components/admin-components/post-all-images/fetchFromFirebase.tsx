import { ref, listAll, getDownloadURL } from "firebase/storage";

import { storage } from "@/lib/firebaseConfig";

export async function fetchFirebaseImages() {
  const listRef = ref(storage, "sparsh-villa");
  const res = await listAll(listRef);
  const urls = await Promise.all(
    res.items.map(async (item) => {
      try {
        const url = await getDownloadURL(item);
        return { url, name: item.name };
      } catch (err) {
        console.error("Error getting download URL for", item.name, err);
        return null;
      }
    })
  );

  return urls;
}
