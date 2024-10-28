import { AppRouter } from '../routers';
import { Provider } from "react-redux"
import { store } from '../store/store';
import "./scss/styles.scss"


export function App() {
	
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
};