export interface NativeWindowInfo {
	title: string;
	application: string;
	path: string;
	pid: number;
	icon: string;
	'windows.isUWPApp'?: boolean;
	'windows.uwpPackage'?: string;
}

export interface Addon {
	getActiveWindow(): NativeWindowInfo;
	subscribe(callback: (windowInfo: NativeWindowInfo | null) => void): number;
	unsubscribe(watchId: number): void;
	initialize?(): void;
	requestPermissions?(): boolean;
	runLoop?(): void;
}

export interface WindowInfo {
	title: string;
	application: string;
	path: string;
	pid: number;
	icon: string;
	windows?: {
		isUWPApp: boolean;
		uwpPackage: string;
	};
}

export interface InitializeOptions {
	osxRunLoop?: false | 'get' | 'all';
}
