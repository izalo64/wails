/*
 _	   __	  _ __
| |	 / /___ _(_) /____
| | /| / / __ `/ / / ___/
| |/ |/ / /_/ / / (__  )
|__/|__/\__,_/_/_/____/
The lightweight framework for web-like apps
(c) Lea Anthony 2019-present
*/
/* jshint esversion: 6 */
import * as Log from './log';
import * as Browser from './browser';
import * as Window from './window';
import * as Dialog from './dialog';
import { On, Once, OnMultiple, Emit, Notify } from './events';
import { Callback, SystemCall } from './calls';
import { AddScript, InjectCSS, DisableDefaultContextMenu } from './utils';
import { AddIPCListener } from 'ipc';
import * as Platform from 'platform';
import * as Store from './store';
import * as Tray from './tray';

export function Init() {
	// Backend is where the Go struct wrappers get bound to
	window.backend = {};

	// Initialise global if not already
	window.wails = {
		System: Platform.System,
		Log,
		Browser,
		Window,
		Tray,
		Dialog,
		Events: {
			On,
			Once,
			OnMultiple,
			Emit,
		},
		_: {
			Callback,
			Notify,
			AddScript,
			InjectCSS,
			DisableDefaultContextMenu,
			// Init,
			AddIPCListener,
			SystemCall,
		},
		Store,
	};

	// Setup system. Store uses window.wails so needs to be setup after that
	window.wails.System = {
		IsDarkMode: Store.New('wails:isdarkmode'),
		LogLevel: Store.New('wails:loglevel'),
		AppConfig: Store.New('wails:appconfig'),
	};
	// Copy platform specific information into it
	Object.assign(window.wails.System, Platform.System);

	// Do platform specific Init
	Platform.Init();

	window.wailsloader.runtime = true;
}