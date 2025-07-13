type CatResponse = {
  id: string;
  url: string;
};

export const getCats = async () => {
  const cats = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=10"
  );
  const data = await cats.json();

  return data as CatResponse[];
};
