const cities = [
  { value: "Colombo", label: "Colombo" },
  { value: "Trincomalee", label: "Trincomalee" },
  { value: "Kandy", label: "Kandy" },
  { value: "Galle", label: "Galle" },
];
const formattedCities = cities.map((city) => ({
  value: city.value,
  label: city.label,
}));

const usePlaces = () => {
  const getAll = () => formattedCities;

  const getByValue = (value: string) => {
    return formattedCities.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default usePlaces;
