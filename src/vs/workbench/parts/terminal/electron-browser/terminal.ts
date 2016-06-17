/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import cp = require('child_process');
import platform = require('vs/base/common/platform');
import processes = require('vs/base/node/processes');
import {TPromise} from 'vs/base/common/winjs.base';
import {createDecorator, ServiceIdentifier} from 'vs/platform/instantiation/common/instantiation';

export const TERMINAL_PANEL_ID = 'workbench.panel.terminal';

export const TERMINAL_SERVICE_ID = 'terminalService';

export const TERMINAL_DEFAULT_SHELL_LINUX = !platform.isWindows ? (process.env.SHELL || 'sh') : 'sh';
export const TERMINAL_DEFAULT_SHELL_OSX = !platform.isWindows ? (process.env.SHELL || 'sh') : 'sh';
export const TERMINAL_DEFAULT_SHELL_WINDOWS = processes.getWindowsShell();

export var ITerminalService = createDecorator<ITerminalService>(TERMINAL_SERVICE_ID);

export interface ITerminalConfiguration {
	terminal: {
		integrated: {
			shell: {
				linux: string,
				osx: string,
				windows: string
			},
			shellArgs: {
				linux: string[],
				osx: string[],
				windows: string[]
			},
			fontFamily: string,
			fontSize: number,
			lineHeight: number
		}
	};
}

export interface ITerminalProcess {
	title: string;
	process: cp.ChildProcess;
}

export interface ITerminalService {
	serviceId: ServiceIdentifier<any>;

	close(): TPromise<any>;
	createNew(): TPromise<any>;
	focus(): TPromise<any>;
	focusNext(): TPromise<any>;
	focusPrevious(): TPromise<any>;
	toggle(): TPromise<any>;

	createTerminalProcess(): ITerminalProcess;
	//getTerminalInstanceTitles(): TPromise<string[]>;
	initConfigHelper(panelElement: HTMLElement): void;
	killTerminalProcess(terminalProcess: ITerminalProcess): void;
}
