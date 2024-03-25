## Description

### Problem 

See the report: [Can't delete the filter called My Filter](https://meta.stackexchange.com/questions/324759/cant-delete-the-filter-called-my-filter).

In short, deleting a filter redirects the browser to the page to immediately create a new filter, therefore you can never get rid of filters.

### Fix

Override what the deletion button does. Clicking it would now handle the deletion correctly by hitting the link to delete a filter *without* following the redirection.
