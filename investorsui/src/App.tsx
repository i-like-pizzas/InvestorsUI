import { Provider } from 'react-redux';
import './App.css';
import { store } from './redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InvestorList from './components/InvestorList';

const App: React.FC = () => {
	return <Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<InvestorList></InvestorList>}></Route>
			</Routes>
		</BrowserRouter>
	</Provider>
}

export default App
