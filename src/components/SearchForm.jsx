import Wrapper from "../assets/wrappers/SearchForm";
import { Form, useNavigation } from "react-router-dom";

const SearchForm = ({ searchTerm }) => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<Wrapper>
			<Form className='form'>
				<input
					type='search'
					name='search'
					//id="search"
					className='form-input'
					//defaultValue={searchTerm}
					defaultValue={searchTerm}
				/>
				<button
					type='submit'
					className='btn'
					disabled={isSubmitting}>
					{isSubmitting ? "submitting..." : "search"}
				</button>
			</Form>
		</Wrapper>
	);
};
export default SearchForm;
