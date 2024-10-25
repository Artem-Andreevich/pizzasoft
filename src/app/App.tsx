import { AppRouter } from '../routers';
import { Provider } from "react-redux"
import { store } from '../store/store';

// import './globalStyles/bootstrap.min.css';
import './globalStyles/reset.css';
import './globalStyles/styles.css';
// import './globalStyles/media.css';


export function App() {
	
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
};