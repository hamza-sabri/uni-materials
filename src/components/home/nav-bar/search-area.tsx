import { useEffect, useContext, useRef, useState } from "react";
import { DynamicContentContext } from './../../../contexts/home-context/dynamic-content-state-context';
import clearIcon from './../../../assets/home/nav-bar/search-bar/clear-icon.png'
let TrieSearch = require("trie-search");

let trie: any;
export default function SearchArea() {
	const { dataToSearchIn, setSearchResult, clearSearchBarBtnRef, setClearSearchBarBtnRef } = useContext(DynamicContentContext);
	let searchInputRef = useRef<HTMLInputElement>(null);
	let [searchInputClassName, setSearchInputClassName] = useState("search-bar-section");

	let [searchTerm, setSearchTerm] = useState("");

	let buildTrieTree = () => {
		trie = new TrieSearch();
		if (dataToSearchIn) {
			dataToSearchIn.forEach((item: any) => {
				trie.map(item.key.replaceAll(' ', ''), item.value);
			})
		}
	}

	let search = () => {
		console.log("hi-from-search-land");
		
		let term = searchInputRef.current!.value.replaceAll(' ', '');
		if (term || term != "") {
			let res = trie.search(term);
			setSearchResult(res);
			setSearchInputClassName("expand-search-bar-section");
		} else {
			setSearchResult(undefined);
			setSearchInputClassName("search-bar-section");
		}
		setSearchTerm(() => term);
	}

	useEffect(()=>{
		search();
	},[searchTerm])

	useEffect(() => {
		if (dataToSearchIn !== undefined)
			buildTrieTree();
		else if (searchInputRef.current) {
			setSearchResult(undefined);
			searchInputRef.current.value = "";
		}

	}, [undefined, dataToSearchIn]);

	useEffect(() => {
		setClearSearchBarBtnRef(clearSearchBarBtnRef)
	}, [clearSearchBarBtnRef.current]);


	return (
		<div className="search-bar">
			<svg width="30" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="512" height="512" />
				<g id="loupe (1) 1">
					<g id="small-dot">
						<g id="Group">
							<g id="Group_2">
								<path
									id="Vector"
									d="M310 190C304.48 190 300 194.48 300 200C300 205.52 304.48 210 310 210C315.52 210 320 205.52 320 200C320 194.48 315.52 190 310 190Z"
									fill="black"
								/>
							</g>
						</g>
					</g>
					<g id="Group_3">
						<g id="Group_4">
							<path
								id="Vector_2"
								d="M500.281 443.719L366.801 310.239C388.546 277.485 400 239.555 400 200C400 89.72 310.28 0 200 0C89.72 0 0 89.72 0 200C0 310.28 89.72 400 200 400C239.556 400 277.486 388.545 310.239 366.802L347.134 403.697C347.139 403.702 347.144 403.707 347.15 403.713L443.718 500.281C451.276 507.838 461.319 512 472 512C482.681 512 492.724 507.838 500.278 500.284C507.837 492.731 512 482.687 512 472C512 461.313 507.837 451.269 500.281 443.719ZM305.536 345.727C305.536 345.728 305.535 345.728 305.534 345.729C274.667 368.149 238.175 380 200 380C100.748 380 20 299.252 20 200C20 100.748 100.748 20 200 20C299.252 20 380 100.748 380 200C380 238.175 368.149 274.667 345.728 305.535C334.511 320.988 320.989 334.511 305.536 345.727ZM326.516 354.793C336.866 346.326 346.327 336.865 354.793 326.516L383.164 354.887C374.536 365.07 365.07 374.537 354.887 383.164L326.516 354.793ZM486.139 486.139C482.359 489.919 477.338 492 472 492C466.662 492 461.641 489.919 457.861 486.139L369.066 397.344C379.193 388.653 388.653 379.194 397.343 369.067L486.141 457.865C489.919 461.639 492 466.658 492 472C492 477.342 489.919 482.361 486.139 486.139Z"
								fill="black"
							/>
						</g>
					</g>
					<g id="inner-circle">
						<g id="Group_5">
							<g id="Group_6">
								<path
									id="Vector_3"
									d="M200 40C111.775 40 40 111.775 40 200C40 288.225 111.775 360 200 360C288.225 360 360 288.225 360 200C360 111.775 288.225 40 200 40ZM200 340C122.804 340 60 277.196 60 200C60 122.804 122.804 60 200 60C277.196 60 340 122.804 340 200C340 277.196 277.196 340 200 340Z"
									fill="black"
								/>
							</g>
						</g>
					</g>
					<g id="long-line">
						<g id="something">
							<g id="Group_7">
								<path
									id="Vector_4"
									d="M312.065 157.073C303.454 134.661 288.461 115.499 268.705 101.66C248.479 87.49 224.721 80 200 80C194.478 80 190 84.478 190 90C190 95.522 194.478 100 200 100C241.099 100 278.631 125.818 293.396 164.247C294.924 168.223 298.713 170.663 302.733 170.663C303.925 170.663 305.138 170.448 306.317 169.995C311.472 168.014 314.046 162.229 312.065 157.073Z"
									fill="black"
								/>
							</g>
						</g>
					</g>
				</g>
			</svg>
			<div className={searchInputClassName}>
				{
					<input className="search-input-field" ref={searchInputRef} type="text" placeholder="Search" onChange={(e)=>{setSearchTerm(e.target.value)}} value={searchTerm} />
				}
				{
					searchTerm != "" ?
						<button className="clear-search-bar-btn" ref={clearSearchBarBtnRef} onClick={() => { setSearchResult(undefined); setSearchTerm("") }}><img src={clearIcon} /></button>
						: null
				}
			</div>

		</div>
	);
}
