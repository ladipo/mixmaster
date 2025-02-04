import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";

const cocktailSearchUrl =
	"https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

import { useQuery } from "@tanstack/react-query";

const searchCocktailsQuery = (searchTerm) => {
	return {
		queryKey: ["search", searchTerm || "vodka"],
		queryFn: async () => {
			const res = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
			return res.data.drinks;
		},
	};
};

export const loader =
	(queryClient) =>
	async ({ request }) => {
		const url = new URL(request.url);

		const searchTerm = url.searchParams.get("search") || "vodka";
		await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
		return { searchTerm };
	};
const Landing = () => {
	const { searchTerm } = useLoaderData();
	const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));
	return (
		<>
			<SearchForm searchTerm={searchTerm} />
			<CocktailList drinks={drinks} />
		</>
	);
};
export default Landing;
