export type cardInterface = {
	cardPhoto: string;
	cardTitle: string;
	cardRate: number;
	cardID?: string;
	routeTo?: string;
	option?: "+" |"-" | "";
	submitHandler?:(matID:string) =>void;
};
