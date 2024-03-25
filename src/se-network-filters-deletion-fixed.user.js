// ==UserScript==
// @name            Stack Exchange - fix filter deletion
// @namespace       https://github.com/PurpleMagick/
// @description     Deleting a filter redirects to the new filter page, thus you never get rid of filters
// @author          VLAZ
// @version         1.0.0
//
// @match           https://stackexchange.com/filters/*
//
// @grant           none
// ==/UserScript==

(function() {
	main();

	function main() {
		//handle coming in with a delete ID set
		const searchParams = new URLSearchParams(location.search);
		if (searchParams.has("delete")) //delete and exit
			return deleteFilter(createDeleteLinkFromFilterId(searchParams.get("delete")));

		const deleteButton = document.querySelector("#yes");

		//nothing to delete
		if (!deleteButton)
			return;

		const deleteLink = deleteButton.href;

		//set the ID to delete to allow opening in new tab/window
		deleteButton.href = createActionURL(deleteLink);

		//if directly clicked, just perform the deletion immediately
		deleteButton.addEventListener("click", (e) => {
			e.preventDefault();
			deleteFilter(deleteLink);
		});
	}

	function deleteFilter(deleteLink) {
		const firstFilter = document.querySelector("#sideBar .filters ul:nth-of-type(1) li:nth-child(1) .filter-name a");

		fetch(deleteLink, { redirect: "manual" })
			.then(() => location.href = firstFilter.href);
	}

	function createDeleteLinkFromFilterId(filterId) {
		return `https://stackexchange.com/filters/delete/${filterId}`;
	}

	function extractFilterIdFromDeleteLink(deleteLink) {
		const url = new URL(deleteLink);
		const pathSegments = url.pathname.split("/");
		return pathSegments[pathSegments.length - 1];
	}

	function createActionURL(deleteLink) {
		const actionURL = new URL(location.href);
		actionURL.searchParams.set("delete", extractFilterIdFromDeleteLink(deleteLink));
		return actionURL.toString();
	}
})();
