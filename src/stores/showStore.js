import create from 'zustand';
import axios from 'axios';

function formatDate(dateStr) {
	const date = new Date(dateStr);
	const day = date.getDate();
	const month = date.toLocaleString('en-GB', {
		month: 'short'
	});
	const year = date.getFullYear();

	return `${day} ${month}, ${year}`;
}

const showStore = create((set) => ({

	graphData: [],

	fetchData: async (id) => {
		const [graphRes, dataRes] = await Promise.all([
			axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?x_cg_demo_api_key=${process.env.REACT_APP_API_KEY}&vs_currency=usd&days=121`),

			axios.get(`https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=${process.env.REACT_APP_API_KEY}&localization=false&market_data=true`)
		])


		const graphData = graphRes.data.prices.map(price => {
			const [timestamp, p] = price;
			const date = formatDate(timestamp);
			return {
				Date: date,
				Price: p,
			};
		});
		set({
			graphData,
			data: dataRes.data
		});

	}
}));

export default showStore;