import { html } from '~/utils';
import { Header } from './Header';
import './App.css';

export function App() {
  return html` <div class="App">${Header()}</div> `;
}
