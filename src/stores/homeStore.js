import { create } from 'zustand';
import axios from 'axios';
import debounce from '../helper/debounce';

const homeStore = create((set) => ({
	coins: [],
	trending: [],
	query: "",
	searched: false,

	setQuery: (e) => {
		set({
			query: e.target.value
		})
		homeStore.getState().searchCoins()
	},


	searchCoins: debounce(async () => {
		const {
			query,
			trending
		} = homeStore.getState();

		if (query.length > 1) {
			const res = await axios.get(`https://api.coingecko.com/api/v3/search?x_cg_demo_api_key=${process.env.REACT_APP_API_KEY}&query=${query}`)
			const coins = res.data.coins.map(coin => {
				return {
					name: coin.name,
					symbol: coin.symbol,
					image: coin.large,
					id: coin.id,
				}
			})

			set({
				coins,
				searched: true
			});
		}
		if (query.length === 0) {
			set({
				coins: trending,
				searched: false
			})
		}
	}, 500),

	fetchCoins: async () => {

		const res = await axios.get(`https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=${process.env.REACT_APP_API_KEY}`)

		const coins = res.data.coins.map(coin => {
			return {
				name: coin.item.symbol,
				image: coin.item.small,
				id: coin.item.id,
				priceUsd: coin.item.data.price >= 0.000001 ? coin.item.data.price.toFixed(6) : coin.item.data.price,
				priceChange: coin.item.data.price_change_percentage_24h.usd.toFixed(2),
				volume: coin.item.data.total_volume,
				marketCap: coin.item.data.market_cap,
				trend: coin.item.data.sparkline,
			}
		})

		set({
			coins,
			trending: coins
		})


	}
}))

export default homeStore;