export type cardInterface = {
	cardPhoto: string;
	cardTitle: string;
	cardRate: number;
	cardID?: string;
	routeTo?: string;
	option?: "+" |"-" | "";
	matNum?:string;
	submitHandler?:(matID:string) =>void;
};
