import { Provider } from 'react-redux';
import './App.css';
import { store } from './redux/store';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import InvestorList from './components/InvestorList';
import Layout from './components/common/Layout';

const App: React.FC = () => {
	return <Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route element={<Layout><Outlet /></Layout>}>
					<Route path='/' element={<InvestorList></InvestorList>}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</Provider>
}

export default App
