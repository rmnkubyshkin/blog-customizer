import { createRoot } from 'react-dom/client';
import React, {StrictMode} from 'react';
import './styles/index.scss';
import {App} from "src/App";

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);